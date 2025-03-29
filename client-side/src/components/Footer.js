import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="Quick-Links">
        <h3>Quick Links</h3>
        <ul className="list">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/crop-prices">Crop Prices</a>
          </li>
          <li>
            <a href="/schemes">Government Schemes</a>
          </li>
          <li>
            <a href="/contact">Contact Us</a>
          </li>
        </ul>
      </div>

      <div className="Contact-US">
        <h3>Contact Us</h3>
        <ul className="list">
          <li>
            <a href="https://maps.app.goo.gl/NywqLwn71YpJAYTW9">
              📍 Telangana Agriculture Dept.
            </a>
          </li>
          <li>
            <a href="tel:040 2338 3520">📞 040 2338 3520</a>
          </li>
          <li>
            <a href="mailto:prashanthashok143@gmail.com">
              📧 support@tsfarmers.com
            </a>
          </li>
        </ul>
      </div>

      <div className="Social-icons">
        <h3>Follow Us</h3>
        <ul className="list">
          <li>
            <a href="/">facebook</a>
          </li>
          <li>
            <a href="/">instagram</a>
          </li>
          <li>
            <a href="/">youtube</a>
          </li>
          <li>
            <a href="/">twitter</a>
          </li>
        </ul>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Telangana Farmer Support Platform.
          All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
