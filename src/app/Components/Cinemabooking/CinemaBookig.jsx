"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import CinemaMap from "../../Components/CinemaMap/CinemaMap";
import axios from "axios";
const CinemaBooking = () => {
  const searchParams = useSearchParams();
  const movieTitle = searchParams.get("moviename");
  const movieId = searchParams.get("movieid");
  const { bookingStatus } = useSelector((state) => state.cinemaBooking);

  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedRange, setSelectedRange] = useState(null); // Selected time range
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBookingLink, setSelectedBookingLink] = useState(null);
  const [isClient, setIsClient] = useState(false); // Flag to track if on client side
  const [moviesData, setMoviesData] = useState();
  const [moviesTimeData, setMoviesTimeData] = useState();
  const [moviesShowsData, setMoviesShowsData] = useState();
  const [bookingSitesData, setBookingSitesData] = useState();


  const cinemaId = selectedCinema?.cinemaid;

  // Time range boundaries
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

    const start =
      to24Hour(startHour, startPeriod) * 60 + parseInt(startMinutes);
    const end = to24Hour(endHour, endPeriod) * 60 + parseInt(endMinutes);
    const currentTime =
      to24Hour(timeHour, timePeriod) * 60 + parseInt(timeMinutes);

    if (end > start) {
      return currentTime >= start && currentTime <= end;
    } else {
      return currentTime >= start || currentTime <= end;
    }
  };

  const handleCinemaSelection = (cinema) => {
    // if (selectedCinema?.cinemaname !== cinema.cinemaname) {
    setSelectedCinema(cinema);
    setMoviesTimeData("");
    setSelectedDate("");
    setSelectedRange("");
    setMoviesShowsData("");
    // }
  };

  const handleDateSelection = (date, theatre) => {
    setMoviesTimeData(theatre[date]);
    setSelectedDate(date);
    setSelectedRange("");
    setMoviesShowsData("");
  };

  const handleRangeSelection = (range, moviesTimeData) => {
    setSelectedRange(range);
    setMoviesShowsData(moviesTimeData[range]);

    // const times = Object.keys(
    //   bookingStatus?.ticketMapping?.[movieId]?.[cinemaId]?.[selectedDate] || {}
    // );
    // const matchingTime = times.find((time) =>
    //   isTimeInRange(time, timeRangeBoundaries[range])
    // );

    // if (matchingTime) {
    //   setSelectedTime(matchingTime);
    // } else {
    //   setSelectedTime(null);
    //   alert("No times available for the selected range.");
    // }
  };

  const handleBookingLinkSelection = (link) => {
    // setSelectedBookingLink(link);
    window.open(link, "_blank");
  };

  // This effect will run once when the component mounts on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleBooking = () => {
    if (
      !selectedCinema ||
      !selectedDate ||
      !selectedTime ||
      !selectedBookingLink
    ) {
      alert(
        "Please select a cinema, date, time, and booking link to proceed with booking."
      );
      return;
    }

    // Only use window.open on the client side
    if (isClient && typeof window !== "undefined") {
      window.open(selectedBookingLink, "_blank");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/bookingsites`
        );
        setBookingSitesData(response.data); // Set booking sites data from API
      } catch (error) {
        console.error("Failed to fetch booking sites:", error.message);
      }
    };
    if (bookingStatus?.ticketMapping?.[movieId]) {
      setMoviesData(bookingStatus?.ticketMapping?.[movieId]);
      fetchData();
    }
  }, [bookingStatus]);
  // console.log("ppppppppppppppp",bookingStatus?.ticketMapping?.[movieId]);
  // for (const theatreId in moviesData) {
  //   const theatre = moviesData[theatreId];
  //   for (const date in theatre) {
  //     const times = theatre[date];
  //     for (const time in times) {
  //       const shows = times[time];
  //       for (const showId in shows) {
  //         const show = shows[showId];
  //         console.log(`Date: ${date}, Time: ${time}, Show ID: ${showId}`);
  //         console.log(`Booking Link: ${show.bookinglink}`);
  //         console.log('Seats:');
  //         show.seats.forEach((seat) => {
  //           console.log(`  Type: ${seat.type}, Price: ${seat.price}, Availability: ${seat.availability}`);
  //         });
  //       }
  //     }
  //   }
  // }
  let theatreArray = [];  // Declare an array to store the results

  const getTheatreName = (theatreId) => {
    const result = bookingStatus?.cinemaInfo?.find(
      (item) => item.cinemaid == theatreId
    );

    if (result) {
      theatreArray.push(result);  // Push the result into the array if it's found
    }
    return result;
  };

  const getSiteDetails = (showId) => {
    const result = bookingSitesData?.find((item) => item.websiteid == showId);
    return result;
  };
  return (
    <>
      {isClient && (
        <div className="container mb-4">
          <div className="cn-movie-title-section text-center mb-4">
            <h1>{movieTitle}</h1>
          </div>
          <div className="cn-cinema-booking-container row">
            <div className="cn-map-section col-lg-6 col-md-6 col-12">
              {bookingStatus?.cinemaInfo ? (
                <CinemaMap cinemas={theatreArray} />
              ) : (
                <p>Loading cinemas...</p>
              )}
            </div>

            <div className="cn-sidebar-section col-lg-6 col-md-6 col-12">
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
                {Object.keys(moviesData || {}).map((theatreId) => {
                  const theatreName = getTheatreName(theatreId);
                  const theatre = moviesData[theatreId];
                  return (
                    <div
                      className={`cn-cinema-card ${selectedCinema === theatreId ? "selected" : ""
                        }`}
                      key={theatreId}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCinemaSelection(theatreId);
                      }}
                    >
                      <h4>{theatreName?.cinemaname}</h4>
                      {selectedCinema === theatreId && (
                        <>
                          <div
                            className="cn-date-section"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {Object.keys(theatre).map((date, i) => {
                              return (
                                <button
                                  className={`cn-date-btn ${selectedDate === date ? "selected" : ""
                                    }`}
                                  key={i}
                                  onClick={() =>
                                    handleDateSelection(date, theatre)
                                  }
                                >
                                  {date}
                                </button>
                              );
                            })}
                          </div>
                          {moviesTimeData && (
                            <>
                              <div
                                className="cn-time-section"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {Object.keys(moviesTimeData).map((time, j) => {
                                  return (
                                    <button
                                      key={j}
                                      className={`cn-time-btn ${selectedRange === time ? "selected" : ""
                                        }`}
                                      onClick={() => {
                                        // handleCinemaSelection(cinema);
                                        handleRangeSelection(
                                          time,
                                          moviesTimeData
                                        );
                                      }}
                                    >
                                      {time}
                                    </button>
                                  );
                                })}
                              </div>
                              {moviesShowsData && (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                  }}
                                >
                                  {Object.keys(moviesShowsData).map(
                                    (showId) => {
                                      const show = moviesShowsData[showId];
                                      const siteDatails =
                                        getSiteDetails(showId);
                                      return (
                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "column",
                                          }}
                                          key={showId}
                                        >
                                          {/* <button
                                            key={showId}
                                            className={`cn-booking-btn ${
                                              selectedBookingLink === showId
                                                ? "selected"
                                                : ""
                                            }`}
                                            // onClick={() =>
                                            //   handleBookingLinkSelection(
                                            //     show?.bookinglink
                                            //   )
                                            // }
                                          >
                                            {siteDatails?.websitename}
                                            <Images></Images>
                                          </button> */}
                                         <button
  key={showId}
  className={`cn-booking-btn mb-2 d-flex flex-column align-items-center justify-center ${selectedBookingLink === showId ? "selected" : ""}`}
>
  <img
    src={`data:image/png;base64,${siteDatails?.logo}`}
    alt="Booking Icon"
    style={{
      width: "78px",       // fixed width
      height: "78px",      // fixed height
      objectFit: "contain", // or "cover" depending on your preference
      borderRadius: "10px"
    }}
  />
  <span style={{ fontSize: '12px' }}>{siteDatails?.websitename}</span>
</button>

{/* boook button start */}
                                          <button
                                            className={`cn-time-btn `}
                                            onClick={() =>
                                              handleBookingLinkSelection(
                                                show?.bookinglink
                                              )
                                            }
                                          >
                                            available
                                          </button>
                        {/* book button end  */}
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
              {/* <div className="cn-theater-con">
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

                       
                        { selectedCinema?.cinemaname === cinema.cinemaname &&
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
              </div> */}

              {/* <div className="confirm-btn-con mt-4">
                <button className="cn-book-btn" onClick={handleBooking}>
                  Book
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CinemaBooking;
