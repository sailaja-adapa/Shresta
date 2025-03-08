import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaInfoCircle, FaPhone, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [navStyle, setNavStyle] = useState({});
  const [isOpen, setIsOpen] = useState(false);

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
      case '/StoreImageTextFirebase':
        setNavStyle({
          background: 'rgba(4, 95, 206, 0.55)',  // Medium blue
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar" style={navStyle}>
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          Shresta
        </Link>
        <button className="hamburger" onClick={toggleMenu}>
          <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      <ul className={`nav-links ${isOpen ? 'active' : ''} ${isOpen ? 'dropdown' : ''}`} style={isOpen ? navStyle : {}}>
        <li>
          <Link to="/">
            <FaHome className="nav-icon" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/aboutus">
            <FaInfoCircle className="nav-icon" />
            <span>About Us</span>
          </Link>
        </li>
        <li>
          <Link to="/contact">
            <FaPhone className="nav-icon" />
            <span>Contact Us</span>
          </Link>
        </li>
        <li>
          <Link to="/login">
            <FaSignInAlt className="nav-icon" />
            <span>Login</span>
          </Link>
        </li>
        <li>
          <Link to="/register">
            <FaUserPlus className="nav-icon" />
            <span>Register</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;