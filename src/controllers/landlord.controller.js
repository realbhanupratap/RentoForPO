import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Landlord } from "../models/landlord.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new landlord
const registerLandlord = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  if ([fullName, email, username, password].some(field => !field?.trim())) {
    throw new ApiError("All fields are required", 400);
  }

  const existedUser = await Landlord.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError("User already exists", 409);
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError("Avatar file is required", 400);
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = coverImageLocalPath
    ? await uploadOnCloudinary(coverImageLocalPath)
    : { url: "" };

  if (!avatar) {
    throw new ApiError("Avatar upload failed", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdLandlord = await Landlord.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage.url || "",
    email,
    password: hashedPassword,
    username: username.toLowerCase(),
  });

  const landlordResponse = await Landlord.findById(createdLandlord._id).select(
    "-password -refreshToken"
  );

  return res.status(201).json(
    new ApiResponse(201, landlordResponse, "Landlord registered successfully")
  );
});

// Login a landlord
const loginLandlord = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError("Email and password are required", 400);
  }

  const landlord = await Landlord.findOne({ email });
  if (!landlord) {
    throw new ApiError("Invalid email or password", 401);
  }

  const isPasswordCorrect = await landlord.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError("Invalid email or password", 401);
  }

  const accessToken = landlord.generateAccessToken();
  const refreshToken = landlord.generateRefreshToken();

  landlord.refreshToken = refreshToken;
  await landlord.save();

  return res.status(200).json(
    new ApiResponse(200, { accessToken, refreshToken }, "Login successful")
  );
});

// Change Password Logic (Correct Placement)
const changePassword = asyncHandler(async (req, res) => {
  const landlordId = req.user._id; // Assuming user is authenticated from the auth middleware
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ApiError('Current password and new password are required', 400);
  }

  const landlord = await Landlord.findById(landlordId);

  if (!landlord) {
    throw new ApiError('Landlord not found', 404);
  }

  const isMatch = await bcrypt.compare(currentPassword, landlord.password);
  if (!isMatch) {
    throw new ApiError('Current password is incorrect', 400);
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  landlord.password = hashedNewPassword;
  await landlord.save();

  return res.status(200).json(new ApiResponse(200, null, 'Password changed successfully'));
});

// Refresh access token
const refreshToken = asyncHandler(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    throw new ApiError("Refresh token is required", 400);
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const landlord = await Landlord.findById(decoded._id);

    if (!landlord || landlord.refreshToken !== token) {
      throw new ApiError("Invalid refresh token", 403);
    }

    const newAccessToken = landlord.generateAccessToken();

    return res.status(200).json(
      new ApiResponse(200, { accessToken: newAccessToken }, "Token refreshed")
    );
  } catch (error) {
    throw new ApiError("Invalid refresh token", 403);
  }
});

// Logout landlord
const logoutLandlord = asyncHandler(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    throw new ApiError("Refresh token is required", 400);
  }

  const landlord = await Landlord.findOneAndUpdate(
    { refreshToken: token },
    { refreshToken: "" }
  );

  if (!landlord) {
    throw new ApiError("User not found", 404);
  }

  return res.status(200).json(
    new ApiResponse(200, null, "Logged out successfully")
  );
});

export { registerLandlord, loginLandlord, refreshToken, logoutLandlord, changePassword };
