"use client";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredMovies } from "../../store/features/movieSlice";
import {bookTickets} from "../../store/features/cinemaBookingSlice"
import img1 from '../../images/si_sun-set-line.svg';
import img2 from '../../images/f7_sun-max.svg';
import img3 from '../../images/solar_moon-fog-outline.svg';
import img4 from '../../images/solar_moon-stars-outline.svg';
import Image from "next/image";
import searchIcon from '../../images/serach.svg';
import calenderIcon from '../../images/stash_data-date-solid.svg';
import watchIcon from '../../images/mingcute_time-line.svg';
import diceIco from '../../images/fad_random-2dice.svg';
import tablurIcon from '../../images/tabler_language.svg';
import { usePathname, useSearchParams,useRouter  } from "next/navigation";
const QuickFilters = () => {
  const pathname = usePathname(); // Get the current route path
  const searchParams = useSearchParams(); // Access query parameters
  const router = useRouter();
  let movieId = 0;
  if(pathname === "/cinemabooking"){
    movieId = searchParams.get("movieid");
  }



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

  const clearFilters = () => {
    setFilters({
      cityid: selectedCity,
      movieids: [],
      moviesearch: "",
      showdates: [],
      showtimes: [],
      movietypes: [],
      langs: [],
      areaLat: "",
      areaLong: "",
    });
  };

  const [hasMounted, setHasMounted] = useState(false); // New flag to track if the component has mounted
  const datePickerRef = useRef(null); // Ref for the date picker
  const datePickerReftwo = useRef(null); // Ref for the date picker


  useEffect(() => {
    // Update the filters when the selected city changes
    if (movieId) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        movieids: [movieId], // Set cityid in filters
      }));
    }
  }, [movieId]);
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
      if(pathname==="/"){
        dispatch(fetchFilteredMovies(filters));
      }else if(pathname==="/cinemabooking"){
        dispatch(bookTickets(filters));
      }
    } else {
      setHasMounted(true);
    }
  }, [filters, dispatch, hasMounted,pathname]); // Only re-run the effect if filters or hasMounted change
  // useEffect(() => {
  //   if (hasMounted) {
  //     dispatch(bookTickets(filters));
  //   } else {
  //     setHasMounted(true);
  //   }
  // }, [filters, dispatch, hasMounted]);
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
  const handleScrolltwo = (direction) => {
    if (datePickerReftwo.current) {
      const scrollAmount = 100; // Adjust scroll speed here
      const scrollContainer = datePickerReftwo.current;
      if (direction === "left") {
        scrollContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else if (direction === "right") {
        scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <div className="container quick-filters-con d-flex justify-content-around text-dark">
        <div className="row quick-filters-row">
          <div className="col-lg-2 col-md-4 col-sm-6 qf-col">
            <div className="qf-search-filter d-flex">
              <input
                type="text"
                placeholder="Movies Name"
                className=""
                value={filters.moviesearch}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    moviesearch: e.target.value,
                  }))
                }
              />
              <span><Image src={searchIcon} height={17} width={17} alt="ft-icon" ></Image></span>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 show-date-col" style={{ marginTop: "10px" }}>
  <div className="text-center">
    <label className="qf-lable">
      <span>
        <Image src={calenderIcon} height={24} width={24} alt="ft-icon" />
      </span>
      Show dates
    </label>
  </div>
  <div className="qf-date-filter">
    <div className="date-picker-container">
      <button className="scroll-btn left" onClick={() => handleScroll("left")}>
        &#60;
      </button>
      {movies?.showdate?.length > 0 ? (
        <div className="date-picker" ref={datePickerRef}>
          {movies.showdate.map((date) => (
            <button
              key={date}
              className={`date-btn ${
                filters.showdates.includes(date) ? "btn-primary" : "btn-light"
              }`}
              onClick={() => handleFilterChange("showdates", date)}
              style={{
                color: filters.showdates.includes(date) ? "#008ECC" : "black", // Dynamic text color
              }}
            >
              <div className="date-day">{getDayFromDate(date)}</div>
            </button>
          ))}
        </div>
      ) : (
        <div className="no-dates-message">No dates available</div>
      )}
      <button className="scroll-btn right" onClick={() => handleScroll("right")}>
        &#62;
      </button>
    </div>
  </div>
