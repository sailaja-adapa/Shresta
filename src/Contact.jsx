import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, Box, Paper, Slide } from "@mui/material";
import { FaHome, FaInfoCircle, FaPhone, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://media.istockphoto.com/id/2160041157/photo/website-page-contact-us-or-e-mail-marketing-concept-customer-support-hotline-contact-us.webp?a=1&b=1&s=612x612&w=0&k=20&c=vjlD9d6TgqTnp7vYpkMmfSWYUbtNq9FjPa9fYbkmimM=')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" fontWeight="bold">
            Shresta
          </Typography>
          <Box>
            {[
              { name: "Home", icon: <FaHome />, link: "/" },
              { name: "About", icon: <FaInfoCircle />, link: "/about" },
              { name: "Contact", icon: <FaPhone />, link: "/contact" },
            ].map((item, index) => (
              <Button
                key={index}
                color="inherit"
                startIcon={item.icon}
                href={item.link}
                sx={{
                  "&:hover": { color: "#ffcc00", transform: "scale(1.1)", transition: "0.3s" },
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Contact Section */}
      <Container maxWidth="sm" sx={{ mt: 8 }}>  {/* Changed from "md" to "sm" */}
        <Slide direction="up" in={true} timeout={1000}>
          <Paper
            component={motion.div}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            elevation={10}
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 4,
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
              transition: "transform 0.5s ease, box-shadow 0.5s ease",
              "&:hover": {
                transform: "rotateX(5deg) rotateY(-5deg) scale(1.05)", // New 3D tilt effect
                boxShadow: "0px 10px 30px rgba(0,0,0,0.4)", // Increased shadow on hover
              },
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              color="primary"
              gutterBottom
              sx={{ letterSpacing: "1px" }}
              component={motion.div}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Connect with Me
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
              I would love to hear from you! Feel free to connect with me on the platforms below:
            </Typography>

            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
              {[
                { label: "GitHub", icon: <FaGithub />, link: "https://github.com/sailaja-adapa", bg: "#333" },
                {
                  label: "LinkedIn",
                  icon: <FaLinkedin />,
                  link: "https://www.linkedin.com/in/sailaja-adapa-770167291/",
                  bg: "#0077b5",
                },
                { label: "Email", icon: <FaEnvelope />, link: "mailto:adapasailaja17@gmail.com", bg: "#34a853" },
              ].map((item, index) => (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  key={index}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: item.bg,
                      color: "white",
                      width: "250px",
                      transition: "all 0.3s ease",
                      "&:hover": { backgroundColor: "#555" },
                    }}
                    startIcon={item.icon}
                    href={item.link}
                    target="_blank"
                  >
                    {item.label}
                  </Button>
                </motion.div>
              ))}
            </Box>
          </Paper>
        </Slide>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          mt: "auto",
          width: "100%",
          background: "linear-gradient(to right, #333, #555)",
          p: 2,
          textAlign: "center",
        }}
      >
        <Typography color="white">© 2024 Shresta. All Rights Reserved.</Typography>
      </Box>
    </Box>
  );
};

export default Contact;
