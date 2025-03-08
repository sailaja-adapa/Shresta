import React from "react";
import { Container, Typography, Card, CardContent, Button, Box } from "@mui/material";

const AboutUs = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh", // Ensures full-page height
        display: "flex",
        flexDirection: "column", // Stack elements vertically
        alignItems: "center",
        justifyContent: "space-between", // Push footer down when possible
        backgroundImage:
          "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqAnxipM-jtSCHybZ385llk_mrsrAtKazexw&s')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        p: 3,
        position: "relative", // Ensures footer stays at the bottom
      }}
    >
      {/* Main Content - Added mb: 10 to increase gap */}
      <Container
        maxWidth="sm"
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 10, // Push content below navbar
          mb: 14, // Increased space between container and footer
        }}
      >
        <Card
          sx={{
            p: 4,
            boxShadow: 8,
            textAlign: "center",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.03)",
              boxShadow: 12,
            },
          }}
        >
          <CardContent>
            <Typography variant="h4" color="primary" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              At <strong>Shresta</strong>, we aim to make cities cleaner and safer by empowering citizens to directly report issues like garbage or litter to local authorities.
            </Typography>

            <Typography variant="h4" color="primary" gutterBottom>
              How It Works
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              <strong>1. Spot an Issue:</strong> See garbage or any public nuisance on the road? Take a photo of the problem.<br /><br />
              <strong>2. Submit a Complaint:</strong> Upload the photo on our website along with a short description and location details.<br /><br />
              <strong>3. OTP Verification:</strong> Verify your identity with an OTP sent to your mobile number.<br /><br />
              <strong>4. Forward to Authorities:</strong> Your complaint is sent directly to the municipal office for action.<br /><br />
              <strong>5. Issue Resolved:</strong> Once resolved, you'll receive an SMS notification confirming that your complaint has been addressed.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                transition: "transform 0.3s ease, backgroundColor: 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  backgroundColor: "#1565c0",
                },
              }}
            >
              Get Started
            </Button>
          </CardContent>  
        </Card>
      </Container>

      {/* Full-Width Footer - Stays at Bottom */}
      <Box
        component="footer"
        sx={{
          width: "100vw", // Ensures full width
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Matches given opacity
          color: "white",
          py: 4,
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute", // Keeps footer at the bottom
          bottom: 0, // Forces it to always touch the bottom
          left: 0, // Ensures it starts from the left end
        }}
      >
        <Typography variant="body2">© 2024 Shresta. All Rights Reserved.</Typography>
      </Box>
    </Box>
  );
};

export default AboutUs;