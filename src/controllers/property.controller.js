import { asyncHandler } from "../utils/asyncHandler";
import { Property } from "../models/property.models";

// Add a property
export const addProperty = asyncHandler(async (req, res) => {
  const { name, location, price } = req.body;
  // Logic to add property (already discussed)...
});

// Update a property
export const updateProperty = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // Logic to update property...
});

// Delete a property
export const deleteProperty = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // Logic to delete property...
});

// List all properties
export const listProperties = asyncHandler(async (req, res) => {
  const landlordId = req.user._id;
  const properties = await Property.find({ landlord: landlordId });
  // Logic to list properties...
});

// View property details
export const viewProperty = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const property = await Property.findById(id);
  // Logic to view property details...
});
