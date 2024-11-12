import React from 'react';

const Navbar = () => {
    return (
        <div className="navbar-main-con">
            <div className="row p-2">
                <div className="col-lg-3">
                    <div className='d-flex justify-content-around align-items-center'>
                        <h4 className="logo">HawkI</h4>
                        <div className="location-selector">
                            <select className="form-select">
                                <option>Bangalore</option>
                                <option>Chennai</option>
                                <option>Mumbai</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center justify-content-center">
                        <input type="text" placeholder="Enter your location" className="form-control" />
                        <button className="btn btn-secondary ms-2">Search</button>
                </div>
                <div className="col-lg-3">
                    <div className="auth-buttons d-flex align-items-center justify-content-end">
                        <button className="btn btn-link navbar-link-btn">Login</button>
                        <button className="btn btn-link navbar-link-btn">Reach us</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
