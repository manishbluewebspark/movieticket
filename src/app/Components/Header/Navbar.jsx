"use client";
import Image from "next/image";
import logo from '../../images/Hawlkwhite.svg';
import React, { useEffect, useState ,Suspense} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities } from "../../store/features/citySlice";
import { fetchMoviesInCity } from "../../store/features/movieSlice";
import { setSelectedCity } from "../../store/features/citySlice"; // Import the action
import QuickFilters from "./QuickFilters";
import { useRouter } from "next/navigation";


const Navbar= () => {
      const router = useRouter();

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

      const handleBack = () => {
        router.back(); // Navigates back in the browser history
      };
    
  return (
   <>
   <div className="header-sticky">
   <div className="navbar-sec">
     <div className="container navbar-con">
        <div className="row">
        <span
      onClick={handleBack}
      style={{
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        userSelect: 'none',
      }}
    >
      <i className="bi bi-arrow-left" style={{ marginRight: '0.5rem' }}></i>
      Back
    </span>
        </div>
        <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6 d-flex align-items-center">
            <div className="nav-logo" onClick={() => (window.location.href = "/")}>
                <Image src={logo} alt="logo" height={32.17} width={130} />
            </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6 d-flex align-items-center justify-content-end">
               <div className="navbar-right-con">
               <div className="location-selector">
              <select
                className="form-select"
                value={selectedCity}
                onChange={handleCityChange}
              >
                <option value={""}>Select City</option>
                {cities?.map((item, index) => (
                  <option key={index} value={item?.cityId}>
                    {item?.cityName}
                  </option>
                ))}
              </select>
            </div>
                    <div className="navbar-signin">
                    Sign In
                    </div>
                    <div className="navbar-button d-none d-md-block">
                        <button>Contact Us</button>
                    </div>
               </div>
            </div>
        </div>
     </div>
    </div>
    <Suspense fallback={<div>Loading...</div>}>

    <QuickFilters></QuickFilters>
    </Suspense>
   </div>
   </>
  );
};

export default Navbar;
