import React, { useEffect, useState } from "react";
import { useRestaurant } from "../contexts/RestaurantProvider";
import { useCustomerDetail } from "../contexts/CustomerProvider";
import { useNavigate } from "react-router-dom";

function BookSeats() {
  const { selectedRestaurant, selectedTimeSlot, noOfSeats, bookingDate,setNoOfSeats } =
    useRestaurant();
  const { cusName, age, gender, mobile,setCusName,setAge,setGender,setMobile } = useCustomerDetail();

  const [timer, setTimer] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          bookSeats(); // Auto-book when timer reaches 0

          navigate("/react-app-demo");
          setCusName("");
          setAge("");
          setGender("");
          setMobile("");
          setNoOfSeats("");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown); // Cleanup on unmount
  }, []);

  async function bookSeats() {
    console.log(noOfSeats);
    const body = {
      cusName,
      age,
      gender,
      mobile,
      selectedRestaurant,
      selectedTimeSlot,
      noOfSeats,
      bookingDate,
    };

    try {
      const res = await fetch("http://localhost:3000/api/customer-entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.code === "200") {
        alert(data.message);
      } else {
        alert("Request Failed!!");
      }
    } catch (err) {
      alert("Error connecting to server.");
      console.error(err);
    }
  }

  return (
    <div className="container">
      <div
        style={{
          boxShadow: "3px 3px 5px 10px rgba(0,0,0,0.5)",
          borderRadius: "20px",
          padding: "50px",
        }}
      >
        <h1>Check Your Details...</h1>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="splitter">
            <label>Customer Name: </label> {cusName}
          </div>
          <div className="splitter">
            <label>Age: </label> {age}
          </div>
          <div className="splitter">
            <label>Gender: </label> {gender}
          </div>
          <div className="splitter">
            <label>Mobile No: </label> {mobile}
          </div>
          <div className="splitter">
            <label>Restaurant: </label> {selectedRestaurant.name}
          </div>
          <div className="splitter">
            <label>Time Slot: </label> {selectedTimeSlot.time}
          </div>
          <div className="splitter">
            <label>No. of Seats: </label> {noOfSeats}
          </div>
        </div>
        <p>
          Booking in <b>{timer}</b>s...
        </p>
        <button
          style={{ backgroundColor: "red", color: "white", padding: "10px" }}
          onClick={(e) => {
            e.preventDefault();
            navigate("/react-app-demo/domains/customerDetail");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default BookSeats;
