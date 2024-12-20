"use client";
import React, { useState } from "react";
// import "./CinemaBooking.css";

const CinemaBooking = () => {
  const [selectedCinema, setSelectedCinema] = useState(null);

  const cinemas = [
    {
      name: "PVR",
      shows: 25,
      dates: ["2024-12-16", "2024-12-17"],
      times: ["6:45 PM", "7:45 PM", "8:45 PM", "9:45 PM"],
    },
    {
      name: "Victory Cinema",
      shows: 20,
      dates: ["2024-12-16", "2024-12-17"],
      times: ["6:45 PM", "7:45 PM", "8:45 PM", "9:45 PM"],
    },
    {
      name: "Urvashi Cinema",
      shows: 30,
      dates: ["2024-12-16", "2024-12-17"],
      times: ["6:45 PM", "7:45 PM", "8:45 PM", "9:45 PM"],
    },
  ];

  return (
    <div className="container mb-4">
      <div className="cn-cinema-booking-container">
      {/* Map Section */}
      <div className="cn-map-section">
        <iframe
          title="Cinema Locations Map"
          src="https://www.google.com/maps/embed"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Sidebar Section */}
      <div className="cn-sidebar-section">
        <input
          type="text"
          placeholder="Cinema"
          className="cn-search-bar"
        />
        {cinemas.map((cinema, index) => (
          <div className="cn-cinema-card" key={index}>
            <h4>
              {cinema.name} (Available Show: {cinema.shows})
            </h4>
            <div className="cn-date-section">
              {cinema.dates.map((date, i) => (
                <button className="cn-date-btn" key={i}>
                  {date}
                </button>
              ))}
            </div>
            <div className="cn-time-section">
              {cinema.times.map((time, i) => (
                <button className="cn-time-btn" key={i}>
                  {time}
                </button>
              ))}
            </div>
            <div className="cn-payment-section">
              <button className="cn-payment-btn cn-bookmyshow">BookMyShow</button>
              <button className="cn-payment-btn cn-paytm">Paytm</button>
            </div>
          </div>
        ))}
        <button className="cn-book-btn">Book</button>
      </div>
    </div>
    </div>
  );
};

export default CinemaBooking;
