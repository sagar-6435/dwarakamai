const mongoose = require('mongoose');

const serviceBookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    bookingDate: { type: Date, required: true },
    preferredTime: { type: String },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    notes: { type: String },
    contact: {
      phone: String,
      email: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ServiceBooking', serviceBookingSchema);
