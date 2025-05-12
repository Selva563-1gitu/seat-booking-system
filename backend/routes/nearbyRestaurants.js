const express = require('express');
const router = express.Router();
const axios = require('axios');
const Restaurant = require('../models/Restaurant');

const FOURSQUARE_API_KEY = "fsq3/bDBU0p0YYuyjvdakfH1NyH18DTajoDfclyh0pWvltY=";

const defaultTimeSlots = [
  "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"
];
const defaultMenus = [
  [
    { name: "Paneer Butter Masala", price: 220, image: "/images/paneer.jpg", type: "veg" },
    { name: "Butter Naan", price: 40, image: "/images/naan.jpg", type: "veg" },
    { name: "Veg Biryani", price: 140, image: "/images/vegbiryani.jpg", type: "veg" },
    { name: "Raita", price: 30, image: "/images/raita.jpg", type: "veg" },
    { name: "Gulab Jamun", price: 60, image: "/images/gulab.jpg", type: "veg" },
    { name: "Cold Coffee", price: 80, image: "/images/coffee.jpg", type: "veg" },
    { name: "Choco Shake", price: 90, image: "/images/shake.jpg", type: "veg" },
    { name: "French Fries", price: 70, image: "/images/fries.jpg", type: "veg" }
  ],
  [
    { name: "Chicken Biryani", price: 250, image: "/images/chickenbiryani.jpg", type: "non-veg" },
    { name: "Butter Chicken", price: 290, image: "/images/butterchicken.jpg", type: "non-veg" },
    { name: "Plain Naan", price: 35, image: "/images/naan.jpg", type: "veg" },
    { name: "Mint Chutney", price: 20, image: "/images/chutney.jpg", type: "veg" },
    { name: "Onion Salad", price: 15, image: "/images/salad.jpg", type: "veg" },
    { name: "Lassi", price: 50, image: "/images/lassi.jpg", type: "veg" },
    { name: "Ice Cream", price: 60, image: "/images/icecream.jpg", type: "veg" },
    { name: "French Fries", price: 70, image: "/images/fries.jpg", type: "veg" }
  ],
  [
    { name: "Veg Burger", price: 120, image: "/images/burger.jpg", type: "veg" },
    { name: "Veg Sandwich", price: 90, image: "/images/sandwich.jpg", type: "veg" },
    { name: "Cold Coffee", price: 80, image: "/images/coffee.jpg", type: "veg" },
    { name: "Pav Bhaji", price: 100, image: "/images/pavbhaji.jpg", type: "veg" },
    { name: "Paneer Spring Roll", price: 120, image: "/images/springroll.jpg", type: "veg" },
    { name: "Raita", price: 30, image: "/images/raita.jpg", type: "veg" },
    { name: "Gulab Jamun", price: 60, image: "/images/gulab.jpg", type: "veg" },
    { name: "Choco Shake", price: 90, image: "/images/shake.jpg", type: "veg" }
  ],
  [
    { name: "Egg Curry", price: 150, image: "/images/egg.jpg", type: "non-veg" },
    { name: "Chicken Biryani", price: 250, image: "/images/chickenbiryani.jpg", type: "non-veg" },
    { name: "Chilli Chicken", price: 180, image: "/images/chillichicken.jpg", type: "non-veg" },
    { name: "Fried Rice", price: 100, image: "/images/friedrice.jpg", type: "veg" },
    { name: "Hakka Noodles", price: 120, image: "/images/noodles.jpg", type: "veg" },
    { name: "Sweet Corn Soup", price: 60, image: "/images/soup.jpg", type: "veg" },
    { name: "French Fries", price: 70, image: "/images/fries.jpg", type: "veg" },
    { name: "Lemon Soda", price: 30, image: "/images/soda.jpg", type: "veg" }
  ],
  [
    { name: "Idli", price: 50, image: "/images/idli.jpg", type: "veg" },
    { name: "Vada", price: 40, image: "/images/vada.jpg", type: "veg" },
    { name: "Masala Dosa", price: 90, image: "/images/dosa.jpg", type: "veg" },
    { name: "Poori Masala", price: 70, image: "/images/poori.jpg", type: "veg" },
    { name: "Raita", price: 30, image: "/images/raita.jpg", type: "veg" },
    { name: "Gulab Jamun", price: 60, image: "/images/gulab.jpg", type: "veg" },
    { name: "Cold Coffee", price: 80, image: "/images/coffee.jpg", type: "veg" },
    { name: "Choco Shake", price: 90, image: "/images/shake.jpg", type: "veg" }
  ],
  [
    { name: "Tandoori Chicken", price: 320, image: "/images/tandoori.jpg", type: "non-veg" },
    { name: "Mutton Curry", price: 350, image: "/images/mutton.jpg", type: "non-veg" },
    { name: "Plain Naan", price: 35, image: "/images/naan.jpg", type: "veg" },
    { name: "Jeera Rice", price: 90, image: "/images/jeerarice.jpg", type: "veg" },
    { name: "Lassi", price: 50, image: "/images/lassi.jpg", type: "veg" },
    { name: "Ice Cream", price: 60, image: "/images/icecream.jpg", type: "veg" },
    { name: "Chutney", price: 20, image: "/images/chutney.jpg", type: "veg" },
    { name: "Onion Salad", price: 15, image: "/images/salad.jpg", type: "veg" }
  ],
  [
    { name: "Veg Wrap", price: 110, image: "/images/wrap.jpg", type: "veg" },
    { name: "Paneer Butter Masala", price: 220, image: "/images/paneer.jpg", type: "veg" },
    { name: "Dal Makhani", price: 130, image: "/images/dalmakhani.jpg", type: "veg" },
    { name: "Veg Biryani", price: 140, image: "/images/vegbiryani.jpg", type: "veg" },
    { name: "Ice Cream", price: 60, image: "/images/icecream.jpg", type: "veg" },
    { name: "Butter Naan", price: 40, image: "/images/naan.jpg", type: "veg" },
    { name: "Cold Coffee", price: 80, image: "/images/coffee.jpg", type: "veg" },
    { name: "Choco Shake", price: 90, image: "/images/shake.jpg", type: "veg" }
  ]
];

