import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./AdminDashboard.css";

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await axios.get("http://localhost:3001/api/admin/bookings");
        setBookings(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      }
    }
    fetchBookings();
  }, []);

  return (
    <div className="admin-container">
      <h2>Restaurant Bookings (Admin View)</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Restaurant</th>
            <th>Timing</th>
            <th>Selected Seats</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.ID}>
              <td>{b.ID}</td>
              <td>{b.CUSNAME}</td>
              <td>{b.GENDER}</td>
              <td>{b.AGE}</td>
              <td>{b.MOBILE}</td>
              <td>{b.EMAIL}</td>
              <td>{b.RESTAURANTBOOKED}</td>
              <td>{new Date(b.TIMING).toLocaleString()}</td>
              <td>{b.SELECTED_SEATS}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
