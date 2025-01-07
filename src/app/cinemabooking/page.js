"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import CinemaMap from "../Components/CinemaMap/CinemaMap";

// CinemaBooking component
const CinemaBooking = () => {
  const [isClient, setIsClient] = useState(false);
  
  // Always call the hooks in the same order on every render
  const searchParams = useSearchParams();
  const movieTitle = searchParams.get("moviename");
  const movieId = searchParams.get("movieid");
  
  const { bookingStatus } = useSelector((state) => state.cinemaBooking);

  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedRange, setSelectedRange] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBookingLink, setSelectedBookingLink] = useState(null);

  const cinemaId = selectedCinema?.cinemaid;

  // Define time ranges
  const timeRangeBoundaries = {
    Morning: { start: "05:00 AM", end: "11:59 AM" },
    Afternoon: { start: "12:00 PM", end: "04:59 PM" },
    Evening: { start: "05:00 PM", end: "08:59 PM" },
    Night: { start: "09:00 PM", end: "04:59 AM" },
  };

  // Check if a time is within a range
  const isTimeInRange = (time, range) => {
    const [startHour, startMinutes, startPeriod] = range.start
      .match(/(\d+):(\d+)\s(AM|PM)/)
      .slice(1);
    const [endHour, endMinutes, endPeriod] = range.end
      .match(/(\d+):(\d+)\s(AM|PM)/)
      .slice(1);
    const [timeHour, timeMinutes, timePeriod] = time
      .match(/(\d+):(\d+)\s(AM|PM)/)
      .slice(1);

    const to24Hour = (hour, period) =>
      period === "PM" && hour !== 12
        ? parseInt(hour) + 12
        : period === "AM" && hour === 12
        ? 0
        : parseInt(hour);

    const start = to24Hour(startHour, startPeriod) * 60 + parseInt(startMinutes);
    const end = to24Hour(endHour, endPeriod) * 60 + parseInt(endMinutes);
    const currentTime = to24Hour(timeHour, timePeriod) * 60 + parseInt(timeMinutes);

    if (end > start) {
      return currentTime >= start && currentTime <= end;
    } else {
      // For ranges crossing midnight (e.g., Night)
      return currentTime >= start || currentTime <= end;
    }
  };

  const handleCinemaSelection = (cinema) => {
    if (selectedCinema?.cinemaname !== cinema.cinemaname) {
      setSelectedCinema(cinema);
    }
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  const handleRangeSelection = (range) => {
    setSelectedRange(range);

    // Automatically select the first time in the range
    const times = Object.keys(
      bookingStatus?.ticketMapping?.[movieId]?.[cinemaId]?.[selectedDate] || {}
    );
    const matchingTime = times.find((time) => isTimeInRange(time, timeRangeBoundaries[range]));

    if (matchingTime) {
      setSelectedTime(matchingTime);
    } else {
      setSelectedTime(null);
      alert("No times available for the selected range.");
    }
  };

  const handleBookingLinkSelection = (link) => {
    setSelectedBookingLink(link);
  };

  const handleBooking = () => {
    if (!selectedCinema || !selectedDate || !selectedTime || !selectedBookingLink) {
      alert("Please select a cinema, date, time, and booking link to proceed with booking.");
      return;
    }
    window.open(selectedBookingLink, "_blank");
  };

  // Set the client-side state after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {isClient && (
        <div className="container mb-4">
          <div className="cn-movie-title-section text-center mb-4">
            <h1>{movieTitle}</h1>
          </div>
          <div className="cn-cinema-booking-container">
            <div className="cn-map-section">
              {bookingStatus?.cinemaInfo ? (
                <CinemaMap cinemas={bookingStatus.cinemaInfo} />
              ) : (
                <p>Loading cinemas...</p>
              )}
            </div>

            <div className="cn-sidebar-section">
              <div>
                <input
                  type="text"
                  placeholder="Search Cinema"
                  className="cn-search-bar"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="cn-theater-con">
                {bookingStatus &&
                  bookingStatus.cinemaInfo
                    ?.filter((cinema) =>
                      cinema.cinemaname.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((cinema, index) => (
                      <div
                        className={`cn-cinema-card ${
                          selectedCinema?.cinemaname === cinema.cinemaname ? "selected" : ""
                        }`}
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCinemaSelection(cinema);
                        }}
                      >
                        <h4>
                          {cinema.cinemaname} (Available Shows: {cinema.shows})
                        </h4>
                        <div className="cn-date-section" onClick={(e) => e.stopPropagation()}>
                          {bookingStatus?.showdate?.map((date, i) => (
                            <button
                              className={`cn-date-btn ${selectedDate === date ? "selected" : ""}`}
                              key={i}
                              onClick={() => handleDateSelection(date)}
                            >
                              {date}
                            </button>
                          ))}
                        </div>

                        {/* Time Range Buttons Inside the Card */}
                        <div className="cn-time-section" onClick={(e) => e.stopPropagation()}>
                          {Object.keys(timeRangeBoundaries).map((range) => (
                            <button
                              key={range}
                              className={`cn-time-btn ${selectedRange === range ? "selected" : ""}`}
                              onClick={() => {
                                handleCinemaSelection(cinema); // Ensure correct cinema is selected
                                handleRangeSelection(range); // Set the time range
                              }}
                            >
                              {range}
                            </button>
                          ))}
                        </div>

                        {/* Booking Links and Confirmation */}
                        {selectedCinema?.cinemaname === cinema.cinemaname &&
                          selectedDate &&
                          selectedTime && (
                            <div>
                              {bookingStatus?.ticketMapping?.[movieId]?.[cinemaId]?.[selectedDate]?.[selectedTime] ? (
                                Object.keys(
                                  bookingStatus.ticketMapping[movieId][cinemaId][selectedDate][selectedTime]
                                ).map((key) => {
                                  const bookingLink =
                                    bookingStatus.ticketMapping[movieId][cinemaId][selectedDate][selectedTime][key]?.bookinglink;
                                  return bookingLink ? (
                                    <button
                                      key={key}
                                      className={`cn-booking-btn ${
                                        selectedBookingLink === bookingLink ? "selected" : ""
                                      }`}
                                      onClick={() => handleBookingLinkSelection(bookingLink)}
                                    >
                                      {key === "9"
                                        ? "PVR Cinema"
                                        : key === "8"
                                        ? "Paytm"
                                        : key === "1"
                                        ? "BookMyShow"
                                        : "Other"}
                                    </button>
                                  ) : (
                                    <p key={key}>No booking link available for {key}.</p>
                                  );
                                })
                              ) : (
                                <p>No data available for the selected cinema, date, and time.</p>
                              )}
                            </div>
                          )}
                      </div>
                    ))}
              </div>

              <div className="confirm-btn-con mt-4">
                <button className="cn-book-btn" onClick={handleBooking}>
                  Book
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default CinemaBooking;
