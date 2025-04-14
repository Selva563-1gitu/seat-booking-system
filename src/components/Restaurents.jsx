import React, { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { useRestaurant } from "../contexts/RestaurantProvider";

function Restaurents() {
  const [restaurants, setRestaurants] = useState([]);
  const { selectedRestaurant, setSelectedRestaurant } = useRestaurant();
const navigate=useNavigate();

  useEffect(() => {
    getRestaurants();
  }, []);
  async function getRestaurants() {
    const res = await fetch("http://localhost:3000/api/nearby-restaurants");
    const data= await res.json();
    setRestaurants(data.restaurants);

  }
  function fetchDetails() {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log(lat, lng);
        const res = await fetch(
          "http://localhost:3000/api/nearby-restaurants",
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
      <h2 style={{ fontSize: "80px" }}>Select Nearby Restaurant...</h2>

      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          maxHeight: "400px",
          overflowX: "scroll",
        }}
      >
        {restaurants.length > 0 ? (
          restaurants.map((domain, index) => (
            <li
              className={
                selectedRestaurant === domain ? "selected domain" : "domain"
              }
              style={{ maxWidth: "300px" }}
              key={index}
              onClick={(e) => {
                setSelectedRestaurant(domain);
              }}
            >
              <h2>{domain.name}</h2>
              <p>{domain.location.formatted_address}</p>
              <bold>{domain.distance}m </bold>
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
      <buttondiv
        style={{
          display: "grid",
          gridTemplateColumns: "500px 500px",
          gap: "40px",
        }}
      >
        <Link to="/react-app-demo/domains">
          <button className="nextbutton">⏮️ Previous</button>
        </Link>
        
          <button className="nextbutton" onClick={e=>{
            if(selectedRestaurant===""){
              alert("Select Restaurant!!");
            }
            else{
              navigate("/react-app-demo/domains/timeslots")
            }
          }}>Next ⏭️</button>
        
      </buttondiv>
    </div>
  );
}

export default Restaurents;
