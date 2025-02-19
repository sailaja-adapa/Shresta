import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaInfoCircle, FaPhone, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [navStyle, setNavStyle] = useState({});

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setNavStyle({
          background: 'rgba(24, 180, 126, 0.35)',  // Dark blue for home
          backdropFilter: 'blur(8px)'
        });
        break;
      case '/aboutus':
        setNavStyle({
          background: 'rgba(45, 55, 72, 0.35)',  // Slate blue
          backdropFilter: 'blur(8px)'
        });
        break;
      case '/contact':
        setNavStyle({
          background: 'rgba(44, 82, 130, 0.35)',  // Medium blue
          backdropFilter: 'blur(8px)'
        });
        break;
      default:
        setNavStyle({
          background: 'rgba(30, 41, 59, 0.35)',  // Navy blue
          backdropFilter: 'blur(8px)'
        });
    }
  }, [location]);

  return (
    <nav className="navbar" style={navStyle}>
        {/* Logo */}
        <Link to="/" className="logo">
          Shresta
        </Link>
        {/* Navigation Links */}
        <ul className="nav-links">
          <li>
            <FaHome className="nav-icon" />
            <Link to="/">Home</Link>
          </li>
          <li>
            <FaInfoCircle className="nav-icon" />
            <Link to="/aboutus">About Us</Link>
          </li>
          <li>
            <FaPhone className="nav-icon" />
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <FaSignInAlt className="nav-icon" />
            <Link to="/login">Login</Link>
          </li>
          <li>
            <FaUserPlus className="nav-icon" />
            <Link to="/register">Register</Link>
          </li>
        </ul>
    </nav>
  );
};

export default Navbar;