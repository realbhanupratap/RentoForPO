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
  leaseStart: {
    type: Date,
    required: true,
  },
  leaseEnd: {
    type: Date,
    required: true,
  },
  rentAmount: {
    type: Number,
    required: true,
  },
  rentDueDate: {
    type: Number,  // Day of the month rent is due (1 - 31)
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,  // Active lease
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
