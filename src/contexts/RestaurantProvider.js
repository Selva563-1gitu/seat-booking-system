import { createContext, useContext, useState } from "react";

const RestaurantContext = createContext();
export const useRestaurant = () => useContext(RestaurantContext);
export function RestaurantProvider({ children }) {
  const today = new Date().toISOString().split("T")[0];
  const [restaurants, setRestaurants] = useState([]);

  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [bookingDate, setBookingDate] = useState(today);
  const [isHoliday, setIsHoliday] = useState(false);

  const [noOfSeats, setNoOfSeats] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [menusByRestaurant, setMenusByRestaurant] = useState({});
  const [quantitiesByRestaurant, setQuantitiesByRestaurant] = useState({});
  const [selectedFoodsByRestaurant, setSelectedFoodsByRestaurant] = useState(
    {}
  );

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        setRestaurants,
        selectedRestaurant,
        setSelectedRestaurant,
        selectedTimeSlot,
        setSelectedTimeSlot,
        noOfSeats,
        setNoOfSeats,
        bookingDate,
        setBookingDate,
        selectedSeats,
        setSelectedSeats,
        menusByRestaurant,
        setMenusByRestaurant,
        quantitiesByRestaurant,
        setQuantitiesByRestaurant,
        selectedFoodsByRestaurant,
        setSelectedFoodsByRestaurant,
        isHoliday,setIsHoliday
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}
