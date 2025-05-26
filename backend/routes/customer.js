// routes/customer.js
const express = require("express");
const router = express.Router();
const odbc = require("odbc");
const Restaurant = require("../models/Restaurant");
const sendBookingEmail = require("../mailer");
const { notifySeatChange } = require("../socket");

// Connect to Oracle DB
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

router.post("/api/check-customer", async (req, res) => {
  const { email, mobile } = req.body;
  const connection = await connectDb();
  try {
    const result = await connection.query(`
      SELECT * FROM customer_table 
      WHERE email = '${email}' AND mobile = '${mobile}' FETCH FIRST 1 ROWS ONLY
    `);
    if (result.length > 0) {
      const user = result[0];
      res.json({
        found: true,
        customer: {
          cusName: user.CUSNAME,
          email: user.EMAIL,
          mobile: user.MOBILE,
          age: user.AGE,
          gender: user.GENDER,
        },
      });
    } else {
      res.json({ found: false });
    }
  } catch (err) {
    res.status(500).json({ error: "Error querying database" });
  } finally {
    if (connection) await connection.close();
  }
});
// Fetch Customer Bookings
router.post("/api/get-customer-bookings", async (req, res) => {
  const { mobile } = req.body;
  const connection = await connectDb();
  try {
    const result = await connection.query(`
      SELECT * FROM customer_table 
      WHERE mobile = '${mobile}'
      ORDER BY TIMING DESC
    `);
    res.json({ bookings: result });
  } catch (err) {
    res.status(500).json({ error: "Could not retrieve bookings" });
  } finally {
    if (connection) await connection.close();
  }
});
router.get("/api/customer-bookings", async (req, res) => {
  const { email, phone } = req.query;
  const connection = await connectDb();

  if (!connection) {
    return res.status(500).json({ message: "Oracle DB connection failed" });
  }

  try {
    const query = `SELECT * FROM customer_table WHERE email = '${email}' AND mobile = '${phone}'`;
    const bookings = await connection.query(query);
    res.json({ bookings });
    await connection.close();
  } catch (err) {
    console.error("❌ Oracle Query Error:", err.message);
    res.status(500).json({ message: "Error querying Oracle DB" });
  }
});
router.post("/api/save-food-order", async (req, res) => {
  const { restaurantName, timing, customerMobile, items } = req.body;

  const connection = await connectDb();
  if (!connection) {
    return res.status(500).json({ error: "DB connection failed" });
  }

  try {
    const query = `SELECT * FROM customer_table WHERE restaurantbooked = '${restaurantName}' AND timing = TO_DATE('${timing}', 'YYYY-mm-dd HH24:MI:SS') AND mobile = '${customerMobile}' FETCH FIRST 1 ROWS ONLY`;
    // console.log(query);
    const result = await connection.query(query);
    if (result.length === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const jsonString = JSON.stringify(items).replace(/'/g, "''");

    const update = `
      UPDATE customer_table
      SET food_orders = '${jsonString}'
      WHERE restaurantbooked = '${restaurantName}' 
        AND timing = TO_DATE('${timing}', 'YYYY-mm-dd HH24:MI:SS')
        AND mobile = '${customerMobile}'
    `;
    // console.log(update)
    await connection.query(update);
    res.json({ message: "✅ Food order stored successfully in Oracle" });
  } catch (err) {
    console.error("❌ Save food order error:", err.message);
    res.status(500).json({ error: "Failed to save food order" });
  } finally {
    await connection.close();
  }
});

// Booking Entry
router.post("/api/customer-entry", async (req, res) => {
  const body = req.body;
  const connection = await connectDb();

  if (!connection) {
    return res
      .status(500)
      .json({ code: "500", message: "Oracle DB connection failed" });
  }

  const seatStr = body.selectedSeats.join(", ");

  try {
    // Always insert a new booking, even for existing customers
    const insertQuery = `
      INSERT INTO customer_table (
        cusname, age, gender, mobile,
        restaurantbooked, timing, selected_seats, email,amount
      ) VALUES (
        '${body.cusName}', ${body.age}, '${body.gender}', '${body.mobile}',
        '${body.selectedRestaurant.name}', TO_DATE('${body.bookingDate} ${body.selectedTimeSlot.time}', 'yyyy-mm-dd HH:MI AM'),
        '${seatStr}', '${body.email}',${body.amount}
      )
    `;

    await connection.query(insertQuery);
    await connection.close();

    // MongoDB: update booked seat numbers
    const restaurant = await Restaurant.findOne({
      fsq_id: body.selectedRestaurant.fsq_id,
    });
    const slot = restaurant.time_slots.find(
      (ts) => ts.time === body.selectedTimeSlot.time
    );
    if (!slot) throw new Error("Slot not found");

    const existing = slot.bookings.find((b) => b.date === body.bookingDate);
    if (existing) {
      existing.seat_numbers = [
        ...new Set([...existing.seat_numbers, ...body.selectedSeats]),
      ];
    } else {
      slot.bookings.push({
        date: body.bookingDate,
        seat_numbers: body.selectedSeats,
      });
    }

    await restaurant.save();
    console.log("✅ MongoDB seat numbers saved");
    // ✅ Notify WebSocket clients
    notifySeatChange(
      restaurant._id,
      body.selectedTimeSlot.time,
      slot.bookings.find((b) => b.date === body.bookingDate)?.seat_numbers || []
    );

    await sendBookingEmail({
      to: body.email,
      customerName: body.cusName,
      restaurantName: body.selectedRestaurant.name,
      timeSlot: body.selectedTimeSlot.time,
      dateBooked: body.bookingDate,
      seats: body.selectedSeats.join(", "),
    });

    res.json({ code: "200", message: "Successfully Booked!" });
  } catch (err) {
    console.error("❌ Booking Error:", err.message);
    res.status(500).json({ error: "Booking process failed" });
  }
});

module.exports = router;
