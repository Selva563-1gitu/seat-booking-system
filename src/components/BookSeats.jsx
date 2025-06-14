import React, { useEffect, useState } from "react";
import { useRestaurant } from "../contexts/RestaurantProvider";
import { useCustomerDetail } from "../contexts/CustomerProvider";
import { useNavigate } from "react-router-dom";

import { io } from "socket.io-client";
const socket = io("http://localhost:3001");
function BookSeats() {
  const {
    selectedRestaurant,
    setSelectedRestaurant,
    selectedTimeSlot,
    setSelectedTimeSlot,
    bookingDate,
    setBookingDate,
    selectedSeats,
    setSelectedSeats,
    // setBookedSeats,
    isHoliday,
  } = useRestaurant();
  const {
    cusName,
    age,
    gender,
    mobile,
    setCusName,
    setAge,
    setGender,
    setMobile,
    email,
    setEmail,
    isLoggedIn,
    userPlan,setPremiumCoins
  } = useCustomerDetail();

  const [timer, setTimer] = useState(10);
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [amount,setAmount]=useState(0);
  useEffect(()=>{
    setAmount(isHoliday?selectedSeats.length*200:selectedSeats.length*150)
  },[selectedSeats])
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          if(userPlan==="Premium"){
            alert(`Yep! You have earned ${selectedSeats.length} Premium Points!`);
            setPremiumCoins(p=>p+selectedSeats.length)
          }
          
          bookSeats(); // Auto-book when timer reaches 0

          navigate("/react-app-demo");

          setSelectedRestaurant("");
          setSelectedTimeSlot("");
          setBookingDate(today);
          setSelectedSeats([]);
          setAmount(0);

          if (!isLoggedIn) {
            setCusName("");
            setAge("");
            setGender("");
            setMobile("");
            setEmail("");
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown); // Cleanup on unmount
  }, []);

  async function bookSeats() {
    const body = {
      cusName,
      age,
      gender,
      mobile,
      selectedRestaurant,
      selectedTimeSlot,
      selectedSeats,
      bookingDate,
      email,
      amount
    };

    try {
      const res = await fetch("/api/customer-entry", {
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
  useEffect(() => {
    if (selectedRestaurant && selectedTimeSlot) {
      socket.emit("join", {
        restaurantId: selectedRestaurant._id,
        timeSlot: selectedTimeSlot.time,
      });
      const handleSeatUpdate = (updatedSeats) => {
        // setBookedSeats(updatedSeats);
        alert("⚠️ Seats have been modified. Please refresh or reselect!");
        // setRefreshAlert(true);
      };

      socket.on("seat-updated", handleSeatUpdate);

      return () => {
        socket.off("seat-updated", handleSeatUpdate);
      };
    }
  }, [selectedRestaurant, selectedTimeSlot]);

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "8px",
          backgroundColor: "var(--primary-background-color)",
          padding: "50px",
          color: "white",
        }}
      >
        <h1>Check Your Details...</h1>
        <div
          style={{ display: "flex", flexDirection: "column", margin: "20px" }}
        >
          <div
            className="splitter"
            style={{
              margin: "5px",
              padding: "20px 10px",
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
          >
            <label>Customer Name: </label> {cusName}
          </div>
          <div
            className="splitter"
            style={{
              margin: "5px",
              padding: "20px 10px",
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
          >
            <label>Age: </label> {age}
          </div>
          <div
            className="splitter"
            style={{
              margin: "5px",
              padding: "20px 10px",
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
          >
            <label>Gender: </label> {gender}
          </div>
          <div
            className="splitter"
            style={{
              margin: "5px",
              padding: "20px 10px",
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
          >
            <label>Mobile No: </label> {mobile}
          </div>
          <div
            className="splitter"
            style={{
              margin: "5px",
              padding: "20px 10px",
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
          >
            <label>Restaurant: </label> {selectedRestaurant.name}
          </div>
          <div
            className="splitter"
            style={{
              margin: "5px",
              padding: "20px 10px",
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
          >
            <label>Time Slot: </label> {selectedTimeSlot.time}
          </div>
          <div
            className="splitter"
            style={{
              margin: "5px",
              padding: "20px 10px",
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
          >
            <label>Selected Seats: </label> {selectedSeats.join(",")}
          </div>
          <div
            className="splitter"
            style={{
              marginTop:"30px",
              fontSize:"48px"
            }}
          >
            <label>Amount: </label> Rs.{amount}/-
          </div>
        </div>
        <p>
          Booking in <b>{timer}</b>s...
        </p>
        <button
          className="nextbutton"
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "10px",
            marginTop: "50px",
          }}
          onClick={(e) => {
            e.preventDefault();
            if (!isLoggedIn) {
              navigate("/react-app-demo/domains/customerDetail");
            } else {
              navigate("/react-app-demo/domains/timeslots");
            }
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default BookSeats;
