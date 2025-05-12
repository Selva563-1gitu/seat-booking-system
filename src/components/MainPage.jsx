import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCustomerDetail } from "../contexts/CustomerProvider";

function MainPage() {
  const navigate = useNavigate();
  const { isLoggedIn, cusName } = useCustomerDetail();

  if (!isLoggedIn) {
    return (
      <div className="container home">
        <h1>Welcome to Seat Booking System</h1>
        <p>Please login to access your dashboard and reserve your seats.</p>
        <Link to="/react-app-demo/domains">
          <button className="nextbutton">Get Started</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Welcome back, {cusName} 👋</h1>
      <p className="dashboard-sub">Explore restaurant benefits and offers</p>

      <div className="dashboard-grid">
        <div className="dashboard-card" onClick={() => navigate("/react-app-demo/domains/food")}>
          <h3>🍽️ Prebook Your Food</h3>
          <p>Save time by ordering food in advance</p>
        </div>

        <div className="dashboard-card">
          <h3>🎁 Today's Offers</h3>
          <ul>
            <li>10% off on breakfast @ Cafe Bloom</li>
            <li>Flat ₹100 off on orders above ₹500</li>
            <li>Weekend Premium Pass available</li>
          </ul>
        </div>

        <div className="dashboard-card">
          <h3>💎 Premium Coins</h3>
          <p>You have <b>28</b> coins. Redeem now for extra perks!</p>
        </div>

        <div className="dashboard-card">
          <h3>⏰ Non-Peak Discounts</h3>
          <p>Enjoy 15% off when you dine before 12 PM or after 9 PM.</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/react-app-demo/domains/restaurant")}>
          <h3>🪑 Book a Seat</h3>
          <p>Choose your favorite restaurant and reserve your table.</p>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
