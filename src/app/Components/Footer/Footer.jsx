// components/Footer.js
import React from "react";
import logo from '../../images/Hawlk.svg';
import Image from "next/image";
import picon from '../../images/picon.svg';
import instaicon from '../../images/instaicon.svg';
import fbicon from '../../images/fbicon.svg';
import twittericon from '../../images/twittericon.svg';
import googleicon from '../../images/googleicon.svg';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row footer-row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                <div className="footer-left-sec">
                   {/* <h5 className="footer-title mb-2">Hawlk</h5> */}
                   <div className="footer-logo-con">
                   <Image src={logo} width={130} height={32.17} alt="logo"></Image>
                   </div>
                    <p className="footer-copyright">
                        Copyright © 2024. All Rights Reserved By{" "}
                        <a href="#" className="footer-link">
                        Hawlk
                        </a>
                    </p>
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-6">
            <div className="footer-social">
          <a href="#" className="mx-2">
            <Image src={fbicon} width={14} height={14} alt="logo"></Image>
          </a>
          <a href="#" className="mx-2">
          <Image src={twittericon} width={14} height={14} alt="logo"></Image>

          </a>
          <a href="#" className="mx-2">
          <Image src={picon}  width={14} height={14} alt="logo"></Image>

          </a>
          <a href="#" className="mx-2">
          <Image src={googleicon}  width={14} height={14} alt="logo"></Image>

          </a>
          <a href="#" className="mx-2">
          <Image src={instaicon} width={14} height={14} alt="logo"></Image>

          </a>
        </div>
        <ul className="footer-links list-inline mb-0">
          <li className="list-inline-item mx-2">
            <a href="#" className="footer-linkm">Contact Us</a>
          </li>
          <li className="list-inline-item mx-2">
            <a href="#" className="footer-linkm">About</a>
          </li>
          <li className="list-inline-item mx-2">
            <a href="#" className="footer-linkm">Terms Of Use</a>
          </li>
          <li className="list-inline-item mx-2">
            <a href="#" className="footer-linkm">Privacy Policy</a>
          </li>
          <li className="list-inline-item mx-2">
            <a href="#" className="footer-linkm">FAQ</a>
          </li>
          <li className="list-inline-item mx-2">
            <a href="#" className="footer-linkm">Feedback</a>
          </li>
        </ul>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
