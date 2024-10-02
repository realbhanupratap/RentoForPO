import { asyncHandler } from "../utils/asyncHandler.js";
import { RentPayment } from "../models/rentPayments.models.js";
import { Tenant } from "../models/tenant.models.js";
import { Property } from "../models/property.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Collect rent
export const collectRent = asyncHandler(async (req, res) => {
  const { amount, tenantId, propertyId } = req.body;
  const landlordId = req.user._id;

  // Validation
  if (!amount || !tenantId || !propertyId) {
    throw new ApiError("Amount, Tenant, and Property are required", 400);
  }

  // Check if tenant exists
  const tenant = await Tenant.findById(tenantId);
  if (!tenant) {
    throw new ApiError("Tenant not found", 404);
  }

  // Check if property exists and belongs to the landlord
  const property = await Property.findById(propertyId);
  if (!property || property.landlord.toString() !== landlordId.toString()) {
    throw new ApiError("Property not found or unauthorized to collect rent for this property", 404);
  }

  // Create rent payment record
  const rentPayment = await RentPayment.create({
    amount,
    tenant: tenantId,
    property: propertyId,
    landlord: landlordId,
  });

  return res.status(201).json(new ApiResponse(201, rentPayment, "Rent collected successfully"));
});

// View rent collection history
export const viewRentHistory = asyncHandler(async (req, res) => {
  const landlordId = req.user._id;

  // Fetch rent payment history for the landlord
  const rentHistory = await RentPayment.find({ landlord: landlordId })
    .populate('tenant', 'name')  // Populate tenant details
    .populate('property', 'name');  // Populate property details

  if (!rentHistory.length) {
    throw new ApiError("No rent payment history found", 404);
  }

  return res.status(200).json(new ApiResponse(200, rentHistory, "Rent history retrieved successfully"));
});

export { collectRent, viewRentHistory };
