
import React, { useState } from 'react';
import { db2 } from './firebaseRegistrationConfig';
import { addDoc, collection } from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';
import { FaPhone, FaMapLocation } from "react-icons/fa6";
import { TbGenderBigender } from "react-icons/tb";
import { Box, Paper, TextField, Button, Typography, IconButton, InputAdornment, Container, Select, MenuItem } from "@mui/material";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import image from '../src/register.jpg';

// Registration Wrapper
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

export default Registration;

// -------------------------------------------
// Page 1: GeneralDetailsPage
// -------------------------------------------
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

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email format");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const details = {
      FirstName: firstName,
      LastName: lastName,
      FullName: `${firstName} ${lastName}`,
      Username: username,
      Email: email,
      Password: password,
    };

    navigate(`/register/additional-details?data=${encodeURIComponent(JSON.stringify(details))}`);
  };

  return (
    <Box
      sx={{
        background: "rgba(255, 255, 255, 0.95)",
        padding: "0.8rem",
        borderRadius: "12px",
        animation: "fadeAnim 0.5s 1",
      }}
    >
      <Paper elevation={3} sx={{ width: "100%", padding: "1rem" }}>
        <Typography variant="h4" sx={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Register
        </Typography>

        <Box sx={{ display: "flex", gap: "0.5em" }}>
          <TextField fullWidth label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          <TextField fullWidth label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </Box>

        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ marginTop: "1rem" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaUser />
              </InputAdornment>
            )
          }}
        />

        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginTop: "1rem" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdEmail />
              </InputAdornment>
            )
          }}
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginTop: "1rem" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RiLockPasswordFill />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ marginTop: "1rem" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RiLockPasswordFill />
              </InputAdornment>
            )
          }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ marginTop: "1.5rem" }}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </Paper>
    </Box>
  );
};

// -------------------------------------------
// Page 2: AdditionalDetailsPage
// -------------------------------------------
export const AdditionalDetailsPage = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState('');
  const [state, setState] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [adhar, setAdhar] = useState('');
  const [country, setCountry] = useState('');

  const [queries] = useSearchParams();
  const data = JSON.parse(decodeURIComponent(queries.get("data")));

  const handleSubmit = async () => {
    if (!phoneNumber || !adhar || !gender || !state || !country) {
      toast.error("Please fill all fields");
      return;
    }

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(data.Password, saltRounds);

    const userObj = {
      FirstName: data.FirstName,
      LastName: data.LastName,
      FullName: data.FullName,
      Username: data.Username,
      Email: data.Email,
      Password: hashedPassword,
      PhoneNumber: phoneNumber,
      Adhar: adhar,
      Gender: gender,
      State: state,
      Country: country,
      Timestamp: new Date()
    };

    try {
      const dbRef = collection(db2, "Auth");
      await addDoc(dbRef, userObj);
      toast.success("Registered Successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed. Try again.");
      console.error("Error adding user:", error);
    }
  };

  return (
    <Box sx={{ padding: "1rem", background: "white", borderRadius: "10px" }}>
      <Typography variant="h5" sx={{ marginBottom: "1rem" }}>Additional Details</Typography>

      <TextField label="Phone Number" fullWidth value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} sx={{ mb: 2 }} />
      <TextField label="Adhar Number" fullWidth value={adhar} onChange={(e) => setAdhar(e.target.value)} sx={{ mb: 2 }} />

      <Select fullWidth value={gender} onChange={(e) => setGender(e.target.value)} displayEmpty sx={{ mb: 2 }}>
        <MenuItem value="" disabled>Select Gender</MenuItem>
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </Select>

      <Select fullWidth value={state} onChange={(e) => setState(e.target.value)} displayEmpty sx={{ mb: 2 }}>
        <MenuItem value="" disabled>Select State</MenuItem>
        {[
          'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
          'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
          'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
          'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
          'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Jammu and Kashmir'
        ].map((st, idx) => (
          <MenuItem key={idx} value={st}>{st}</MenuItem>
        ))}
      </Select>

      <TextField label="Country" fullWidth value={country} onChange={(e) => setCountry(e.target.value)} sx={{ mb: 2 }} />

      <Button variant="contained" fullWidth onClick={handleSubmit}>Register</Button>
    </Box>
  );
};
