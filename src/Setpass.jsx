import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications
import background from './reset.jpg';
import { RiLockPasswordFill } from "react-icons/ri";
import { Box, Button, TextField, Typography } from '@mui/material';

const SetPass = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const handleUpdatePassword = () => {
    if (newPassword === confirmPassword) {
      // Password update logic goes here
      // For now, let's just set the passwordUpdated state to true immediately
      setPasswordUpdated(true);
      toast.success('Password Updated Successfully!', {
        position: 'top-center',
        autoClose: 3000, // Close toast after 3 seconds
      });
      setTimeout(() => {
        navigate('/login'); // Redirect to login page after password update
      }, 3000); // Wait 3 seconds before redirecting to allow the toast message to be visible
    } else {
      toast.error('Passwords do not match.', {
        position: 'top-center',
        autoClose: 3000, // Close toast after 3 seconds
      });
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
        '::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <Box
        sx={{
          width: { xs: '95%', sm: '90%', md: '400px' },
          padding: { xs: '15px', sm: '20px', md: '25px' },
          borderRadius: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography variant="h5" sx={{ textAlign: 'center', color: '#333', fontSize: '1.5rem', mb: 2, position: 'relative' }}>
          Set New Password
          <RiLockPasswordFill style={{ position: 'absolute', top: '3px', right: '45px' }} />
        </Typography>

        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, color: 'black !important' }}>
          <TextField
            type="password"
            label="Enter New Password"
            variant="outlined"
            InputProps={{
              sx: {
                color: "black !important",
                height: "50px",
              },
            }}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            required
          />
          <TextField
            type="password"
            label="Confirm New Password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            required
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '12px',
              fontSize: '1rem',
              '&:hover': { backgroundColor: '#0056b3' },
            }}
            onClick={handleUpdatePassword}
          >
            Update Password
          </Button>
        </Box>

        {passwordUpdated && (
          <Typography sx={{ textAlign: 'center', mt: 2, color: 'green', fontWeight: 'bold' }}>
            Password updated successfully!
          </Typography>
        )}
      </Box>

      <ToastContainer />
    </Box>
  );
};

export default SetPass;