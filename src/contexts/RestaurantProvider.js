import { createContext, useContext, useState } from "react";

const RestaurantContext = createContext();
export const useRestaurant = () => useContext(RestaurantContext);
export function RestaurantProvider({ children }) {
  const today = new Date().toISOString().split("T")[0];

  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [bookingDate, setBookingDate] = useState(today);

  const [noOfSeats, setNoOfSeats] = useState("");

  return (
    <RestaurantContext.Provider
      value={{
        selectedRestaurant,
        setSelectedRestaurant,
        selectedTimeSlot,
        setSelectedTimeSlot,
        noOfSeats,
        setNoOfSeats,
        bookingDate,
        setBookingDate
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}
