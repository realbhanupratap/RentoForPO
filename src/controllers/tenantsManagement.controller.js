import { asyncHandler } from "../utils/asyncHandler.js";
import { TenantManagement } from "../models/tenantsManagement.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// List all tenants
export const listTenants = asyncHandler(async (req, res) => {
  const landlordId = req.user._id;

  // Find all tenants under the landlord's management
  const tenants = await TenantManagement.find({ landlord: landlordId })
    .populate('tenant', 'name email')  // Populate tenant details
    .populate('property', 'name address');  // Populate property details

  if (!tenants.length) {
    throw new ApiError("No tenants found", 404);
  }

  return res.status(200).json(new ApiResponse(200, tenants, "Tenants retrieved successfully"));
});

// View tenant details
export const viewTenant = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find tenant management record by ID
  const tenant = await TenantManagement.findById(id)
    .populate('tenant', 'name email phone')  // Populate tenant details
    .populate('property', 'name address');  // Populate property details

  if (!tenant) {
    throw new ApiError("Tenant not found", 404);
  }

  return res.status(200).json(new ApiResponse(200, tenant, "Tenant details retrieved successfully"));
});

export { listTenants, viewTenant };
