import React, { useState } from "react";
import firebase from "./firebase"; // Import firebase initialization
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography 
} from "@mui/material";
import background from "./otp1.jpg"; 

const Pass = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = () => {
    // Retrieve verification ID from local storage
    const verificationId = localStorage.getItem('verificationId');
    if (!verificationId) {
      console.log("Verification ID not found.");
      setError('An error occurred. Please try again.');
      return;
    }

    // Confirm the OTP
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      otp
    );

    firebase.auth().signInWithCredential(credential)
      .then(() => {
        console.log("OTP verification successful");
        navigate('/setpass'); // Navigate to Setpass.jsx
      })
      .catch((error) => {
        console.log("Error verifying OTP:", error);
        setError('Incorrect OTP. Please try again.');
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
        backdropFilter: "blur(5px)",
        padding: 2
      }}
    >
      <Card sx={{ width: 500, padding: 3, boxShadow: 3, borderRadius: 2, backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
            Enter OTP
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            label="Enter OTP"
            value={otp}
            onChange={handleChange}
            error={!!error}
            helperText={error}
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
            color="primary"
            onClick={handleSubmit}
            sx={{
              padding: "10px",
              fontSize: "18px",
              fontWeight: "bold",
              transition: "background-color 0.3s ease, transform 0.2s",
              "&:hover": {
                backgroundColor: "#0056b3",
                transform: "scale(1.05)",
              },
              "&:active": {
                backgroundColor: "#003d7a",
                transform: "scale(0.95)",
              },
            }}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};


export default Pass;