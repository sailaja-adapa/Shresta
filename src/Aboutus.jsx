import React from "react";
import { Container, Typography, Card, CardContent, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import backgroundImage from "./aboutusbg.jpeg";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        p: 3,
        position: "relative",
      }}
    >
      <Container
        maxWidth="sm"
        component={motion.div}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          mt: 10,
          mb: 16, // Increased margin bottom to create more gap
          ml: 0,
          position: "relative",
          left: "5%",
        }}
      >
        <Card
          component={motion.div}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          sx={{
            p: 4,
            boxShadow: 8,
            textAlign: "center",
            backgroundColor: "rgba(255,255,255,0.95)",
            border: "2px solid rgba(0,0,0,0.1)",
            borderRadius: "12px",
          }}
        >
          <CardContent>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h4"
                sx={{ color: "black" }}
                gutterBottom
                component={motion.div}
                whileHover={{ scale: 1.1, color: "black" }}
                transition={{ duration: 0.3 }}
              >
                Our Mission
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                At <strong>Shresta</strong>, we aim to make cities cleaner and safer by empowering citizens to directly report issues like garbage or litter to local authorities.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography
                variant="h4"
                sx={{ color: "black" }}
                gutterBottom
                component={motion.div}
                whileHover={{ scale: 1.1, color: "black" }}
                transition={{ duration: 0.3 }}
              >
                How It Works
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                <strong>1. Spot an Issue:</strong> See garbage or any public nuisance on the road? Take a photo.<br /><br />
                <strong>2. Submit a Complaint:</strong> Upload the photo on our website with details.<br /><br />
                <strong>3. OTP Verification:</strong> Verify your identity via OTP.<br /><br />
                <strong>4. Forward to Authorities:</strong> Your complaint is sent to the municipal office.<br /><br />
                <strong>5. Issue Resolved:</strong> Get an SMS confirmation once resolved.
              </Typography>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Button
                variant="contained"
                sx={{ 
                  mt: 2, 
                  px: 3, 
                  py: 1,
                  fontSize: "0.875rem", 
                  borderRadius: "6px", 
                  backgroundColor: "black", // Black button
                  color: "white", // White text
                  transition: "all 0.3s ease-in-out", 
                  boxShadow: "0px 3px 10px rgba(0,0,0,0.2)",
                  "&:hover": {
                    transform: "scale(1.1)",
                    backgroundColor: "black", // White on hover
                    color: "white", // Black text on hover
                    boxShadow: "0px 6px 15px rgba(0,0,0,0.3)",
                  },
                }}
                onClick={() => navigate("/")}
              >
                Get Started
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </Container>
      
      <Box
        component="footer"
        sx={{
          width: "100vw", // Full width
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          py: 2, // Reduced height
          textAlign: "center",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Typography variant="body2">© 2024 Shresta. All Rights Reserved.</Typography>
      </Box>
    </Box>
  );
};

export default AboutUs;