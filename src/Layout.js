import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // Import CSS file for styling
import 'react-toastify/dist/ReactToastify.css';
import background from './home.avif';
const Layout = ({ children }) => {
  return (
    <div className="app-container" style={{ backgroundImage: `url(${background})` }}>
      
      <div className="content-container">
        {children} {/* Render page content */}
      </div>
    </div>
  );
};

export default Layout;
