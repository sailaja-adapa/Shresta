import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import { FaHome, FaInfoCircle, FaPhone, FaSignInAlt, FaUserPlus, FaBars } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const [navStyle, setNavStyle] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const styles = {
      "/": { background: "rgba(24, 180, 126, 0.35)", backdropFilter: "blur(8px)" },
      "/aboutus": { background: "rgba(45, 55, 72, 0.35)", backdropFilter: "blur(8px)" },
      "/contact": { background: "rgba(44, 82, 130, 0.35)", backdropFilter: "blur(8px)" },
      "/StoreImageTextFirebase": { background: "rgba(4, 95, 206, 0.55)", backdropFilter: "blur(8px)" },
      default: { background: "rgba(30, 41, 59, 0.35)", backdropFilter: "blur(8px)" },
    };
    setNavStyle(styles[location.pathname] || styles.default);
  }, [location]);
  
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="fixed" sx={{ ...navStyle, transition: "background-color 0.3s ease", boxShadow: "none", padding: "0.5rem 2rem" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo */}
        <Typography component={Link} to="/" sx={{ color: "white", fontSize: "1.5rem", fontWeight: "bold", textDecoration: "none" }}>
          Shresta
        </Typography>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: "2rem", alignItems: "center" }}>
          {[
            { to: "/", icon: <FaHome />, label: "Home" },
            { to: "/aboutus", icon: <FaInfoCircle />, label: "About Us" },
            { to: "/contact", icon: <FaPhone />, label: "Contact Us" },
            { to: "/login", icon: <FaSignInAlt />, label: "Login" },
            { to: "/register", icon: <FaUserPlus />, label: "Register" },
          ].map(({ to, icon, label }) => (
            <Box key={to} component={Link} to={to} sx={{ display: "flex", alignItems: "center", color: "black", textDecoration: "none", gap: "0.5rem", fontSize: "1rem", transition: "color 0.3s ease", "&:hover": { color: "white" } }}>
              {icon}
              {label}
            </Box>
          ))}
        </Box>

        {/* Mobile Menu Icon */}
        <IconButton sx={{ display: { xs: "block", md: "none" }, color: "white" }} onClick={handleMenuOpen}>
          <FaBars />
        </IconButton>

        {/* Mobile Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} sx={{ "& .MuiPaper-root": { background: "rgba(35, 132, 244, 0.7)", backdropFilter: "blur(20px)", padding: "0.5rem", borderRadius: "8px", boxShadow: "0 4px 30px rgba(0, 0, 0, 0.8)" } }}>
          {[
            { to: "/", icon: <FaHome />, label: "Home" },
            { to: "/aboutus", icon: <FaInfoCircle />, label: "About Us" },
            { to: "/contact", icon: <FaPhone />, label: "Contact Us" },
            { to: "/login", icon: <FaSignInAlt />, label: "Login" },
            { to: "/register", icon: <FaUserPlus />, label: "Register" },
          ].map(({ to, icon, label }) => (
            <MenuItem key={to} component={Link} to={to} onClick={handleMenuClose} sx={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "black", "&:hover": { color: "white" } }}>
              {icon}
              {label}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;