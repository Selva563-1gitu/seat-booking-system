import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRestaurant } from "../contexts/RestaurantProvider";
import { useCustomerDetail } from "../contexts/CustomerProvider";

function CustomerDetails() {
  const navigate = useNavigate();
  const {
    cusName, setCusName,
    gender, setGender,
    age, setAge,
    mobile, setMobile,
    email, setEmail
  } = useCustomerDetail();

  const { selectedRestaurant, selectedTimeSlot, selectedSeats, bookingDate } = useRestaurant();

  return (
    <div className="container">
      <div style={{ display: "flex", alignItems: "center", gap: "100px" }}>
        <div style={{ display: "flex", flexDirection: "column", borderRadius: "8px", backgroundColor: "var(--primary-background-color)", padding: "50px", color: "white" }}>
          <div className="splitter" style={{ margin: "5px", padding: "20px 10px", backgroundColor: "rgba(255,255,255,0.1)" }}>
            <label>Restaurant: </label> {selectedRestaurant.name}
          </div>
          <div className="splitter" style={{ margin: "5px", padding: "20px 10px", backgroundColor: "rgba(255,255,255,0.1)" }}>
            <label>Date: </label> {bookingDate}
          </div>
          <div className="splitter" style={{ margin: "5px", padding: "20px 10px", backgroundColor: "rgba(255,255,255,0.1)" }}>
            <label>Time Slot: </label> {selectedTimeSlot.time}
          </div>
          <div className="splitter" style={{ margin: "5px", padding: "20px 10px", backgroundColor: "rgba(255,255,255,0.1)" }}>
            <label>Selected Seats: </label> {selectedSeats.join(", ")}
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: "50px" }}>Enter Your Details</h2>
          <form style={{ display: "flex", flexDirection: "column", fontSize: "20px", marginTop: "20px", gap: "15px" }}>
            <label className="splitter">
              Name:
              <input type="text" value={cusName} onChange={(e) => setCusName(e.target.value)} />
            </label>
            <label className="splitter">
              Gender:
              <div><input type="radio" value="male" checked={gender === "male"} onChange={(e) => setGender(e.target.value)} /> Male
              
              <input type="radio" value="female" checked={gender === "female"} onChange={(e) => setGender(e.target.value)} /> Female</div>
            </label>
            <label className="splitter">
              Age:
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            </label>
            <label className="splitter">
              Mobile:
              <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} />
            </label>
            <label className="splitter">
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
          </form>
        </div>
      </div>
      <div style={{
          display: "grid",
          gridTemplateColumns: "500px 500px",
          gap: "40px",
          justifyItems:"center"
        }}>
        <Link to="/react-app-demo/domains/timeslots" style={{width:"300px"}}>
          <button className="nextbutton">⏮️ Previous</button>
        </Link>
        <button
          className="nextbutton"
          onClick={() => {
            if (!cusName || !age || !gender || !mobile) {
              alert("Please fill all the fields");
              return;
            }
            navigate("/react-app-demo/domains/bookSeats");
          }}
        >
          Next ⏭️
        </button>
      </div>
    </div>
  );
}

export default CustomerDetails;
