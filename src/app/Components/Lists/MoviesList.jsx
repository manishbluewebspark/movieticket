"use client";
import React, { useEffect, useState } from "react";
import MovieCard from "../Cards/MovieCard";
import img from "../../images/kalki.jpeg";
import { useDispatch, useSelector } from "react-redux";

const MoviesList = () => {
  const [moviesList, setMoviesList] = useState([]);
  const { movies, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    setMoviesList(movies?.movies);
  }, [movies]);

  return (
    <div className="movies-list-con mt-4 p-4">
      <div className="row">
        {moviesList?.length > 0 &&
          moviesList?.map((movie) => (
            <div key={movie.movieid} className="col movie-list-col">
              <MovieCard {...movie} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default MoviesList;
