"use client";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};
// Fix marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const CinemaMap = ({ cinemas }) => {
  const [filteredCinemas, setFilteredCinemas] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const defaultPosition = [12.9716, 77.5946]; // Default to Bengaluru

  useEffect(() => {
    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });

        // Filter cinemas within 3 km radius
        const nearbyCinemas = cinemas.filter((cinema) => {
          const distance = getDistance(
            latitude,
            longitude,
            cinema.latitude,
            cinema.longitude
          );

          return distance <= 3; // Filter within 3 km
        });

        setFilteredCinemas(nearbyCinemas);
      },
      (error) => console.error("Error fetching location", error),
      { enableHighAccuracy: true }
    );
  }, [cinemas]);
  return (
    <MapContainer
      className="map-container"
      center={
        userLocation?.latitude
          ? [userLocation?.latitude, userLocation?.longitude]
          : defaultPosition
      }
      zoom={12}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {filteredCinemas.map((cinema) => (
        <Marker
          key={cinema.cinemaid}
          position={[parseFloat(cinema.latitude), parseFloat(cinema.longitude)]}
        >
          <Popup>
            <strong>{cinema.cinemaname}</strong>
            <p>{cinema.address}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default CinemaMap;
