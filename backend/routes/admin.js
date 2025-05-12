const express = require("express");
const router = express.Router();
const odbc = require("odbc");

async function connectDb() {
  try {
    return await odbc.connect(`DSN=MyOracleDB;UID=selva123;PWD=selva123`);
  } catch (err) {
    console.error("❌ DB Connect Error:", err.message);
    return null;
  }
}

router.get("/api/admin/bookings", async (req, res) => {
  const connection = await connectDb();
  if (!connection) return res.status(500).json({ message: "DB connection failed" });

  try {
    const result = await connection.query(`
      SELECT id, cusname, age, gender, mobile, restaurantbooked, timing, selected_seats, email
      FROM customer_table
      ORDER BY timing DESC
    `);
    await connection.close();
    // console.log(result);
    res.json(result);
  } catch (err) {
    console.error("❌ Query Failed:", err.message);
    res.status(500).json({ message: "Failed to fetch data" });
  }
});

module.exports = router;
