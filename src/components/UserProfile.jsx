import React, { useEffect, useState } from "react";
import { useCustomerDetail } from "../contexts/CustomerProvider";
import axios from "axios";
import { useRestaurant } from "../contexts/RestaurantProvider";

const UserProfile = () => {
  const { cusName, email, mobile, login, logout, isLoggedIn ,userPlan,setUserPlan} =
    useCustomerDetail();
  const [userExists, setUserExists] = useState(null);
  const [form, setForm] = useState({ email: "", mobile: "" });
  const [bookings, setBookings] = useState([]);
  const { selectedFoodsByRestaurant } = useRestaurant();
  const [showPlans, setShowPlans] = useState(false);

  const [foodOrders, setFoodOrders] = useState([]);
  useEffect(() => {
    if (mobile) fetchBookings(mobile);
  }, [mobile]);

  const fetchUser = async () => {
    try {
      const res = await axios.post("/api/check-customer", form);
      if (res.data.found) {
        login(res.data.customer);
        setUserExists(true);
        fetchBookings(res.data.customer.mobile);
      } else {
        setUserExists(false);
      }
    } catch (err) {
      alert("Error checking user.");
    }
  };

  const fetchBookings = async (mobileNo) => {
    try {
      const res = await axios.post("/api/get-customer-bookings", {
        mobile: mobileNo,
      });

      const bookings = res.data.bookings || [];

      // Filter food orders with data
      const foodData = bookings
        .filter((b) => b.FOOD_ORDERS)
        .map((b) => ({
          restaurant: b.RESTAURANTBOOKED,
          timing: b.TIMING,
          items: JSON.parse(b.FOOD_ORDERS.replace(/''/g, "'")),
        }));

      setBookings(bookings);
      setFoodOrders(foodData);
    } catch (err) {
      console.error("Booking fetch error:", err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUser();
  };

  const today = new Date();
  const upcoming = bookings.filter((b) => new Date(b.TIMING) >= today);
  const past = bookings.filter((b) => new Date(b.TIMING) < today);

  if (!isLoggedIn) {
    return (
      <div className="user-profile">
        <h2>👤 User Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="splitter">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="splitter">
            <label>Mobile</label>
            <input
              type="text"
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              required
            />
          </div>
          <button className="nextbutton" type="submit">
            Login
          </button>
        </form>
        {userExists === false && <p>User not found. Please register.</p>}
        <p className="tip">
          💡 Tip: Your mobile number will act as your password.
        </p>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <h2>👤 Welcome, {cusName}</h2>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Phone:</strong> {mobile}
      </p>

      <button
        onClick={logout}
        className="nextbutton"
        style={{ maxWidth: "150px", margin: "10px 0" }}
      >
        Logout
      </button>

      <h3>💼 Subscription Plan</h3>
      <p>
        You are currently on the <strong>{userPlan}</strong> plan.
      </p>
      <br/>
      <button className="nextbutton" onClick={() => setShowPlans(!showPlans)}>
        {showPlans ? "Hide Plans" : "View Plans"}
      </button>

      {showPlans && (
        <div className="plan-container">
          <div className="plan-card basic">
            <h4>Basic</h4>
            <p>₹0 / year</p>
            <ul>
              <li>✔️ Seat booking in any restaurant</li>
              <li>✔️ Pre-food ordering</li>
              <li>✔️ View upcoming bookings</li>
              <li>❌ No admin dashboard access</li>
              <li>❌ No messaging support</li>
            </ul>
            <button className={userPlan==="Basic"?"plan-btn disabled":"plan-btn"} onClick={(e)=>{setUserPlan("Basic")}}>{userPlan==="Basic"?"Current Plan":"Basic Plan"}</button>
          </div>

          <div className="plan-card premium">
            <h4>Premium</h4>
            <p>₹999 / year</p>
            <ul>
              <li>✔️ Everything in Basic</li>
              <li>✔️ Admin dashboard access</li>
              <li>✔️ Exclusive food discounts</li>
              <li>✔️ Priority support</li>
            </ul>
            <button className={userPlan==="Premium"?"plan-btn disabled":"plan-btn"} onClick={(e)=>{setUserPlan("Premium")}}>{userPlan==="Premium"?"Current Plan":"Upgrade to Premium"}</button>
          </div>
        </div>
      )}

      <h3>📅 Upcoming Bookings</h3>
      <ul className="booking-summary">
        {upcoming.length === 0 ? (
          <p>No upcoming bookings.</p>
        ) : (
          upcoming.map((b, i) => (
            <li key={i}>
              <strong>Restaurant:</strong> {b.RESTAURANTBOOKED}
              <br />
              <strong>Date & Time:</strong>{" "}
              {new Date(b.TIMING).toLocaleString()}
              <br />
              <strong>Seats:</strong> {b.SELECTED_SEATS}
            </li>
          ))
        )}
      </ul>

      <hr style={{ margin: "2rem 0", borderColor: "#ccc" }} />

      <h3>🕒 Past Bookings</h3>
      <ul className="booking-summary">
        {past.length === 0 ? (
          <p>No past bookings.</p>
        ) : (
          past.map((b, i) => (
            <li key={i}>
              <strong>Restaurant:</strong> {b.RESTAURANTBOOKED}
              <br />
              <strong>Date & Time:</strong>{" "}
              {new Date(b.TIMING).toLocaleString()}
              <br />
              <strong>Seats:</strong> {b.SELECTED_SEATS}
            </li>
          ))
        )}
      </ul>

      <hr style={{ margin: "2rem 0", borderColor: "#ccc" }} />

      {foodOrders.length > 0 && (
        <>
          <h3>🍽️ Food Orders</h3>
          {foodOrders.map((order, i) => (
            <ul key={i} className="booking-summary">
              <li>
                <strong>Restaurant:</strong> {order.restaurant} <br />
                <strong>Time:</strong> {new Date(order.timing).toLocaleString()}{" "}
                <br />
                <strong>Items:</strong>
                <ul>
                  {order.items.map((item, idx) => (
                    <p key={idx}>
                      {item.name} × {item.quantity} = ₹{item.total}
                    </p>
                  ))}
                </ul>
              </li>
            </ul>
          ))}
        </>
      )}
    </div>
  );
};

export default UserProfile;
