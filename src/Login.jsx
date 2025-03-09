import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import { db2 } from './firebaseRegistrationConfig';
import { getDocs, collection, where, query } from 'firebase/firestore';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Box, Button, Typography, TextField, InputAdornment, IconButton } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = () => {
    navigate('/forgotpassword');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!password.trim()) {
      toast.error('Password is required', {
        position: 'top-center'
      });
      return;
    }
    
    const dbRef = collection(db2, 'Auth');
    try {
      const userQuery = query(dbRef, where('Email', '==', email), where('Password', '==', password));
      const userSnapshot = await getDocs(userQuery);
      if (!userSnapshot.empty) {
        if (email.endsWith('@svecw.edu.in')) {
          toast.success('Login successful! Redirecting to Dashboard 😊🎉', {
            position: 'top-center',
          });
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        } else {
          toast.success('Login successful! 😊🎉', {
            position: 'top-center',
          });
          setTimeout(() => {
            navigate('/WelcomePage');
          }, 2000);
        }
      } else {
        toast.error('Check your Credentials ❌', {
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again ⚠️', {
        position: 'top-center',
      });
    }
    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '120vh',
        backgroundImage: 'url(https://img.freepik.com/premium-vector/abstract-background-blue-light-colour-vector-banner-background-design_8499-2007.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'background-color 0.3s ease',
        '&:hover': { backgroundColor: '#e9ecef' }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '80%',
          maxWidth: '900px',
          height: { xs: 'auto', md: '600px' },
          border: '2px solid #ced6e0',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          transition: 'transform 0.3s ease',
          '&:hover': { transform: 'scale(1.03)' }
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            flex: 1.2,
            overflow: 'hidden',
            height: '100%',
            borderRight: '2px solid #ced6e0'
          }}
        >
          <img
            src="https://media.istockphoto.com/id/1305268276/vector/registration-abstract-concept-vector-illustration.jpg?s=612x612&w=0&k=20&c=nfvUbHjcNDVIPdWkaxGx0z0WZaAEuBK9SyG-aIqg2-0="
            alt="Registration Illustration"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s, filter 0.3s',
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.filter = 'brightness(120%)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.filter = 'none';
            }}
          />
        </Box>

        {/* Form Section */}
        <Box
          sx={{
            flex: 1,
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#fdfdfd',
            boxShadow: '4px 4px 20px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            height: '100%',
            transition: 'background-color 0.3s ease',
            '&:hover': { backgroundColor: '#f1f1f1' }
          }}
        >
          <form onSubmit={handleLogin}>
            <Typography variant="h4" sx={{ textAlign: 'center', color: '#007bff', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
              Welcome Back!
            </Typography>
            {/* Email Input */}
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              placeholder='Enter Email-Id'
              required
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdEmail style={{ color: '#007bff' }} />
                  </InputAdornment>
                ),
              }}
            />
            {/* Password Input */}
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              placeholder='Enter Password'
              required
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RiLockPasswordFill style={{ color: '#007bff' }} />
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
             {/* Login Button */}
             <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                background: 'linear-gradient(90deg, #007bff, #4b86f6)',
                color: 'white',
                padding: '0.75rem',
                fontSize: '1.1rem',
                borderRadius: '5px',
                transition: 'transform 0.2s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                  background: 'linear-gradient(90deg, #0056b3, #006fe6)',
                }
              }}
              disabled={isLoading}
            >
              Login {isLoading && <AiOutlineLoading3Quarters className="loading-animation" />}
            </Button>
             {/* Register & Forgot Password */}
             <Typography textAlign="center" mt={2}>
              Don't have an account?{' '}
              <span style={{ color: 'red', cursor: 'pointer' }} onClick={handleRegister}>
                Register Here
              </span>
            </Typography>
            <Typography textAlign="center" mt={1} sx={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }} onClick={handleForgotPassword}>
              Forgot Password?
            </Typography>
          </form>
        </Box>
      </Box>
      <ToastContainer />
      </Box>
  );
};

export default Login;