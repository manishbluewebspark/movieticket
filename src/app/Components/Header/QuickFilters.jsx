"use client";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredMovies } from "../../store/features/movieSlice"; // Import your thunk action

const QuickFilters = () => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);
  const { selectedCity } = useSelector((state) => state.city);

  const [filters, setFilters] = useState({
    cityid: 0,
    movieids: [],
    moviesearch: "",
    showdates: [],
    showtimes: [],
    movietypes: [],
    langs: [],
    areaLat: "",
    areaLong: "",
  });

  const [hasMounted, setHasMounted] = useState(false); // New flag to track if the component has mounted
  const datePickerRef = useRef(null); // Ref for the date picker

  useEffect(() => {
    // Update the filters when the selected city changes
    if (selectedCity) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        cityid: selectedCity, // Set cityid in filters
      }));
    }
  }, [selectedCity]);

  // Run the effect only if the component has mounted and filters are changed
  useEffect(() => {
    if (hasMounted) {
      dispatch(fetchFilteredMovies(filters));
    } else {
      setHasMounted(true);
    }
  }, [filters, dispatch, hasMounted]); // Only re-run the effect if filters or hasMounted change

  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const updated = { ...prev };
      if (Array.isArray(updated[key])) {
        if (updated[key].includes(value)) {
          updated[key] = updated[key].filter((item) => item !== value);
        } else {
          updated[key].push(value);
        }
      } else {
        updated[key] = value;
      }
      return updated;
    });
  };

  const getDayFromDate = (dateString) => {
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) {
      const [day, month, year] = dateString.split("-");
      return day;
    }
    return dateObj.getDate();
  };

  const handleScroll = (direction) => {
    if (datePickerRef.current) {
      const scrollAmount = 100; // Adjust scroll speed here
      const scrollContainer = datePickerRef.current;
      if (direction === "left") {
        scrollContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else if (direction === "right") {
        scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="quick-filters-con d-flex justify-content-around p-3 text-dark">
      <div className="row quick-filters-row">
        <div className="col-lg-2 qf-col">
          <div className="qf-language-filter">
            {/* <label>Movies Name</label> */}
            <input
              type="text"
              placeholder="Movies Name"
              className="form-control"
              value={filters.moviesearch}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  moviesearch: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className="col-lg-3">
          <div className="qf-date-filter">
            {/* <span>Show Dates:</span> */}
            <div className="date-picker-container">
              <button className="scroll-btn left" onClick={() => handleScroll("left")}>
                &lt;
              </button>
              <div className="date-picker" ref={datePickerRef}>
                {movies?.showdate?.map((date) => (
                  <button
                    key={date}
                    className={`btn date-btn ${
                      filters.showdates.includes(date) ? "btn-primary" : "btn-light"
                    }`}
                    onClick={() => handleFilterChange("showdates", date)}
                  >
                    <div className="date-box">
                      <div className="date-day">{getDayFromDate(date)}</div>
                      <div className="date-month">
  {new Date(date).toLocaleString("en-US", { month: "short" })}
</div>
                    </div>
                  </button>
                ))}
              </div>
              <button className="scroll-btn right" onClick={() => handleScroll("right")}>
                &gt;
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-2 qf-col">
          <div className="qf-time-filter">
            {/* <span>Show Time:</span> */}
            <div className="d-flex">
              {["Morning", "Afternoon", "Evening"].map((time) => (
                <button
                  key={time}
                  className={`btn ${filters.showtimes.includes(time) ? "btn-primary" : "btn-light"} mx-1`}
                  onClick={() => handleFilterChange("showtimes", time)}
                >
                  {time === "Morning" ? "☀️" : time === "Evening" ? "🌙" : "🌑"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-3 qf-col">
          <div className="qf-type-filter">
            {/* <span>Type of the movie:</span> */}
            <div className="">
              <select
                className="form-select"
                onChange={(e) => handleFilterChange("movietypes", e.target.value)}
                value={filters.movietypes[0]} // You can adjust how the value is managed based on your logic
              >
                <option value="">Select Movie Type</option>
                {movies?.movietype?.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="col-lg-2 qf-col">
          <div className="qf-language-filter">
            {/* <label>Language</label> */}
            <input
              type="text"
              placeholder="Language"
              className="form-control"
              value={filters.langs[0] || ""}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  langs: [e.target.value],
                }))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickFilters;
