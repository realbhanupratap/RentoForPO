import mongoose, { Schema } from 'mongoose';

const rentPaymentSchema = new Schema({
  amount: {
    type: Number,
    required: true,
    min: [0, "Amount cannot be negative"],  // Validating amount
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  tenant: {
    type: Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true,
  },
  property: {
    type: Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  },
  landlord: {
    type: Schema.Types.ObjectId,
    ref: 'Landlord',
    required: true,
  },
}, { timestamps: true });

export const RentPayment = mongoose.model('RentPayment', rentPaymentSchema);
