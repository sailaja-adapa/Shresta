import React, { useState } from "react";
import firebase from "./firebase"; // Import Firebase initialization
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { 
  Box, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Grid 
} from "@mui/material";
import background from "./forgot.jpg";
import image from "./forpas.jpg";

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else if (e.target.name === 'phone') {
      setPhone(e.target.value);
    }
  };

  const handleSendOtp = () => {
    if (!username.trim()) {
      toast.error('Username is required', {
        position: 'top-center'
      })
      return
    }

    const trimmedPhone = phone.trim();
    
    if (!/^\d{10}$/.test(trimmedPhone)) {
      toast.error('Enter a valid phone number')
      return
    }

    const phoneNumber = `+91${trimmedPhone}`;
    const appVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        console.log("Recaptcha verified");
      },
      'expired-callback': () => {
        console.log("Recaptcha expired");
      }
    });

    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // Store verification ID locally
        localStorage.setItem('verificationId', confirmationResult.verificationId);
        toast.success("OTP has been sent");
        navigate('/pass'); // Navigate to Pass.jsx
      })
      .catch((error) => {
        toast.error("Error Sending OTP");
        console.log("Error sending OTP:", error);
      });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: 2,
      }}
    >
      <Card
        sx={{
          width: { xs: "95%", sm: "85%", md: "1080px" },
          height: { xs: "auto", md: "500px" }, // Maintained proper height
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Adjust layout for responsiveness
        }}
      >
        {/* Left Side - Image */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flex: 1,
            height: { xs: "20vh", md: "100%" }, // Decreased height for small screens
          }}
        >
          <img
            src={image}
            alt="Forgot Password"
            style={{
              width: "60vw",
              margin: "auto",
              height: { xs: "100%", md: "80%" },
              objectFit: "cover",
              borderRadius: { xs: "12px 12px 0 0", md: "0 0 0 0" },
            }}
          />
        </Grid>

        {/* Right Side - Form */}
        <Grid item xs={12} md={6} sx={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center" }}>
          <CardContent sx={{ width: "100%", padding: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, textAlign: "center", color: "#0051ff", fontSize: "2rem" }}>
              Forgot Password
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, textAlign: "center", color: "#333", fontWeight: "bold" }}>
              Please enter your details to reset your password.
            </Typography>

            <TextField
              fullWidth
              variant="outlined"
              label="Username"
              name="username"
              value={username}
              onChange={handleChange}
              InputProps={{
                sx: {
                  color: "black !important", // ✅ Ensures text inside input is black
                  backgroundColor: "white", // ✅ White background
                  border: "none !important",
                  fontSize: "1.2rem", // ✅ Bigger text
                  height: "50px", // ✅ Ensures correct height
                  display: "flex",
                  alignItems: "center", // ✅ Centers text vertically
                },
              }}
              sx={{
                marginBottom: "20px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { border: "2px solid #007bff" }, // ✅ Custom border
                  "&:hover fieldset": { border: "2px solid #0056b3" },
                  "&.Mui-focused fieldset": { border: "2px solid #0056b3" },
                  height: "50px", // ✅ Make input height match
                },
                "& .MuiInputBase-input": {
                  paddingTop: "1.5rem", // ✅ Adjusts vertical alignment
                  fontSize: "1.5rem", // ✅ Ensures large text
                  color: "black !important", // ✅ Ensures text remains black
                  border: "none !important",
                },
              }}
            />

            <TextField
              fullWidth
              variant="outlined"
              label="Phone Number"
              name="phone"
              value={phone}
              onChange={handleChange}
              InputProps={{
                sx: {
                  color: "black !important", // ✅ Ensures text inside input is black
                  backgroundColor: "white", // ✅ White background
                  border: "none !important",
                  fontSize: "1.2rem", // ✅ Bigger text
                  height: "50px", // ✅ Ensures correct height
                  display: "flex",
                  alignItems: "center", // ✅ Centers text vertically
                },
              }}
              sx={{
                marginBottom: "20px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { border: "2px solid #007bff" }, // ✅ Custom border
                  "&:hover fieldset": { border: "2px solid #0056b3" },
                  "&.Mui-focused fieldset": { border: "2px solid #0056b3" },
                  height: "50px", // ✅ Make input height match
                },
                "& .MuiInputBase-input": {
                  paddingTop: "1.5rem", // ✅ Adjusts vertical alignment
                  fontSize: "1.5rem", // ✅ Ensures large text
                  color: "black !important", // ✅ Ensures text remains black
                  border: "none !important",
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#ff4b2b",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
                padding: "10px",
                transition: "background 0.3s ease-in-out, transform 0.2s",
                "&:hover": {
                  backgroundColor: "#ff3a1b",
                  transform: "scale(1.05)",
                },
              }}
              onClick={handleSendOtp}
            >
              Send OTP
            </Button>
          </CardContent>
        </Grid>
      </Card>

      <div id="sign-in-button"></div> {/* RecaptchaVerifier container */}
      <ToastContainer position="top-center" />
    </Box>
  );
};

export default ForgotPassword;