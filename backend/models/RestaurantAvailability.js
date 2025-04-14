const mongoose = require('mongoose');

const TimeSlotSchema = new mongoose.Schema({
  time: { type: String, required: true }, // e.g., "10:00 AM"
  booked_seats: { type: Number, default: 0 },
  available: { type: Boolean, default: true }
}, { _id: false });

const RestaurantAvailabilitySchema = new mongoose.Schema({
  fsq_id: { type: String, required: true, unique: true },
  total_seats: { type: Number, default: 40 },
  time_slots: [TimeSlotSchema],
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RestaurantAvailability', RestaurantAvailabilitySchema);
