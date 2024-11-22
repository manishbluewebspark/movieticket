import React from "react";
import Image from "next/image";
import img from "../../images/kalki.jpeg";
const movies = [
  {
    title: "Kalki 2989 AD",
    rating: "8.8",
    duration: "3 Hours",
    languages: ["Telugu", "Tamil", "Hindi", "Kannada", "Malayalam"],
    type: ["3D", "2D", "IMAX", "4DX"],
    synopsis: "About movie and synopsis and plot and other details goes here",
    imageUrl: img,
  },
  {
    title: "Kill",
    rating: "8.6",
    duration: "1h 46m",
    languages: ["Hindi"],
    type: ["2D"],
    synopsis: "About movie and synopsis and plot and other details goes here",
    imageUrl: img,
  },
  {
    title: "Despicable Me 4",
    rating: "8.8",
    duration: "1h 34m",
    languages: ["English", "Tamil", "Hindi", "Kannada", "Malayalam"],
    type: ["3D", "2D", "IMAX", "4DX"],
    synopsis: "About movie and synopsis and plot and other details goes here",
    imageUrl: img,
  },
];
const MovieCard = ({
  moviename,
  rating,
  duration,
  languages,
  movietypes,
  synopsis,
  poster1,
}) => {
  return (
    <div className="mvc-movie-card shadow-sm">
      {/* Image Section */}
      <div className="mvc-image-container position-relative">
        <Image
          src={poster1 || "/placeholder.png"}
          alt={moviename}
          layout="fill"
          objectFit="cover"
          className="mvc-image rounded-top"
        />
        <div className="mvc-rating-bar position-absolute bottom-0 start-0 w-100 d-flex align-items-center px-2">
          <span className="text-white">{rating}/10</span>
          {/* <span className="text-white ms-2">{votes} Votes</span> */}
        </div>
      </div>

      {/* Details Section */}
      <div className="p-3 text-center">
        <h5 className="mvc-title mb-1">{moviename}</h5>
        <p className="mvc-genre text-muted mb-2">{movietypes.join(", ")}</p>
        <p className="mvc-info">
          <strong>Duration:</strong> {duration}
        </p>
        <p className="mvc-info">
          <strong>Languages:</strong> {languages.join(", ")}
        </p>

        {/* Synopsis */}
        <div className="mvc-synopsis mt-2 mb-3">
          <p className="text-muted">{synopsis}</p>
        </div>

        {/* Book Now Button */}
        <div className="d-grid">
          <button className="btn mvc-btn-primary">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
