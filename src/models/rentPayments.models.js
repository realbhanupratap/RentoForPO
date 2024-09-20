const mongoose = require('mongoose');
const { Schema } = mongoose;

const rentPaymentSchema = new Schema({
  amount: {
    type: Number,
    required: true,
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
  }
}, { timestamps: true });

module.exports = mongoose.model('RentPayment', rentPaymentSchema);
