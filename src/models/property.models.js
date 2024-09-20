const mongoose = require('mongoose');
const { Schema } = mongoose;

const propertySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
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
    }
  ],
  inventory: [
    {
      itemName: String,
      quantity: Number
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
