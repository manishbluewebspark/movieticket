"use client";
import React, { useState } from "react";

const CinemaBooking = () => {
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredCinemas = cinemas.filter((cinema) =>
    cinema.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDateSelection = (date) => setSelectedDate(date);

  const handleTimeSelection = (time) => setSelectedTime(time);

  const handleCinemaSelection = (cinema) => setSelectedCinema(cinema);

  const handleBooking = () => {
    if (!selectedCinema || !selectedDate || !selectedTime) {
      alert("Please select a cinema, date, and time to proceed with booking.");
      return;
    }

    alert(
      `Booking confirmed at ${selectedCinema.name} on ${selectedDate} at ${selectedTime}.`
    );
  };

  return (
    <div className="container mb-4">
      <div className="cn-cinema-booking-container">
        {/* Map Section */}
        <div className="cn-map-section">
          {typeof window !== "undefined" && (
            <iframe
              title="Cinema Locations Map"
              src="https://www.google.com/maps/embed"
              style={{ border: 0, width: "100%", height: "300px" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          )}
        </div>

        {/* Sidebar Section */}
        <div className="cn-sidebar-section">
          <input
            type="text"
            placeholder="Search Cinema"
            className="cn-search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {filteredCinemas.map((cinema, index) => (
            <div
              className={`cn-cinema-card ${
                selectedCinema?.name === cinema.name ? "selected" : ""
              }`}
              key={index}
              onClick={() => handleCinemaSelection(cinema)}
            >
              <h4>
                {cinema.name} (Available Shows: {cinema.shows})
              </h4>
              <div className="cn-date-section">
                {cinema.dates.map((date, i) => (
                  <button
                    className={`cn-date-btn ${
                      selectedDate === date ? "selected" : ""
                    }`}
                    key={i}
                    onClick={() => handleDateSelection(date)}
                  >
                    {date}
                  </button>
                ))}
              </div>
              <div className="cn-time-section">
                {cinema.times.map((time, i) => (
                  <button
                    className={`cn-time-btn ${
                      selectedTime === time ? "selected" : ""
                    }`}
                    key={i}
                    onClick={() => handleTimeSelection(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <div className="cn-payment-section">
                <button
                  className="cn-payment-btn cn-bookmyshow"
                  onClick={() => window.open("https://bookmyshow.com", "_blank")}
                >
                  BookMyShow
                </button>
                <button
                  className="cn-payment-btn cn-paytm"
                  onClick={() => window.open("https://paytm.com", "_blank")}
                >
                  Paytm
                </button>
              </div>
            </div>
          ))}

          <button className="cn-book-btn" onClick={handleBooking}>
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default CinemaBooking;