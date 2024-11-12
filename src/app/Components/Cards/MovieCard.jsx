import React from 'react';
import Image from 'next/image';

const MovieCard = ({ title, rating, duration, languages, type, synopsis, imageUrl }) => {
    return (
        <div className="movie-card border p-3 m-3" style={{ maxWidth: '350px' }}>
            <div>
                <h4 className="mt-2">{title}</h4>
            </div>
            <div className="row">
                <div className="col-5">
                    <Image
                        src={imageUrl || '/placeholder.png'} // Use a placeholder if no image URL is provided
                        alt={title}
                        width={100}  // Set desired width
                        height={100} // Set desired height
                        className="rounded" // Apply additional classes if needed
                    />
                </div>
                <div className='col-lg-7'>
                    <p><strong>Rating:</strong> {rating}</p>
                    <p><strong>Duration:</strong> {duration}</p>
                    <p><strong>Languages:</strong> {languages.join(', ')}</p>
                    <p><strong>Type:</strong> {type.join(', ')}</p>
                </div>
            </div>
            <div>
                <p><strong>Synopsis:</strong> {synopsis}</p>
            </div>
        </div>
    );
};

export default MovieCard;
