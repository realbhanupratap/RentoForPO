import mongoose, { Schema } from 'mongoose';

const tenantManagementSchema = new Schema({
  tenant: {
    type: Schema.Types.ObjectId,
    ref: 'Tenant',  // Referencing Tenant model
    required: true,
  },
  property: {
    type: Schema.Types.ObjectId,
    ref: 'Property',  // Referencing Property model
    required: true,
  },
  room: {
    type: String,  // E.g., Room 101, Room A2, etc.
    required: [true, 'Room number is required'],
  },
  bed: {
    type: String,  // E.g., Bed 1 in Room 101, useful for PGs
  },
  leaseStart: {
    type: Date,
    required: [true, 'Lease start date is required'],
  },
  leaseEnd: {
    type: Date,
    required: [true, 'Lease end date is required'],
  },
  rentAmount: {
    type: Number,
    required: [true, 'Rent amount is required'],
    min: [0, 'Rent amount must be a positive number'],
  },
  rentDueDate: {
    type: Number,  // Day of the month rent is due (1 - 31)
    required: [true, 'Rent due date is required'],
    min: [1, 'Rent due date must be between 1 and 31'],
    max: [31, 'Rent due date must be between 1 and 31'],
  },
  amenitiesUsed: {
    type: [String],  // List of amenities the tenant is using (e.g., AC, WiFi, etc.)
  },
  isActive: {
    type: Boolean,
    default: true,  // Active lease by default
  },
  complaints: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Complaint',  // Linking complaints made by the tenant
    }
  ]
}, {
  timestamps: true,
});

export const TenantManagement = mongoose.model('TenantManagement', tenantManagementSchema);
