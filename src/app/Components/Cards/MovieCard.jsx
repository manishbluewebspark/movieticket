import React from 'react';
import Image from 'next/image';

const MovieCard = ({ title, rating, duration, languages, type, synopsis, imageUrl }) => {
    return (
        <div className="mvc-movie-card shadow-sm">
            {/* Image Section */}
            <div className="mvc-image-container position-relative">
                <Image
                    src={imageUrl || '/placeholder.png'}
                    alt={title}
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
                <h5 className="mvc-title mb-1">{title}</h5>
                <p className="mvc-genre text-muted mb-2">{type.join(', ')}</p>
                <p className="mvc-info"><strong>Duration:</strong> {duration}</p>
                <p className="mvc-info"><strong>Languages:</strong> {languages.join(', ')}</p>
                
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
