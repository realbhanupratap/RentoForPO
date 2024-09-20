import mongoose, { Schema } from 'mongoose';

const inventorySchema = new Schema({
  property: {
    type: Schema.Types.ObjectId,
    ref: 'Property',  // Refers to the property that this inventory belongs to
    required: true,
  },
  category: {
    type: String,  // Example: "Room", "Bed", "Appliance"
    required: true,
  },
  description: {
    type: String,  // Detailed description of the item (e.g., "Room with 2 beds and air conditioner")
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,  // If the item (e.g., room or bed) is currently available
  },
  quantity: {
    type: Number,  // Number of items in this category (e.g., number of beds in a room)
    required: true,
  },
}, {
  timestamps: true,
});

export const Inventory = mongoose.model('Inventory', inventorySchema);
