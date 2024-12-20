"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities } from "../../store/features/citySlice";
import { fetchMoviesInCity } from "../../store/features/movieSlice";
import { setSelectedCity } from "../../store/features/citySlice"; // Import the action

const Navbar = () => {
  const dispatch = useDispatch();
  const { cities, selectedCity } = useSelector((state) => state.city); // Get selectedCity from Redux

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  useEffect(() => {
    // Set default city if cities are available
    if (cities.length > 0 && !selectedCity) {
      const defaultCityId = cities[0]?.cityId; // Default to the first city in the list
      dispatch(setSelectedCity(defaultCityId)); // Set the default city in Redux
      dispatch(fetchMoviesInCity(defaultCityId)); // Fetch movies for the default city
    }
  }, [cities, selectedCity, dispatch]);

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    dispatch(setSelectedCity(cityId)); // Update the selected city in Redux
    if (cityId) {
      dispatch(fetchMoviesInCity(cityId)); // Fetch movies when city changes
    }
  };

  return (
    <div className="navbar-main-con">
      <div className="row p-2">
        <div className="col-lg-3 d-flex justify-content-center" style={{flexDirection:'column'}}>
          <div className="d-flex justify-content-around align-items-center">
            <h4 className="logo mb-0">HawkI</h4>
            <div className="location-selector">
              <select
                className="form-select"
                value={selectedCity}
                onChange={handleCityChange}
                style={{marginTop:'0px'}}
              >
                <option value={""}>Select City</option>
                {cities?.map((item, index) => (
                  <option key={index} value={item?.cityId}>
                    {item?.cityName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <input
            type="text"
            placeholder="Enter your location"
            className="form-control"
          />
          <button className="btn btn-secondary ms-2">Search</button>
        </div>
        <div className="col-lg-3 d-flex justify-content-center" style={{flexDirection:'column'}}>
          <div className="auth-buttons d-flex align-items-center justify-content-around">
            <div className="login-con">
            <a className="login-btn">Login</a> / <a className="login-btn">Signup</a>
            </div>
            <div className="reach-us-con">
              <a className="reach-us">Reach us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
