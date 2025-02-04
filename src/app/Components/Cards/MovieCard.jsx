"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MovieCard = ({
  movieid="",
  moviename = "",
  rating = "N/A",
  duration = "N/A",
  languages = [],
  movietypes = [],
  synopsis = "",
  poster1 = "/placeholder.png",
  moviename_release_lang = "",
}) => {
  const router = useRouter();

  const handleBookNow = () => {
    // Use the navigate method provided by next/navigation
    movieid,
    moviename_release_lang 
     router.push(
      `/cinemabooking?movieid=${encodeURIComponent(movieid)}&moviename=${encodeURIComponent(moviename_release_lang)}`
    );
    // router.push(
    //   `/cinemabooking?moviename=${encodeURIComponent(moviename)}&rating=${encodeURIComponent(
    //     rating
    //   )}&duration=${encodeURIComponent(duration)}&languages=${encodeURIComponent(
    //     JSON.stringify(languages)
    //   )}&movietypes=${encodeURIComponent(JSON.stringify(movietypes))}&synopsis=${encodeURIComponent(
    //     synopsis
    //   )}&poster1=${encodeURIComponent(poster1)}&moviename_release_lang=${encodeURIComponent(
    //     moviename_release_lang
    //   )}`
    // );
  };

  return (
    <div className="mvc-movie-card shadow-sm">
      {/* Image Section */}
      <div className="mvc-image-container position-relative">
        <Image
          src={poster1}
          alt={moviename}
          layout="fill"
          objectFit="fill"
          className="mvc-image rounded-top"
          style={{ width: "100%" }}
        />
      </div>

      {/* Details Section */}
      <div className="p-3 text-center">
        <div className="mvc-title-container" title={moviename}>
          <h5 className="mvc-title mb-1">
          <span>
  {languages?.length > 1
    ? moviename
    : moviename_release_lang === moviename
    ? moviename
    : `${moviename_release_lang} (${moviename})`}
</span>
          </h5>
        </div>
        <p className="mvc-genre text-muted mb-2">
          {movietypes.length > 0 ? movietypes.join(", ") : "No genres available"}
        </p>
        <p className="mvc-info">
          <strong>Duration:</strong> {duration}
        </p>
        <p className="mvc-info">
          <strong>Languages:</strong>{" "}
          {languages.length > 0 ? languages.join(", ") : "No languages available"}
        </p>

        {/* Synopsis */}
        {/* <div className="mvc-synopsis mt-2 mb-3">
          <p className="text-muted">{synopsis || "No synopsis available."}</p>
        </div> */}

        {/* Book Now Button */}
        <div className="d-grid">
          <button className="mvc-btn-primary" onClick={handleBookNow}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
