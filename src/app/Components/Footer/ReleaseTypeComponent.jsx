"use client"
import React, { useState } from "react";

const ReleaseTypeComponent = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingMovies = [
    { title: "Bhool Bhulaiyaa 3", duration: "2 hrs 52 mins", languages: "Hindi, Malayalam", image: "bhool.jpg" },
    { title: "Bhairathi Ranagal", duration: "2 hrs 52 mins", languages: "Hindi, Malayalam", image: "bhairathi.jpg" },
    { title: "Amaran", duration: "2 hrs 52 mins", languages: "Hindi, Malayalam", image: "amaran.jpg" },
    { title: "Sookshmadarshini", duration: "2 hrs 52 mins", languages: "Hindi, Malayalam", image: "sookshmadarshini.jpg" },
  ];

  const reReleaseMovies = [
    { title: "Old Classic 1", duration: "2 hrs 30 mins", languages: "Hindi, Tamil", image: "classic1.jpg" },
    { title: "Old Classic 2", duration: "2 hrs 15 mins", languages: "Malayalam", image: "classic2.jpg" },
  ];

  const movies = activeTab === "upcoming" ? upcomingMovies : reReleaseMovies;

  return (
    <div className="release-type-container">
      <h2>Release Type</h2>
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "upcoming" ? "active" : ""}`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`tab-button ${activeTab === "re-release" ? "active" : ""}`}
          onClick={() => setActiveTab("re-release")}
        >
          Re-release
        </button>
      </div>

      {/* <div className="movie-cards-container">
        {movies.map((movie, index) => (
          <div key={index} className="movie-card">
            <img src={movie.image} alt={movie.title} className="movie-image" />
            <h3>{movie.title}</h3>
            <p>{movie.duration}</p>
            <p>{movie.languages}</p>
            <button className="book-button">Book</button>
          </div>
        ))}
      </div> */}
      <div className="view-all">View All &gt;</div>
    </div>
  );
};

export default ReleaseTypeComponent;
