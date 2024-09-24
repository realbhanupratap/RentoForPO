import { asyncHandler } from "../utils/asyncHandler";
import { Tenant } from "../models/tenant.models";

// List all tenants
export const listTenants = asyncHandler(async (req, res) => {
  const landlordId = req.user._id;
  const tenants = await Tenant.find({ landlord: landlordId });
  // Logic to list tenants...
});

// View tenant details
export const viewTenant = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const tenant = await Tenant.findById(id);
  // Logic to view tenant details...
});
