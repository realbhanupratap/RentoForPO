import { asyncHandler } from "../utils/asyncHandler";
import { Inventory } from "../models/inventory.models";

// Add inventory
export const addInventory = asyncHandler(async (req, res) => {
  const { propertyId, name, quantity } = req.body;
  // Logic to add inventory...
});

// Update inventory
export const updateInventory = asyncHandler(async (req, res) => {
  const { inventoryId } = req.params;
  // Logic to update inventory...
});

// Delete inventory
export const deleteInventory = asyncHandler(async (req, res) => {
  const { inventoryId } = req.params;
  // Logic to delete inventory...
});

// List inventory
export const listInventory = asyncHandler(async (req, res) => {
  const { propertyId } = req.params;
  const inventory = await Inventory.find({ property: propertyId });
  // Logic to list inventory...
});
