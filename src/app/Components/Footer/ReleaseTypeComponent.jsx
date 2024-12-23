"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MovieCard from "../Cards/MovieCard";

const ReleaseTypeComponent = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [reReleaseMovies, setReReleaseMovies] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const { movies, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    if (movies?.movies) {
      // Filter "Coming Soon" movies
      const comingSoon = movies.movies.filter(
        (movie) => movie.releasetypename === "Coming Soon"
      );

      // Filter "Re-release" movies
      const reReleases = movies.movies.filter(
        (movie) => movie.isrerelease === 1
      );

      setUpcomingMovies(comingSoon);
      setReReleaseMovies(reReleases);
    }
  }, [movies]);

  const [activeTab, setActiveTab] = useState("upcoming");
  const moviess = activeTab === "upcoming" ? upcomingMovies : reReleaseMovies;

  // Determine how many movies to show based on "showAll" state
  const moviesToDisplay = showAll ? moviess : moviess.slice(0, 4); // Display first row (e.g., 4 movies)

  return (
    <div className="release-type-container">
      <div className="container">
        <h2>Release Type</h2>
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("upcoming");
              setShowAll(false); // Reset "View All" when switching tabs
            }}
          >
            Upcoming
          </button>
          <button
            className={`tab-button ${
              activeTab === "re-release" ? "active" : ""
            }`}
            onClick={() => {
              setActiveTab("re-release");
              setShowAll(false); // Reset "View All" when switching tabs
            }}
          >
            Re-release
          </button>
        </div>

        <div className="movie-cards-container">
          {moviesToDisplay?.length > 0 ? (
            moviesToDisplay.map((movie) => (
              <div
                key={movie.movieid}
                className="col-add-on col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl movie-list-col"
              >
                <MovieCard {...movie} />
              </div>
            ))
          ) : (
            <div className="no-movies-message">
              {activeTab === "upcoming"
                ? "No upcoming movies available."
                : "No re-release movies available."}
            </div>
          )}
        </div>

        {/* "View All" button */}
        {moviess?.length > 4 && (
          <div className="view-all">
            <button
              className="view-all-button"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "View All"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReleaseTypeComponent;
