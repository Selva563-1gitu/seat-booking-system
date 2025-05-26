import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRestaurant } from "../contexts/RestaurantProvider";
import { useCustomerDetail } from "../contexts/CustomerProvider";
import SeatSelector from "./SeatSelector";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

function TimeSlots() {
  const navigate = useNavigate();
  const [layoutData, setLayoutData] = useState([
    {
      id: "T1",
      type: "table",
      x: 120,
      y: 60,
      width: 80,
      height: 70,
      label: "T1",
    },
    { id: "T1-S1", type: "seat", x: 80, y: 60 },
    { id: "T1-S2", type: "seat", x: 210, y: 60 },
    { id: "T1-S3", type: "seat", x: 80, y: 100 },
    { id: "T1-S4", type: "seat", x: 210, y: 100 },
    { id: "T1-S5", type: "seat", x: 120, y: 20 },
    { id: "T1-S6", type: "seat", x: 165, y: 20 },
    { id: "T1-S7", type: "seat", x: 120, y: 140 },
    { id: "T1-S8", type: "seat", x: 165, y: 140 },

    {
      id: "T2",
      type: "table",
      x: 320,
      y: 60,
      width: 80,
      height: 70,
      label: "T2",
    },
    { id: "T2-S1", type: "seat", x: 280, y: 60 },
    { id: "T2-S2", type: "seat", x: 410, y: 60 },
    { id: "T2-S3", type: "seat", x: 280, y: 100 },
    { id: "T2-S4", type: "seat", x: 410, y: 100 },
    { id: "T2-S5", type: "seat", x: 320, y: 20 },
    { id: "T2-S6", type: "seat", x: 365, y: 20 },
    { id: "T2-S7", type: "seat", x: 320, y: 140 },
    { id: "T2-S8", type: "seat", x: 365, y: 140 },

    {
      id: "T3",
      type: "table",
      x: 120,
      y: 200,
      width: 80,
      height: 70,
      label: "T3",
    },
    { id: "T3-S1", type: "seat", x: 80, y: 200 },
    { id: "T3-S2", type: "seat", x: 210, y: 200 },
    { id: "T3-S3", type: "seat", x: 80, y: 240 },
    { id: "T3-S4", type: "seat", x: 210, y: 240 },

    {
      id: "T4",
      type: "table",
      x: 320,
      y: 200,
      width: 80,
      height: 70,
      label: "T4",
    },
    { id: "T4-S1", type: "seat", x: 280, y: 200 },
    { id: "T4-S2", type: "seat", x: 410, y: 200 },
    { id: "T4-S3", type: "seat", x: 280, y: 240 },
    { id: "T4-S4", type: "seat", x: 410, y: 240 },

    {
      id: "T5",
      type: "table",
      x: 120,
      y: 340,
      width: 80,
      height: 70,
      label: "T5",
    },
    { id: "T5-S1", type: "seat", x: 80, y: 340 },
    { id: "T5-S2", type: "seat", x: 210, y: 340 },
    { id: "T5-S3", type: "seat", x: 80, y: 380 },
    { id: "T5-S4", type: "seat", x: 210, y: 380 },
    { id: "T5-S5", type: "seat", x: 120, y: 300 },
    { id: "T5-S6", type: "seat", x: 165, y: 300 },
    { id: "T5-S7", type: "seat", x: 120, y: 420 },
    { id: "T5-S8", type: "seat", x: 165, y: 420 },

    {
      id: "T6",
      type: "table",
      x: 320,
      y: 340,
      width: 80,
      height: 70,
      label: "T6",
    },
    { id: "T6-S1", type: "seat", x: 280, y: 340 },
    { id: "T6-S2", type: "seat", x: 410, y: 340 },
    { id: "T6-S3", type: "seat", x: 280, y: 380 },
    { id: "T6-S4", type: "seat", x: 410, y: 380 },
    { id: "T6-S5", type: "seat", x: 320, y: 300 },
    { id: "T6-S6", type: "seat", x: 365, y: 300 },
    { id: "T6-S7", type: "seat", x: 320, y: 420 },
    { id: "T6-S8", type: "seat", x: 365, y: 420 },
  ]); // Your table + seat layout
  const {
    restaurants,
    selectedRestaurant, // ⬅️ now using from context
    setSelectedRestaurant,
    selectedTimeSlot,
    setSelectedTimeSlot,
    bookingDate,
    setBookingDate,
    selectedSeats,
    setSelectedSeats,
    setRestaurants,
    isHoliday,
    setIsHoliday
  } = useRestaurant();

  const { isLoggedIn } = useCustomerDetail();
  const [bookedSeats, setBookedSeats] = useState([]);

  const [refreshAlert, setRefreshAlert] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxBookingDate = maxDate.toISOString().split("T")[0];
  useEffect(() => {
    console.log(selectedTimeSlot);
  }, [selectedTimeSlot]);
  
  useEffect(() => {
    if (selectedRestaurant && selectedTimeSlot) {
      socket.emit("join", {
        restaurantId: selectedRestaurant._id,
        timeSlot: selectedTimeSlot.time,
      });

      const handleSeatUpdate = (updatedSeats) => {
        setBookedSeats(updatedSeats);
        alert("⚠️ Seats have been modified. Please refresh or reselect!");
        // setRefreshAlert(true);
      };

      socket.on("seat-updated", handleSeatUpdate);

      return () => {
        socket.off("seat-updated", handleSeatUpdate);
      };
    }
  }, [selectedRestaurant, selectedTimeSlot]);

  useEffect(() => {
    console.log("inside useeffect2");
    getRestaurants();
  }, []);
  useEffect(() => {
    if (restaurants.length > 0 && !selectedRestaurant) {
      const storedId = sessionStorage.getItem("selectedRestaurantId");
      if (storedId) {
        const found = restaurants.find((r) => r._id === storedId);
        if (found) {
          setSelectedRestaurant(found);
        }
      }
    }
  }, [restaurants]);
  useEffect(() => {
    async function checkHoliday() {
      if (!bookingDate) return;
      try {
        const res = await fetch(
          `http://localhost:3001/api/is-holiday?date=${bookingDate}`
        );
        const data = await res.json();
        setIsHoliday(data.isPeakHour);
      } catch (err) {
        console.error("Holiday check failed", err);
        setIsHoliday(false);
      }
    }

    checkHoliday();
  }, [bookingDate]);
  async function getRestaurants() {
    try {
      const res = await fetch("http://localhost:3001/api/nearby-restaurants");
      const data = await res.json();
      console.log(data);
      setRestaurants(data.restaurants);
    } catch (error) {
      console.error("Failed to fetch restaurants", error);
    }
  }

  if (!selectedRestaurant || !selectedRestaurant.time_slots) {
    return (
      <div className="container">
        <h2>Loading restaurant data...</h2>
      </div>
    );
  }

  const isPastSlot = (timeStr) => {
    if (bookingDate !== today) return false;
    const now = new Date();
    const [rawTime, modifier] = timeStr.split(" ");
    let [hours, minutes] = rawTime.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    const slotTime = new Date();
    slotTime.setHours(hours, minutes || 0, 0);
    return slotTime < now;
  };

  const getBookedSeatsForSlot = (slot) => {
    const entry = slot.bookings?.find((b) => b.date === bookingDate);
    return entry?.seat_numbers || [];
  };

  return (
    <div className="container">
      {isHoliday && (
        <div
          style={{
            backgroundColor: "darkred",
            color: "white",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        >
          🎉 Peak hour charges may apply!
        </div>
      )}

      {refreshAlert && (
        <div
          style={{ backgroundColor: "red", color: "white", padding: "10px" }}
        >
          ⚠️ Seats updated! Refresh the page to see latest availability.
        </div>
      )}
      <h2 style={{ fontSize: "40px" }}>Select Time Slot and Seats</h2>

      <div style={{ margin: "20px" }}>
        <label>Booking Date: </label>
        <input
          type="date"
          value={bookingDate}
          onChange={(e) => {
            setBookingDate(e.target.value);
            setSelectedTimeSlot(null);
            setSelectedSeats([]);
          }}
          min={today}
          max={maxBookingDate}
        />
      </div>
          {console.log(today,maxBookingDate)}
      <div style={{ display: "flex", gap: "10px" }}>
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "50vw",
            gap: "10px",
          }}
        >
          {selectedRestaurant.time_slots.filter(
            (slot) => !isPastSlot(slot.time)
          ).length > 0 ? (
            selectedRestaurant.time_slots
              .filter((slot) => !isPastSlot(slot.time))
              .map((slot, idx) => {
                const booked = getBookedSeatsForSlot(slot);
                const available =
                  selectedRestaurant.total_seats - booked.length;

                return (
                  <li
                    key={idx}
                    onClick={() => {
                      setSelectedTimeSlot(slot);
                      setSelectedSeats([]);
                      setBookedSeats(booked);
                    }}
                    className="domain"
                    style={{
                      background:
                        selectedTimeSlot?.time === slot.time
                          ? "var(--primary-background-color)"
                          : "#fff",
                      width: "auto",
                      padding: "10px",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <h4
                      style={{
                        color:
                          selectedTimeSlot?.time === slot.time
                            ? "white"
                            : "black",
                      }}
                    >
                      {slot.time}
                    </h4>
                    <p
                      style={{
                        color:
                          selectedTimeSlot?.time === slot.time
                            ? "white"
                            : "black",
                      }}
                    >
                      {available} seats available
                    </p>
                  </li>
                );
              })
          ) : (
            <p style={{ textAlign: "center", color: "orange", margin: "40px" }}>
              No Time Slots available today! Choose another date!!
            </p>
          )}
        </ul>

        {selectedTimeSlot && (
          <SeatSelector
            layoutData={layoutData}
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
            bookedSeats={bookedSeats}
          />
        )}
      </div>

      <div className="buttondiv">
        <button
          className="nextbutton"
          onClick={() => navigate("/react-app-demo/domains/restaurant")}
        >
          ⏮️ Previous
        </button>
        <button
          className="nextbutton"
          onClick={() => {
            if (!selectedTimeSlot || selectedSeats.length === 0) {
              alert("Please select a time slot and seats!");
              return;
            }
            navigate(
              isLoggedIn
                ? "/react-app-demo/domains/bookSeats"
                : "/react-app-demo/domains/customerDetail"
            );
          }}
        >
          Next ⏭️
        </button>
      </div>
    </div>
  );
}

export default TimeSlots;
