// MapPage.js
import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

// Fix leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], map.getZoom());
    }
  }, [lat, lng]);
  return null;
};

// Controller to access map instance safely
const MapController = ({ route }) => {
  const map = useMap();

  useEffect(() => {
    if (route && route.length > 0) {
      const lastPoint = route[route.length - 1];
      map.flyTo(lastPoint, 16);
    }
  }, [route]);

  return null;
};

const MapPage = ({
  restaurants,
  longitude,
  latitude,
  selectedRestaurant,
  setSelectedRestaurant,
  route,
  setRoute,
  handleRestaurantClick,
  markerRefs,
}) => {
  const [userLocation, setUserLocation] = useState([12.9716, 77.5946]);

  useEffect(() => {
    if (latitude && longitude) {
      console.log("Received Lat/Lng:", latitude, longitude);
      setUserLocation([latitude, longitude]);
    }
  }, [latitude, longitude]);

  // const handleRestaurantClick = async (restaurantPosition) => {
  //   const [userLat, userLng] = userLocation;
  //   const [destLat, destLng] = restaurantPosition;

  //   try {
  //     const response = await axios.get(
  //       `https://router.project-osrm.org/route/v1/driving/${userLng},${userLat};${destLng},${destLat}?overview=full&geometries=geojson`
  //     );
  //     const coords = response.data.routes[0].geometry.coordinates;
  //     const convertedCoords = coords.map((coord) => [coord[1], coord[0]]);
  //     setRoute(convertedCoords);
  //   } catch (error) {
  //     console.error("OSRM Routing error:", error);
  //   }

  //   setSelectedRestaurant(
  //     restaurants.find(
  //       (r) =>
  //         r.location.coordinates[0] === destLng &&
  //         r.location.coordinates[1] === destLat
  //     )
  //   );
  // };
  if (!userLocation) return <p>Loading map...</p>;
  return (
    <MapContainer
      center={userLocation}
      zoom={16}
      style={{ height: "50vh", width: "50vw" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RecenterMap lat={userLocation[0]} lng={userLocation[1]} />
      <Marker position={userLocation}>
        <Popup>You are here</Popup>
      </Marker>

      {restaurants.map((r) => {
        const key = r.fsq_id;
        const position = [r.location.coordinates[1], r.location.coordinates[0]];

        return (
          <Marker
            key={key}
            position={position}
            ref={(el) => (markerRefs.current[key] = el)}
            eventHandlers={{
              click: () => handleRestaurantClick(position),
            }}
          >
            <Popup>{r.name}</Popup>
          </Marker>
        );
      })}

      {route.length > 0 && (
        <>
          <Polyline positions={route} color="blue" />
          <MapController route={route} />
        </>
      )}
    </MapContainer>
  );
};

export default MapPage;
