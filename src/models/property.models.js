import mongoose, { Schema } from 'mongoose';

const propertySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,  // Trim spaces for cleaner input
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  liveLocation: {
    type: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    required: true,
  },
  landlord: {
    type: Schema.Types.ObjectId,
    ref: 'Landlord',
    required: true,
  },
  tenants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tenant',
    },
  ],
  category: {
    type: String,
    enum: ['Room', 'Flat', 'PG'],
    required: true,
  },
  genderRestriction: {
    type: String,
    enum: ['Boys', 'Girls', 'Family'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  nearbySpots: [
    {
      type: String,
      required: true,
    }
  ],
  inventory: [
    {
      itemName: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  amenities: {
    type: [String],  // Example: ['AC rooms', 'Hot water', 'Attached washroom']
    required: true,
  },
  photos: {
    type: [String],  // Array of image URLs
    required: true,
  },
}, { timestamps: true });

export const Property = mongoose.model('Property', propertySchema);
