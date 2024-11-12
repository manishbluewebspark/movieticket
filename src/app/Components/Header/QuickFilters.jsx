import React from 'react';

const QuickFilters = () => {
    return (
        <div className="quick-filters-con d-flex justify-content-around p-3 text-dark">
            <div className="row quick-filters-row">
                <div className="col-lg-2">
                    <div className="qf-language-filter">
                        <label>Movies Name</label>
                        <input type="text" placeholder="Movies Name " className="form-control" />
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="qf-date-filter">
                        <span>Show Dates:</span>
                        <div>
                        {[7, 8, 9, 10, 11, 12].map(date => (
          <button key={date} className="btn btn-light mx-1">{date}</button>
        ))}
                        </div>
                    </div>
                </div>
                <div className="col-lg-2">
                    <div className="qf-time-filter">
                        <span>Show Time:</span>
                        <div className='d-flex'>
                        <button className="btn btn-light mx-1">☀️</button>
        <button className="btn btn-light mx-1">🌑</button>
        <button className="btn btn-light mx-1">🌙</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="qf-type-filter">
                        <span>Type of the movie:</span>
                        <div>
                        {["2D", "3D", "4DX", "IMAX", "7D", "9D"].map(type => (
          <button key={type} className="btn btn-light mx-1">{type}</button>
        ))}
                        </div>
                    </div>
                </div>
                <div className="col-lg-2">
                    <div className="qf-language-filter">
                        <label>Language</label>
                        <input type="text" placeholder="Language" className="form-control" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickFilters;
