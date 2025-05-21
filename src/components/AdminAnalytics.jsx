import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

function AdminAnalytics() {
  const [bookings, setBookings] = useState([]);
  const [seatData, setSeatData] = useState([]);
  const [timeSlotData, setTimeSlotData] = useState([]);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await axios.get("http://localhost:3001/api/admin/bookings");
        const data = res.data;
        setBookings(data);
        processChartData(data);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      }
    }

    fetchBookings();
  }, []);

  const processChartData = (data) => {
    const restaurantSeatMap = {};
    const timeSlotMap = {};

    data.forEach((booking) => {
      const restaurant = booking.RESTAURANTBOOKED;
      const time = new Date(booking.TIMING).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const seats = booking.SELECTED_SEATS.split(",").map(s => s.trim()).filter(s => s);
      const seatCount = seats.length;

      // Total per restaurant
      if (!restaurantSeatMap[restaurant]) {
        restaurantSeatMap[restaurant] = 0;
      }
      restaurantSeatMap[restaurant] += seatCount;

      // Per restaurant per time slot
      if (!timeSlotMap[restaurant]) {
        timeSlotMap[restaurant] = {};
      }
      if (!timeSlotMap[restaurant][time]) {
        timeSlotMap[restaurant][time] = 0;
      }
      timeSlotMap[restaurant][time] += seatCount;
    });

    // Convert to chart-friendly format
    const seatDataArr = Object.entries(restaurantSeatMap).map(([restaurant, count]) => ({
      restaurant,
      seats: count
    }));

    const uniqueTimeSlots = new Set();
    Object.values(timeSlotMap).forEach(slots => {
      Object.keys(slots).forEach(slot => uniqueTimeSlots.add(slot));
    });

    const timeDataArr = Object.entries(timeSlotMap).map(([restaurant, slots]) => {
      const entry = { restaurant };
      uniqueTimeSlots.forEach(slot => {
        entry[slot] = slots[slot] || 0;
      });
      return entry;
    });

    setSeatData(seatDataArr);
    setTimeSlotData(timeDataArr);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📊 Restaurant Booking Analytics</h2>

      <h3>Seats Booked per Restaurant</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={seatData}>
          <XAxis dataKey="restaurant" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="seats" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <h3>Seats per Time Slot per Restaurant</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={timeSlotData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="restaurant" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(timeSlotData[0] || {}).filter(k => k !== "restaurant").map((time, idx) => (
            <Bar key={time} dataKey={time} stackId="a" fill={['#8884d8', '#82ca9d', '#ffc658', '#d88484'][idx % 4]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AdminAnalytics;
