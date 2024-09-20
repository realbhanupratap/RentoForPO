const mongoose = require('mongoose');
const { Schema } = mongoose;

const complaintSchema = new Schema({
  description: {
    type: String,
    required: true,
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
  status: {
    type: String,
    enum: ['open', 'in progress', 'closed'],
    default: 'open',
  },
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
