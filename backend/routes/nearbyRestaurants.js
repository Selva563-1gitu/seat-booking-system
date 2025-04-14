// routes/nearbyRestaurants.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const Restaurant = require('../models/Restaurant');

const FOURSQUARE_API_KEY = "fsq3/bDBU0p0YYuyjvdakfH1NyH18DTajoDfclyh0pWvltY=";

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
    const defaultTimeSlots = [
      "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"
    ];
    
    // Save each restaurant to MongoDB
    for (let place of places) {
      const existing = await Restaurant.findOne({ fsq_id: place.fsq_id });
    
      if (!existing) {
        const time_slots = defaultTimeSlots.map(time => ({
          time,
          bookings: [] // each booking will be { date: 'YYYY-MM-DD', seats: N }
        }));
    
        await Restaurant.create({
          fsq_id: place.fsq_id,
          name: place.name,
          distance: place.distance,
          location: {
            type: "Point",
            coordinates: [place.geocodes.main.longitude, place.geocodes.main.latitude],
            formatted_address: place.location.formatted_address
          },
          total_seats: 40,
          time_slots: time_slots
        });
        
      }
    }

    res.json(places); // Send fetched restaurants back to frontend

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Foursquare API or DB error' });
  }
});
router.get('/api/nearby-restaurants',async(req,res)=>{
  const restaurants = await Restaurant.find();
  res.json({restaurants});
})

module.exports = router;
