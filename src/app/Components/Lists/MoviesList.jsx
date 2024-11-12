import React from 'react';
import MovieCard from '../Cards/MovieCard';
import img from '../../images/kalki.jpeg'


const MoviesList = () => {
  const movies = [
    {
      title: 'Kalki 2989 AD',
      rating: '8.8',
      duration: '3 Hours',
      languages: ['Telugu', 'Tamil', 'Hindi', 'Kannada', 'Malayalam'],
      type: ['3D', '2D', 'IMAX', '4DX'],
      synopsis: 'About movie and synopsis and plot and other details goes here',
      imageUrl: img,
    },
    {
      title: 'Kill',
      rating: '8.6',
      duration: '1h 46m',
      languages: ['Hindi'],
      type: ['2D'],
      synopsis: 'About movie and synopsis and plot and other details goes here',
      imageUrl: img,
    },
    {
      title: 'Despicable Me 4',
      rating: '8.8',
      duration: '1h 34m',
      languages: ['English', 'Tamil', 'Hindi', 'Kannada', 'Malayalam'],
      type: ['3D', '2D', 'IMAX', '4DX'],
      synopsis: 'About movie and synopsis and plot and other details goes here',
      imageUrl: img,
    },
  ];

  return (
    <div className="movies-list-con mt-4 p-4">
      <div className="row">
        {movies.map(movie => (
        <div className="col-lg-3">
            <MovieCard key={movie.title} {...movie} />
        </div>
      ))}
      </div>
    </div>
  );
};

export default MoviesList;
