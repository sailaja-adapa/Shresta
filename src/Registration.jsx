import React, { useState } from 'react';
import { db2 } from './firebaseRegistrationConfig';
import { addDoc, collection, where, query, getDocs } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Box, Paper, TextField, Button, Typography, FormControl, IconButton, InputAdornment, Container } from "@mui/material";
import { Select, MenuItem, InputLabel, Grid } from "@mui/material";
import image from '../src/register.jpg';

const Registration = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url(" + image + ")",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        fontFamily: "'Roboto', sans-serif",
        padding: "2rem",
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            borderRadius: "12px",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            backgroundColor: "#fff",
            maxWidth: "1200px",
            width: "100%",
            marginTop: "4rem",
          }}
        >
          {/* Image Side */}
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5em",
              padding: { xs: "1rem", md: "2rem" },
            }}
          >
            <img
              src="https://static.vecteezy.com/system/resources/previews/003/689/228/non_2x/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg"
              alt="Registration"
              style={{ width: "800px", maxWidth: "100%" }}
            />
          </Box>

          {/* Form Side */}
          <Box
            sx={{
              flex: 1,
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Outlet />
          </Box>
        </Paper>
      </Container>
      <ToastContainer />
    </Box>
  );
};

export const GeneralDetailsPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleContinue = (e) => {
    e.preventDefault();

    // Simple email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address!', {
        position: 'top-center'
      });
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!', {
        position: 'top-center'
      });
      return;
    }
    const details = {
      FirstName: firstName, LastName: lastName, FullName: `${firstName} ${lastName}`, Username: username, Email: email, Password: password, ConfirmPassword: confirmPassword
    }

    navigate(`/register/additional-details?data=${encodeURI(JSON.stringify(details))}`);
  }
  return (
    <Box
      sx={{
        background: "rgba(255, 255, 255, 0.95)",
        padding: "0.8rem",
        maxWidth: "100%",
        borderRadius: "12px",
        backdropFilter: "blur(8px)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        animation: "fadeAnim 0.5s 1",
        "@keyframes fadeAnim": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          padding: "1rem",
        }}
      >
        <Typography variant="h4" sx={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 600, color: "#333", textAlign: "center", marginBottom: "1.5rem" }}>
          Register
        </Typography>

        {/* Name Fields */}
        <Box sx={{ display: "flex", gap: "0.5em", alignItems: "center" }}>
          <TextField fullWidth variant="outlined" label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          <TextField fullWidth variant="outlined" label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </Box>

        {/* Username */}
        <TextField fullWidth variant="outlined" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required sx={{ marginTop: "1rem" }} />

        {/* Email with Icon */}
        <TextField
          fullWidth
          type="email"
          variant="outlined"
          label="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ marginTop: "1rem" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdEmail style={{ color: "#007bff", fontSize: "1.5rem" }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Password with Lock Icon */}
        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          variant="outlined"
          label="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={{ marginTop: "1rem" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RiLockPasswordFill style={{ color: "#007bff", fontSize: "1.5rem" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Confirm Password with Lock Icon */}
        <TextField
          fullWidth
          type="password"
          variant="outlined"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          sx={{ marginTop: "1rem" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RiLockPasswordFill style={{ color: "#007bff", fontSize: "1.5rem" }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            padding: "0.75rem",
            fontSize: "1.1rem",
            borderRadius: "8px",
            marginTop: "1.5rem",
            transition: "filter 0.3s ease",
            "&:hover": { filter: "brightness(0.9)" },
          }}
          onClick={handleContinue}
        >
          Continue
        </Button>

        {/* Login Redirect */}
        <Typography sx={{ textAlign: "center", fontSize: "0.95rem", color: "#555", marginTop: "1rem" }}>
          Already have an account?{" "}
          <Typography component="span" sx={{ color: "#007bff", fontWeight: 600, cursor: "pointer", "&:hover": { color: "#0056b3", textDecoration: "underline" } }}>
            Login
          </Typography>
        </Typography>
      </Paper>
    </Box>
  );
};

export const AdditionalDetailsPage = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState('');
  const [state, setState] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [adhar, setAdhar] = useState('');
  const [country, setCountry] = useState('');

  // get previously filled data
  const [queries] = useSearchParams();
  const data = JSON.parse(decodeURI(queries.get("data")));

  const statesList = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
    'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Jammu and Kashmir'
  ];

  const dbref = collection(db2, "Auth");
  const signup = async () => {
    if (!data) return;
    const matchEmail = query(dbref, where('Email', '==', data?.Email));
    try {
      const snapshot = await getDocs(matchEmail);
      const emailMatchingArray = snapshot.docs.map((doc) => doc.data());
      if (emailMatchingArray.length > 0) {
        toast.error("This Email Already Exists", {
          position: 'top-center'
        });
      } else {
        await addDoc(dbref, {
          ...data,
          Gender: gender,
          State: state,
          PhoneNumber: phoneNumber,
          AdharNumber: adhar,
          Country: country,
        });
        toast.success('Registration Successful! 😊', {
          position: 'top-center'
        });
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      toast.error('Registration Failed', {
        position: 'top-center'
      });
    }
  };

  const handleLogin = () => {
    signup();
    navigate('/login');
  };

  return (
    <Box
      sx={{
        background: "rgba(255, 255, 255, 0.95)",
        padding: "1.5rem",
        maxWidth: "100%",
        borderRadius: "12px",
        backdropFilter: "blur(8px)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        animation: "fadeAnim 0.5s 1",
        "@keyframes fadeAnim": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      }}
    >
      <Paper elevation={3} sx={{ width: "100%", padding: "1.5rem" }}>
        <Typography variant="h4" sx={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 600, color: "#333", textAlign: "center", marginBottom: "1.5rem" }}>
          Fill Your Details
        </Typography>

        {/* Phone Number */}
        <TextField
          fullWidth
          label="Enter your Phone number"
          variant="outlined"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          sx={{ marginBottom: "1rem" }}
        />

        {/* Adhar Number */}
        <TextField
          fullWidth
          label="Aadhar Number"
          variant="outlined"
          value={adhar}
          onChange={(e) => setAdhar(e.target.value)}
          required
          sx={{ marginBottom: "1rem" }}
        />

        {/* Gender Select */}
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: "1rem" }}>
          <InputLabel>Select Gender</InputLabel>
          <Select value={gender} onChange={(e) => setGender(e.target.value)} required label="Select Gender">
            <MenuItem value="">Select Gender</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>

        {/* State & Country Fields */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Select State</InputLabel>
              <Select value={state} onChange={(e) => setState(e.target.value)} required label="Select State">
                {statesList.map((stateOption, index) => (
                  <MenuItem key={index} value={stateOption}>
                    {stateOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Country" variant="outlined" value={country} onChange={(e) => setCountry(e.target.value)} required />
          </Grid>
        </Grid>

        {/* Buttons */}
        <Grid container spacing={2} sx={{ marginTop: "1.5rem" }}>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#ccc",
                color: "black",
                "&:hover": { backgroundColor: "#aaa" },
              }}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
              Register
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Registration;
