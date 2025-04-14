const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  date: {
    type: String, // Format: 'YYYY-MM-DD'
    required: true
  },
  seats: {
    type: Number,
    required: true,
    min: 0
  }
});

const timeSlotSchema = new mongoose.Schema({
  time: {
    type: String, // e.g., "12:00 PM"
    required: true
  },
  bookings: {
    type: [bookingSchema],
    default: []
  }
});

const restaurantSchema = new mongoose.Schema({
  fsq_id: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  distance: Number,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    },
    formatted_address: String
  },
  total_seats: {
    type: Number,
    default: 40
  },
  time_slots: {
    type: [timeSlotSchema],
    default: []
  }
});

restaurantSchema.index({ location: '2dsphere' });

module.exports = mongoose.model("Restaurant", restaurantSchema);
