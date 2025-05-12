import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCustomerDetail } from "../contexts/CustomerProvider";
import { useNavigate } from "react-router";
import { useRestaurant } from "../contexts/RestaurantProvider";

const FoodOrdering = () => {
  const { mobile } = useCustomerDetail();
  const navigate = useNavigate();
  const [groupedBookings, setGroupedBookings] = useState([]);
  const [tempSelectedFoods, setTempSelectedFoods] = useState({});

  const {
    menusByRestaurant,
    setMenusByRestaurant,
    quantitiesByRestaurant,
    setQuantitiesByRestaurant,
    selectedFoodsByRestaurant,
    setSelectedFoodsByRestaurant,
  } = useRestaurant();

  function parseLocaleDateTime(inputString) {
    const [datePart, timePart, meridian] = inputString.replace(",", "").split(" ");
    const [day, month, year] = datePart.split("/").map(Number);
    let [hours, minutes, seconds] = timePart.split(":").map(Number);

    if (meridian?.toUpperCase() === "PM" && hours < 12) hours += 12;
    if (meridian?.toUpperCase() === "AM" && hours === 12) hours = 0;

    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")} ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  useEffect(() => {
    if (mobile) {
      axios.post("/api/get-customer-bookings", { mobile }).then((res) => {
        const now = new Date();
        const upcoming = res.data.bookings.filter(
          (b) => new Date(b.TIMING) > now
        );

        // 1. Group by restaurant + formatted timing
        const grouped = upcoming.map((b) => ({
          restaurant: b.RESTAURANTBOOKED,
          timing: new Date(b.TIMING).toLocaleString(),
          rawTiming: b.TIMING,
          food_orders: b.FOOD_ORDERS
        }));

        setGroupedBookings(grouped);

        // 2. Fetch menus per restaurant
        const uniqueRestaurants = [...new Set(upcoming.map((b) => b.RESTAURANTBOOKED))];
        uniqueRestaurants.forEach((restaurantName) => {
          axios.post("/api/restaurant-menu-by-name", { restaurantName }).then((res) => {
            setMenusByRestaurant((prev) => ({
              ...prev,
              [restaurantName]: res.data.menu,
            }));
          });
        });

        // 3. Parse & apply previous food orders
        const restoredQuantities = {};
        const restoredSelected = {};

        grouped.forEach(({ restaurant, timing, food_orders }) => {
          const key = `${restaurant}_${timing}`;
          if (!food_orders) return;

          try {
            const items = JSON.parse(food_orders.replace(/''/g, "'"));
            const quantityMap = {};
            items.forEach((item) => {
              quantityMap[item._id] = item.quantity;
            });

            restoredQuantities[key] = quantityMap;
            restoredSelected[key] = {
              restaurant,
              timing,
              items,
            };
          } catch (e) {
            console.warn("⚠️ Invalid food_orders JSON for", key);
          }
        });

        setQuantitiesByRestaurant(restoredQuantities);
        setSelectedFoodsByRestaurant(restoredSelected);
      });
    }
  }, [mobile]);

  const handleQuantityChange = (restaurant, timing, itemId, change) => {
    const key = `${restaurant}_${timing}`;
    setQuantitiesByRestaurant((prev) => {
      const restQty = prev[key] || {};
      const newQty = Math.max(0, (restQty[itemId] || 0) + change);
      const updated = { ...restQty, [itemId]: newQty };

      const menu = menusByRestaurant[restaurant] || [];
      const selected = menu
        .filter((item) => updated[item._id] > 0)
        .map((item) => ({
          ...item,
          quantity: updated[item._id],
          total: updated[item._id] * item.price,
        }));

      setTempSelectedFoods((prev) => ({
        ...prev,
        [key]: { restaurant, timing, items: selected },
      }));

      return { ...prev, [key]: updated };
    });
  };

  const handleProceedToPay = async (restaurant, timing) => {
    const key = `${restaurant}_${timing}`;
    const selectedData = tempSelectedFoods[key]?.items || [];
    const formattedTime = parseLocaleDateTime(timing);

    try {
      await axios.post("/api/save-food-order", {
        restaurantName: restaurant,
        timing: formattedTime,
        customerMobile: mobile,
        items: selectedData,
      });

      alert(`✅ Order placed for ₹${selectedData.reduce((sum, i) => sum + i.total, 0)} at ${restaurant}`);

      setSelectedFoodsByRestaurant((prev) => ({
        ...prev,
        [key]: tempSelectedFoods[key],
      }));

      const copy = { ...tempSelectedFoods };
      delete copy[key];
      setTempSelectedFoods(copy);

      navigate("/react-app-demo/profile");
    } catch (err) {
      alert("Failed to save food order!");
      console.error(err);
    }
  };

  return (
    <div className="food-container">
      <h2>🍽️ Order Food by Slot</h2>
      {groupedBookings.length === 0 && <p>No upcoming bookings found.</p>}

      {groupedBookings.map(({ restaurant, timing }) => {
        const key = `${restaurant}_${timing}`;
        const menu = menusByRestaurant[restaurant] || [];

        return (
          <div key={key} className="restaurant-food-block">
            <div className="restaurant-header">
              <h3>{restaurant}</h3>
              <p><strong>Slot:</strong> {timing}</p>
            </div>

            <div className="food-grid">
              {menu.map((item) => (
                <div key={item._id} className="food-card">
                  <img
                    src={`/react-app-demo${item.image}`}
                    alt={item.name}
                    className="food-img"
                  />
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                  <div className="qty-control">
                    <button onClick={() => handleQuantityChange(restaurant, timing, item._id, -1)}>-</button>
                    <span>{quantitiesByRestaurant[key]?.[item._id] || 0}</span>
                    <button onClick={() => handleQuantityChange(restaurant, timing, item._id, 1)}>+</button>
                  </div>
                </div>
              ))}
            </div>

            {(tempSelectedFoods[key]?.items?.length > 0 || selectedFoodsByRestaurant[key]?.items?.length > 0) && (
              <div className="order-summary">
                <h4>🧾 Summary</h4>
                <ul>
                  {(tempSelectedFoods[key]?.items || selectedFoodsByRestaurant[key]?.items).map((item) => (
                    <li key={item._id}>
                      {item.name} × {item.quantity} = ₹{item.total}
                    </li>
                  ))}
                </ul>
                <strong>
                  Total: ₹{(tempSelectedFoods[key]?.items || selectedFoodsByRestaurant[key]?.items).reduce(
                    (sum, i) => sum + i.total,
                    0
                  )}
                </strong>
                {tempSelectedFoods[key]?.items && (
                  <div>
                    <br />
                    <button
                      className="nextbutton"
                      onClick={() => handleProceedToPay(restaurant, timing)}
                      style={{ marginTop: "20px" }}
                    >
                      Proceed to Pay 💳
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FoodOrdering;
