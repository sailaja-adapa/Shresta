import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetCurrentAddress from './GetCurrentAddress';
import { FaHome } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { 
  Box, Typography, TextField, Select, MenuItem, Checkbox, Button, FormControlLabel, CircularProgress 
} from '@mui/material';
import { convertLength } from '@mui/material/styles/cssUtils';


const WelcomeComponent = () => {
  const [wardNo, setWardNo] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [isAddressManuallyEdited, setIsAddressManuallyEdited] = useState(false);
  const [phonenumber, setPhonenumber] = useState('');
  const [isNotARobot, setIsNotARobot] = useState(false);
  const [loadingOTP, setLoadingOTP] = useState(false);
  const [isAddressFetched, setIsAddressFetched] = useState(false); // Flag to track if address is fetched
  const [fetchAddressNow, setFetchAddressNow] = useState(false); // State to trigger fetching address
  const navigate = useNavigate();
  // Function to handle the click of the home icon and trigger fetching the address
  const handleHomeClick = () => {
    setIsAddressFetched(false);  // Reset isAddressFetched before triggering address fetch
    setFetchAddressNow(true);    // Trigger address fetching when home icon is clicked
    setIsAddressManuallyEdited(false);
  };

  const handleAddressFetched = (fetchedAddress) => {
    if (!isAddressManuallyEdited) { // Only update if user hasn't manually edited
      setAddress(fetchedAddress);
    }
    const addressParts = fetchedAddress.split(',');
    if (addressParts.length >= 4) {
      setWardNo(addressParts[1]?.trim() || '');
      setSelectedLocation(addressParts[2]?.trim() || addressParts[3]?.trim() || '');
      setPincode(addressParts[5]?.trim() || '');
      setState(addressParts[4]?.trim() || '');
      setIsAddressFetched(true); // Set flag to true once the address is fetched
      setFetchAddressNow(false); // Reset fetchAddressNow to prevent re-fetching
    }
  };

  const handleWardNoChange = (e) => setWardNo(e.target.value);
  const handleLocationChange = (e) => setSelectedLocation(e.target.value);
  const handlePincodeChange = (e) => setPincode(e.target.value);
  const handlePhonenumberChange = (e) => setPhonenumber(e.target.value);
  const handleStateChange = (e) => setState(e.target.value);
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    setIsAddressManuallyEdited(true);
  };
  const handleCheckboxChange = () => setIsNotARobot(!isNotARobot);

  const generateOTP = () => Math.floor(100000 + Math.random() * 900000);
  const handleNextClick = async () => {
    // Check if all required fields are filled
    if (
      !wardNo ||
      !selectedLocation ||
      !pincode ||
      !state ||
      !address ||
      !phonenumber ||
      !isNotARobot
    ) {
      toast.error("Please fill in all required fields before proceeding.");
      return;
    }
  
    // Check if the phone number is verified
    const storedOTP = localStorage.getItem('otp');
    if (!storedOTP) {
      toast.error("Phone number not verified. Please verify before proceeding.");
      return;
    }
  
    const phoneNumber = `+91${phonenumber}`;
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate OTP
    setLoadingOTP(true);
    localStorage.setItem('otp', otp); // Store OTP for verification
  
    try {
      const response = await fetch('https://shresta-1.onrender.com/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: phoneNumber,
          body: `Your OTP code is: ${otp}`,
        }),
      });
  
      const data = await response.json();
      if (data.success) {
        toast.success("OTP sent successfully!");
        navigate('/Pass1'); // Navigate only after successful OTP verification
      } else {
        toast.error("Phone Number is not verified.Contact Admin.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setLoadingOTP(false);
    }
  };
  
  const statesList = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
    'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Jammu and Kashmir'
  ];
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(https://static.vecteezy.com/system/resources/thumbnails/025/055/170/large/smartphone-app-map-with-location-icon-and-route-web-animation-of-navigation-in-a-big-city-app-screen-of-traveling-city-map-background-localization-gps-travel-and-navigation-concept-video.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#100201',
      }}
    >
      <ToastContainer />
      <Box
        sx={{
          backgroundColor: 'rgba(30, 163, 245, 0.8)',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '500px',
          boxSizing: 'border-box',
          mt: 5,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to Shreshta
        </Typography>
        <GetCurrentAddress fetchAddressNow={fetchAddressNow} onAddressFetched={handleAddressFetched} />
        <TextField
          label="Ward No (Optional)"
          variant="outlined"
          fullWidth
          value={wardNo}
          InputProps={{
            sx: {
              color: "black !important",
              height: "50px",
            },
          }}
          InputLabelProps={{
            sx: { color: "black !important" }, // Ensures label is fully black
          }}
          onChange={(e) => setWardNo(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Location"
          variant="outlined"
          fullWidth
          value={selectedLocation}
          InputProps={{
            sx: {
              color: "black !important",
              height: "50px",
            },
          }}
          InputLabelProps={{
            sx: { color: "black !important" }, // Ensures label is fully black
          }}
          onChange={(e) => setSelectedLocation(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Pincode"
          variant="outlined"
          fullWidth
          InputProps={{
            sx: {
              color: "black !important",
              height: "50px",
            },
          }}
          InputLabelProps={{
            sx: { color: "black !important" }, // Ensures label is fully black
          }}
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Select
          value={ state }
          onChange={(e) => setState(e.target.value)}
          displayEmpty
          fullWidth
          sx={{
            mb: 2,
            '& .MuiSelect-select': {
              color: 'black !important' // Black for selected, gray for placeholder
            },
          }}
        >
          <MenuItem value="" disabled>Select State</MenuItem> {/* Acts as the placeholder */}
          {statesList.map((stateOption, index) => (
            <MenuItem key={index} value={stateOption}>{stateOption}</MenuItem>
          ))}
        </Select>

        <Box sx={{ position: 'relative', mb: 2 }}>
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          InputProps={{ sx: { color: "black !important" } }}
          InputLabelProps={{ sx: { color: "black !important" } }}
          value={address}
          onChange={handleAddressChange} // Now tracks manual input
          sx={{ mb: 2 }}
        />
        <FaMapMarkerAlt
          size={30}
          style={{
            position: 'absolute',
            right: '10px',
            bottom: '20px',
            cursor: 'pointer',
            color: 'red',
          }}
          onClick={handleHomeClick}
        />
        </Box>

        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          InputProps={{
            sx: {
              color: "black !important",
              height: "50px",
            },
          }}
          InputLabelProps={{
            sx: { color: "black !important" }, // Ensures label is fully black
          }}
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={
            <Checkbox checked={isNotARobot} onChange={() => setIsNotARobot(!isNotARobot)} />
          }
          label="I am not a robot"
        />
        <Button
          variant="contained"
          fullWidth
          color="success"
          onClick={handleNextClick}
          disabled={loadingOTP}
          sx={{ mt: 2 }}
        >
          {loadingOTP ? <CircularProgress size={24} /> : 'Next'}
        </Button>
      </Box>
    </Box>
  );
};
export default WelcomeComponent;