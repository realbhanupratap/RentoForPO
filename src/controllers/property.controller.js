import { asyncHandler } from "../utils/asyncHandler.js";
import { Property } from "../models/property.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadToS3 } from "../utils/s3Uploader.js";

// Add a property
export const addProperty = asyncHandler(async (req, res) => {
  const { name, address, liveLocation, category, genderRestriction, price, nearbySpots, inventory, amenities } = req.body;
  const landlordId = req.user._id;  // Get the landlord from the authenticated user

  // Validate required fields
  if (![name, address].every(field => field)) {
    throw new ApiError("Name and Address are required", 400);
  }

  // Handle new image uploads if present
  let photos = [];
  if (req.files && req.files.length > 0) {
    photos = req.files.map(file => uploadToS3(file));  // Handle new image uploads
  }

  // Add the property
  const newProperty = await Property.create({
    name,
    address,
    liveLocation: liveLocation ? JSON.parse(liveLocation) : undefined,
    category,
    genderRestriction,
    price,
    nearbySpots,
    inventory: inventory || [],  // Add inventory if provided
    amenities: amenities || [],
    photos,
    landlord: landlordId,
  });

  return res.status(201).json(new ApiResponse(201, newProperty, "Property added successfully"));
});

// Update a property
export const updateProperty = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, address, liveLocation, category, genderRestriction, price, nearbySpots, inventory, amenities } = req.body;

  // Find the property
  const property = await Property.findById(id);
  if (!property) {
    throw new ApiError("Property not found", 404);
  }

  // Ensure the authenticated user is the landlord
  if (property.landlord.toString() !== req.user._id.toString()) {
    throw new ApiError("Unauthorized to update this property", 403);
  }

  // Handle new image uploads if present
  let photos = property.photos;
  if (req.files && req.files.length > 0) {
    photos = req.files.map(file => uploadToS3(file));  // Handle new image uploads
  }

  // Update fields
  property.name = name || property.name;
  property.address = address || property.address;
  property.liveLocation = liveLocation ? JSON.parse(liveLocation) : property.liveLocation;
  property.category = category || property.category;
  property.genderRestriction = genderRestriction || property.genderRestriction;
  property.price = price || property.price;
  property.nearbySpots = nearbySpots || property.nearbySpots;
  property.inventory = inventory || property.inventory;
  property.amenities = amenities || property.amenities;
  property.photos = photos;

  await property.save();

  return res.status(200).json(new ApiResponse(200, property, "Property updated successfully"));
});

// Delete a property
export const deleteProperty = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find the property
  const property = await Property.findById(id);
  if (!property) {
    throw new ApiError("Property not found", 404);
  }

  // Ensure the authenticated user is the landlord
  if (property.landlord.toString() !== req.user._id.toString()) {
    throw new ApiError("Unauthorized to delete this property", 403);
  }

  // Delete the property
  await property.remove();

  return res.status(200).json(new ApiResponse(200, null, "Property deleted successfully"));
});

// List all properties for a landlord
export const listProperties = asyncHandler(async (req, res) => {
  const landlordId = req.user._id;

  // Fetch properties
  const properties = await Property.find({ landlord: landlordId });

  if (!properties.length) {
    throw new ApiError("No properties found", 404);
  }

  return res.status(200).json(new ApiResponse(200, properties, "Properties listed successfully"));
});

// View property details
export const viewProperty = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Fetch property by ID
  const property = await Property.findById(id).populate('tenants').populate('inventory');
  if (!property) {
    throw new ApiError("Property not found", 404);
  }

  return res.status(200).json(new ApiResponse(200, property, "Property details fetched successfully"));
});

export { addProperty, updateProperty, deleteProperty, listProperties, viewProperty };