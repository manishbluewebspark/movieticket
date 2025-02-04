"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const CinemaMap = ({ cinemas }) => {
  const defaultPosition = [12.9716, 77.5946]; // Default to Bengaluru

  return (
    <MapContainer className="map-container" center={defaultPosition} zoom={12} >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {cinemas.map((cinema) => (
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
