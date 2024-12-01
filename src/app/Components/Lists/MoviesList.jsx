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
      <div className="row row-content-cent">
        {moviesList?.length > 0 &&
          moviesList?.map((movie) => (
            <div key={movie.movieid} className="col-add-on col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl movie-list-col">
              <MovieCard {...movie} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default MoviesList;
