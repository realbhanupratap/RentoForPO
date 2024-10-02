import mongoose, { Schema } from 'mongoose';

// Sub-schema for Bed
const bedSchema = new Schema({
  bedNumber: {
    type: Number, // Unique bed number within the room
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,  // If the bed is currently available
  }
});

// Sub-schema for Amenities
const amenitiesSchema = new Schema({
  hasAC: { type: Boolean, default: false },
  hasAttachedWashroom: { type: Boolean, default: false },
  hasChargingPoints: { type: Boolean, default: false },
  hasHotWater: { type: Boolean, default: false },
  hasGymAccess: { type: Boolean, default: false },
  hasMessHall: { type: Boolean, default: false },
  hasBalcony: { type: Boolean, default: false },
  hasTransportation: { type: Boolean, default: false },
  // You can add more amenities as required...
});

// Main schema for Rooms
const roomSchema = new Schema({
  roomNumber: {
    type: Number,  // Unique room number within the property
    required: true,
  },
  roomType: {
    type: String,  // Example: "Single", "Double", "Shared"
    required: true,
  },
  beds: [bedSchema],  // Array of beds within the room
  amenities: amenitiesSchema,  // Amenities available in this room
  isAvailable: {
    type: Boolean,
    default: true,  // If the room is currently available
  }
});

// Main Inventory Schema for the Property
const inventorySchema = new Schema({
  property: {
    type: Schema.Types.ObjectId,
    ref: 'Property', // Refers to the property that this inventory belongs to
    required: true,
  },
  rooms: [roomSchema],  // Array of rooms within the property
}, {
  timestamps: true,
});

export const Inventory = mongoose.model('Inventory', inventorySchema);
