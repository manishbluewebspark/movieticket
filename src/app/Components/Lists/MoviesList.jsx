"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MovieCard from "../Cards/MovieCard";
import MoviesTabNavigation from "../MoviesTabNavigation/MoviesTabNavigation";

const MoviesList = () => {
  const { movies, loading, error } = useSelector((state) => state.movies);

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [activeTab, setActiveTab] = useState("All Releases");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!movies?.movies) return;

    let filtered = [];
    switch (activeTab) {
      case "All Releases":
        filtered = movies.movies; // Show all movies without a limit
        setShowAll(true); // Ensures "All Releases" always shows all movies
        break;
      case "Now Showing":
        filtered = movies.movies.filter(
          (movie) => movie.releasetypename === "Now Showing"
        );
        break;
      case "Upcoming":
        filtered = movies.movies.filter(
          (movie) => movie.releasetypename === "Coming Soon"
        );
        break;
      case "Re-Release":
        filtered = movies.movies.filter((movie) => movie.isrerelease === 1);
        break;
      default:
        filtered = [];
    }
    setFilteredMovies(filtered);
  }, [movies, activeTab]);

  return (
    <>
      {/* Tab Navigation */}
      <MoviesTabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Movies List */}
      <div className="movies-list-con p-4">
        <div className="container">
          {loading ? (
            <div className="loading-message">Loading movies...</div>
          ) : error ? (
            <div className="error-message">Error: {error.message}</div>
          ) : filteredMovies.length === 0 ? (
            <div className="no-movies-message-city">
              No movies available for the selected category.
            </div>
          ) : (
            <div className="row row-content-cent">
              {(showAll || activeTab === "All Releases"
                ? filteredMovies
                : filteredMovies.slice(0, 4)
              ).map((movie) => (
                <div
                  key={movie.movieid}
                  className="col-add-on col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl movie-list-col"
                >
                  <MovieCard {...movie} />
                </div>
              ))}
            </div>
          )}

          {/* "View All" button only for "Now Showing", "Upcoming", and "Re-Release" */}
          {["Now Showing", "Upcoming", "Re-Release"].includes(activeTab) &&
            filteredMovies.length > 4 && (
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
    </>
  );
};

export default MoviesList;