</div>

          <div className="col-lg-2 col-md-4 col-sm-6 qf-col">
            <div className="show-time-section">
              <div className="text-center">
                <label className="qf-lable">
                  <span>
                    <Image src={watchIcon} height={24} width={24} alt="ft-icon" />
                  </span>
                  Show Time In
                </label>
              </div>
              <div className="show-time-buttons">
                <button
                  className={`time-btn ${filters.showtimes.includes("Morning") ? "active" : ""}`}
                  onClick={() => handleFilterChange("showtimes", "Morning")}
                >
                  <Image src={img1} alt="icon" height={27} width={30} />
                </button>
                <button
                  className={`time-btn ${filters.showtimes.includes("Noon") ? "active" : ""}`}
                  onClick={() => handleFilterChange("showtimes", "Noon")}
                >
                  <Image src={img2} alt="icon" height={24} width={24} />
                </button>
                <button
                  className={`time-btn ${filters.showtimes.includes("Evening") ? "active" : ""}`}
                  onClick={() => handleFilterChange("showtimes", "Evening")}
                >
                  <Image src={img3} alt="icon" height={24} width={24} />
                </button>
                <button
                  className={`time-btn ${filters.showtimes.includes("Night") ? "active" : ""}`}
                  onClick={() => handleFilterChange("showtimes", "Night")}
                >
                  <Image src={img4} alt="icon" height={24} width={24} />
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-12 col-sm-6 show-type-col" style={{ marginTop: "10px" }}>
  <div className="text-center">
    <label className="qf-lable">
      <span>
        <Image src={diceIco} height={24} width={24} alt="ft-icon" />
      </span>
      Type of the movie
    </label>
  </div>
  <div className="qf-type-filter">
    <div className="type-picker-container">
      <button className="scroll-btn left" onClick={() => handleScrolltwo("left")}>
        &#60;
      </button>
      {movies?.movietype?.length > 0 ? (
        <div className="type-picker" ref={datePickerReftwo}>
          {movies.movietype.map((type) => (
            <button
              key={type}
              className="movie-type-button"
              onClick={() => handleFilterChange("movietypes", type)}
              style={{
                color: filters.movietypes?.includes(type) ? "#008ECC" : "black",
              }}
            >
              {type}
            </button>
          ))}
        </div>
      ) : (
        <div className="no-types-message">No types available</div>
      )}
      <button className="scroll-btn right" onClick={() => handleScrolltwo("right")}>
        &#62;
      </button>
    </div>
  </div>
</div>

          <div className="col-lg-2 col-md-12 qf-col">
            <div className="text-center">
              <label className="qf-lable"><span><Image src={tablurIcon} height={24} width={24} alt="ft-icon" ></Image></span>Language</label>
            </div>
            <select
  className="form-select qf-selec-lang"
  value={filters.langs[0] || ""}
  onChange={(e) =>
    setFilters((prev) => ({
      ...prev,
      langs: e.target.value === "" ? [] : [e.target.value],
    }))
  }
>
  <option value="">Select</option>
  <option value="English">English</option>
  <option value="Hindi">Hindi</option>
  <option value="Malayalam">Malayalam</option>
  <option value="Tamil">Tamil</option>
  <option value="Telugu">Telugu</option>
  <option value="Kannada">Kannada</option>
</select>

          </div>
        </div>
        <div className="row">
          <div className="col qf-col">
            <button className="qf-clear-btn" onClick={clearFilters}>
              clear filter
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickFilters;