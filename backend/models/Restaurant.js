const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  date: { type: String, required: true },
  seat_numbers: { type: [String], default: [] }
});

const timeSlotSchema = new mongoose.Schema({
  time: { type: String, required: true },
  bookings: { type: [bookingSchema], default: [] }
});

const menuItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String // You can use local path or CDN URL
});

const restaurantSchema = new mongoose.Schema({
  fsq_id: { type: String, required: true, unique: true },
  name: String,
  distance: Number,
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true },
    formatted_address: String
  },
  total_seats: { type: Number, default: 40 },
  time_slots: { type: [timeSlotSchema], default: [] },
  menu: { type: [menuItemSchema], default: [] } // ⬅️ NEW
});

restaurantSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Restaurant", restaurantSchema);
