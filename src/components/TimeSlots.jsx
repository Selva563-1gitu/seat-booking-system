import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRestaurant } from "../contexts/RestaurantProvider";

function TimeSlots({ restaurant }) {
  const navigate = useNavigate();

  const { selectedTimeSlot, setSelectedTimeSlot } = useRestaurant();
  const { noOfSeats, setNoOfSeats } = useRestaurant();
  const today = new Date().toISOString().split("T")[0];
  const maxDateObj = new Date();
  maxDateObj.setDate(maxDateObj.getDate() + 30);
  const maxBookingDate = maxDateObj.toISOString().split("T")[0];

  const { bookingDate, setBookingDate } = useRestaurant();

  console.log(restaurant);
  console.log(bookingDate);
  const func = (slot) => {
    const existingBooking = slot.bookings.find((b) => b.date === bookingDate);
    // Get total seats booked for that time slot on that day
    const totalSeatsBooked = existingBooking ? existingBooking.seats : 0;
    return totalSeatsBooked;
  };
  return (
    <div className="container">
      <h2 style={{ fontSize: "80px" }}>Select Time Slot...</h2>
      <div className="splitter">
        <label>Booking Date: </label>
        <input
          type="date"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          min={today}
          max={maxBookingDate}
        />
      </div>
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          maxHeight: "400px",
          overflowX: "scroll",
        }}
      >
        {restaurant.time_slots.length > 0 ? (
          restaurant.time_slots.map((domain, index) => (
            <li
              className={
                selectedTimeSlot === domain ? "selected domain" : "domain"
              }
              style={{ maxWidth: "300px" }}
              key={index}
              onClick={(e) => {
                setSelectedTimeSlot(domain);
              }}
            >
              <h2>{domain.time}</h2>

              <p>{40 - func(domain)} seats available</p>
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
      {selectedTimeSlot ? (
        <input
          type="number"
          value={noOfSeats}
          onChange={(e) => setNoOfSeats(e.target.value)}
          placeholder="Enter No. Of Seats Here..."
          style={{ padding: "20px", fontSize: "24px", margin: "24px" }}
          max={40 - selectedTimeSlot.booked_seats}
        />
      ) : (
        <></>
      )}
      <buttondiv
        style={{
          display: "grid",
          gridTemplateColumns: "500px 500px",
          gap: "40px",
        }}
      >
        <Link to="/react-app-demo/domains/restaurant">
          <button className="nextbutton">⏮️ Previous</button>
        </Link>
        <button
          className="nextbutton"
          onClick={(e) => {
            if (selectedTimeSlot === "" || noOfSeats === "") {
              alert("Select Time Slot and fill No. Of Seats!!");
            } else {
              if (noOfSeats > 40 - selectedTimeSlot.booked_seats) {
                alert(
                  `No. Of Seats must be less than ${
                    40 - selectedTimeSlot.booked_seats
                  }`
                );
              } else {
                navigate("/react-app-demo/domains/customerDetail");
              }
            }
          }}
        >
          Next ⏭️
        </button>
      </buttondiv>
    </div>
  );
}

export default TimeSlots;
