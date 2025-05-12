const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const nearbyRestaurantsRoute = require('./routes/nearbyRestaurants');
const customerRoute=require('./routes/customer');

dotenv.config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use(nearbyRestaurantsRoute);
app.use(customerRoute);
const adminRoutes = require("./routes/admin");
app.use(adminRoutes);


// Root endpoint
app.get('/', (req, res) => {
  res.send('🍽️ Restaurant Booking Backend is Running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
