import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRestaurant } from "../contexts/RestaurantProvider";
import MapPage from "./MapPage";
import axios from "axios";

function Restaurents() {
  const markerRefs = useRef({});
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLogitude] = useState(0);
  const {
    selectedRestaurant,
    setSelectedRestaurant,
    restaurants,
    setRestaurants,
  } = useRestaurant();
  const [route, setRoute] = useState([]);

  const navigate = useNavigate();

  const handleRestaurantClick = async (restaurantPosition) => {
    const [destLat, destLng] = restaurantPosition;
    try {
      const response = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${longitude},${latitude};${destLng},${destLat}?overview=full&geometries=geojson`
      );
      const coords = response.data.routes[0].geometry.coordinates;
      const convertedCoords = coords.map((coord) => [coord[1], coord[0]]);
      setRoute(convertedCoords);
    } catch (error) {
      console.error("OSRM Routing error:", error);
    }
    const selected = restaurants.find(
      (r) =>
        r.location.coordinates[0] === destLng &&
        r.location.coordinates[1] === destLat
    );
    setSelectedRestaurant(selected);
    // ✅ Save to sessionStorage
    sessionStorage.setItem("selectedRestaurantId", selected._id);

    // Open popup
    const marker = markerRefs.current[selected?.fsq_id];
    if (marker) {
      marker.openPopup(); // this will trigger the popup to show
    }
  };
  useEffect(() => {
    getRestaurants();
    // fetchDetails();
  }, []);
  // useEffect(() => {
  //   console.log(selectedRestaurant);
  // }, [selectedRestaurant]);
  async function getRestaurants() {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log(lat, lng);
        setLatitude(lat);
        setLogitude(lng);
      },
      (err) => {
        alert("Failed to get location: " + err.message);
      }
    );
    const res = await fetch("http://localhost:3001/api/nearby-restaurants");
    const data = await res.json();
    setRestaurants(data.restaurants);
    console.log(restaurants);
  }
  function fetchDetails() {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const res = await fetch(
          "http://localhost:3001/api/nearby-restaurants",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latitude: lat, longitude: lng }),
          }
        );

        const data = await res.json();
        console.log(data);
        setRestaurants(data);
      },
      (err) => {
        alert("Failed to get location: " + err.message);
      }
    );
  }
  return (
    <div className="container">
      <h2 style={{ fontSize: "40px" }}>Select Nearby Restaurant...</h2>
      <div style={{ display: "flex", alignItems: "center" }}>
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            maxWidth: "40vw",
            maxHeight: "60vh",
            overflowX: "scroll",
            scrollbarWidth: "none",
            paddingRight: "50px",
          }}
        >
          {restaurants.length > 0 ? (
            restaurants.map((domain, index) => (
              <li
                className="domain"
                style={{
                  padding: "10px",
                  margin: "10px 0",
                  width: "100%",
                  backgroundColor:
                    selectedRestaurant === domain
                      ? "var(--primary-background-color)"
                      : "#fff",
                }}
                key={index}
                onClick={(e) => {
                  setSelectedRestaurant(domain);
                  sessionStorage.setItem("selectedRestaurantId", domain._id); // ✅ save to session
                  handleRestaurantClick([
                    domain.location.coordinates[1],
                    domain.location.coordinates[0],
                  ]);
                }}
              >
                <h2
                  style={{
                    color: selectedRestaurant === domain ? "white" : "black",
                  }}
                >
                  {domain.name}
                </h2>
                <p
                  style={{
                    color: selectedRestaurant === domain ? "white" : "black",
                  }}
                >
                  {domain.location.formatted_address}
                </p>
                <bold>{domain.distance}m </bold>
              </li>
            ))
          ) : (
            <></>
          )}
        </ul>
        {latitude && longitude && restaurants.length > 0 ? (
          <MapPage
            restaurants={restaurants}
            latitude={latitude}
            longitude={longitude}
            selectedRestaurant={selectedRestaurant}
            route={route}
            handleRestaurantClick={handleRestaurantClick}
            markerRefs={markerRefs}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="buttondiv">
        <button
          className="nextbutton"
          onClick={(e) => {
            navigate("/react-app-demo/domains/");
          }}
        >
          ⏮️ Previous
        </button>

        <button
          className="nextbutton"
          onClick={(e) => {
            if (selectedRestaurant === "") {
              alert("Select Restaurant!!");
            } else {
              navigate("/react-app-demo/domains/timeslots");
            }
          }}
        >
          Next ⏭️
        </button>
      </div>
    </div>
  );
}

export default Restaurents;