router.post('/api/nearby-restaurants', async (req, res) => {
  const { latitude, longitude } = req.body;

  try {
    const response = await axios.get('https://api.foursquare.com/v3/places/search', {
      headers: {
        Authorization: FOURSQUARE_API_KEY,
        accept: 'application/json'
      },
      params: {
        ll: `${latitude},${longitude}`,
        radius: 2000,
        categories: 13065,
        limit: 20,
        sort: 'DISTANCE'
      }
    });

    const places = response.data.results;
    const enrichedRestaurants = [];

    let menuIndex = 0;

    for (let place of places) {
      let existing = await Restaurant.findOne({ fsq_id: place.fsq_id });

      if (!existing) {
        const time_slots = defaultTimeSlots.map(time => ({
          time,
          bookings: []
        }));

        // Rotate through the defaultMenus
        const menu = defaultMenus[menuIndex % defaultMenus.length];
        menuIndex++;

        existing = await Restaurant.create({
          fsq_id: place.fsq_id,
          name: place.name,
          distance: place.distance,
          location: {
            type: "Point",
            coordinates: [place.geocodes.main.longitude, place.geocodes.main.latitude],
            formatted_address: place.location.formatted_address
          },
          total_seats: 40,
          time_slots: time_slots,
          menu: menu
        });
      }

      enrichedRestaurants.push(existing);
    }

    res.json(enrichedRestaurants);

  } catch (error) {
    console.error("❌ Foursquare API or DB Error:", error.response?.data || error.message);
    res.status(500).json({ error: 'Foursquare API or DB error' });
  }
});

// Static GET (load all from Mongo)
router.get('/api/nearby-restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json({ restaurants });
  } catch (err) {
    res.status(500).json({ error: "Database fetch failed" });
  }
});

router.get("/api/restaurant-menu/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ fsq_id: req.params.id });
    if (!restaurant) return res.status(404).json({ error: "Restaurant not found" });
    res.json({ menu: restaurant.menu });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch menu" });
  }
});

router.post("/api/restaurant-menu-by-name", async (req, res) => {
  try {
    const { restaurantName } = req.body;

    if (!restaurantName) {
      return res.status(400).json({ error: "Restaurant name is required" });
    }

    // Case-insensitive match to avoid failure due to letter case differences
    const restaurant = await Restaurant.findOne({
      name: { $regex: new RegExp(`^${restaurantName}$`, 'i') }
    });

    if (!restaurant) {
      console.warn(`Restaurant not found for name: ${restaurantName}`);
      return res.json({ error: "Restaurant not found" });
    }

    res.json({ menu: restaurant.menu });
  } catch (err) {
    console.error("Failed to fetch restaurant menu:", err.message);
    res.status(500).json({ error: "Server error fetching menu" });
  }
});





module.exports = router;
