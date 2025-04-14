const express = require("express");
const router = express.Router();
const axios = require("axios");
const Restaurant = require("../models/Restaurant");
const odbc = require("odbc"); // Use ODBC instead of oracledb

// Connect to Oracle DB using ODBC
async function connectDb() {
  try {
    const connection = await odbc.connect(
      `DSN=MyOracleDB;UID=selva123;PWD=selva123`
    );
    return connection;
  } catch (err) {
    console.error("❌ ODBC Connection Error:", err.message);
    return null;
  }
}

router.post("/api/customer-entry", async (req, res) => {
  const connection = await connectDb();
  const body = req.body;

  // Step 2: Insert customer data into Oracle using ODBC
  const insertQuery = `
    INSERT INTO customer_table (
      cusname, age, gender, mobile,
      restaurantbooked, timing, noofseats
    ) VALUES (
      '${body.cusName}', ${body.age} ,'${body.gender}','${body.mobile}','${body.selectedRestaurant.name}', TO_DATE('${body.bookingDate} ${body.selectedTimeSlot.time}', 'yyyy-mm-dd HH:MI AM'),${body.noOfSeats})
  `;
  if (!connection) {
    return res
      .status(500)
      .json({ code: "500", message: "Oracle DB connection failed" });
  }
  try {
    await connection.query(insertQuery);
    await connection.close();
    res.json({ code: "200", message: "Successfully Booked!" });
  } catch (err) {
    console.error("❌ Oracle Insert Error:", err.message);
    res
      .status(500)
      .json({ code: "500", message: "Booking Failed", error: err.message });
  }

  // Step 1: Update MongoDB seat booking
  try{
async function bookSeats(restaurantId, timeSlot, bookingDate, seatsToBook) {

    const restaurant = await Restaurant.find({fsq_id:restaurantId});

    if (!restaurant) throw new Error("❌ Restaurant not found");

    const slot = restaurant[0].time_slots.find((ts) => ts.time === timeSlot);
    if (!slot) throw new Error("❌ Time slot not found");

    // Find existing booking for the same date
    const existingBooking = slot.bookings.find((b) => b.date === bookingDate);

    // Get total seats booked for that time slot on that day
    const totalSeatsBooked = existingBooking ? existingBooking.seats : 0;

    if (totalSeatsBooked + seatsToBook > restaurant.total_seats) {
      throw new Error("❌ Not enough seats available");
    }
    console.log(totalSeatsBooked);
    console.log(body.noOfSeats);
    console.log(seatsToBook);
    // Update booking
    if (existingBooking) {
      existingBooking.seats += seatsToBook;
    } else {
      slot.bookings.push({
        date: bookingDate,
        seats: seatsToBook,
      });
    }

    await restaurant[0].save();
    console.log("✅ MongoDB Updated:");
  }
  bookSeats(body.selectedRestaurant.fsq_id,body.selectedTimeSlot.time,body.bookingDate,body.noOfSeats)
  }catch(E){
    console.log("kjg f");
  }
  
});

module.exports = router;
