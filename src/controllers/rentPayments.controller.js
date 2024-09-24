import { asyncHandler } from "../utils/asyncHandler";
import { Rent } from "../models/rent.models";

// Collect rent
export const collectRent = asyncHandler(async (req, res) => {
  const { amount, tenantId, propertyId } = req.body;
  // Logic to collect rent...
});

// View rent collection history
export const viewRentHistory = asyncHandler(async (req, res) => {
  const landlordId = req.user._id;
  const rentHistory = await Rent.find({ landlord: landlordId });
  // Logic to view rent history...
});
