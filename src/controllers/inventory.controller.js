import { asyncHandler } from "../utils/asyncHandler.js";
import { Inventory } from "../models/inventory.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Add a room to the inventory
export const addRoom = asyncHandler(async (req, res) => {
  const { propertyId, roomNumber, roomType, beds, amenities } = req.body;

  // Find the inventory for the property
  let inventory = await Inventory.findOne({ property: propertyId });
  if (!inventory) {
    // Create inventory if it doesn't exist
    inventory = new Inventory({ property: propertyId, rooms: [] });
  }

  // Add the room
  const newRoom = {
    roomNumber,
    roomType,
    beds: beds || [],  // Add beds if provided
    amenities: amenities || {},
  };

  inventory.rooms.push(newRoom);
  await inventory.save();

  return res.status(201).json(new ApiResponse(201, inventory, "Room added successfully"));
});


// Update room details in the inventory
export const updateRoom = asyncHandler(async (req, res) => {
  const { propertyId, roomId } = req.params;
  const { roomNumber, roomType, beds, amenities, isAvailable } = req.body;

  // Find the inventory for the property
  const inventory = await Inventory.findOne({ property: propertyId });
  if (!inventory) {
    throw new ApiError("Inventory not found", 404);
  }

  // Find the room in the inventory
  const room = inventory.rooms.id(roomId);
  if (!room) {
    throw new ApiError("Room not found", 404);
  }

  // Update room fields
  room.roomNumber = roomNumber || room.roomNumber;
  room.roomType = roomType || room.roomType;
  room.beds = beds || room.beds;
  room.amenities = amenities || room.amenities;
  room.isAvailable = isAvailable !== undefined ? isAvailable : room.isAvailable;

  await inventory.save();

  return res.status(200).json(new ApiResponse(200, inventory, "Room updated successfully"));
});


// Delete a room from the inventory
export const deleteRoom = asyncHandler(async (req, res) => {
  const { propertyId, roomId } = req.params;

  // Find the inventory for the property
  const inventory = await Inventory.findOne({ property: propertyId });
  if (!inventory) {
    throw new ApiError("Inventory not found", 404);
  }

  // Remove the room from the inventory
  inventory.rooms.id(roomId).remove();
  await inventory.save();

  return res.status(200).json(new ApiResponse(200, null, "Room deleted successfully"));
});

export { addRoom, updateRoom, deleteRoom };