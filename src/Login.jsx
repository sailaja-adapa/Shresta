import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { db2 } from './firebaseRegistrationConfig';
import { getDocs, collection, where, query } from 'firebase/firestore';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Box, Button, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import { motion } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = () => navigate('/forgotpassword');
  const handleRegister = () => navigate('/register');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!password.trim()) {
      toast.error('Password is required', { position: 'top-center' });
      setIsLoading(false);
      return;
    }

    const dbRef = collection(db2, 'Auth');
    try {
      const userQuery = query(dbRef, where('Email', '==', email), where('Password', '==', password));
      const userSnapshot = await getDocs(userQuery);
      if (!userSnapshot.empty) {
        toast.success('Login successful! Redirecting...', { position: 'top-center' });
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        toast.error('Check your Credentials ❌', { position: 'top-center' });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again ⚠️', { position: 'top-center' });
    }
    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: 'url(https://img.freepik.com/premium-vector/abstract-background-blue-light-colour-vector-banner-background-design_8499-2007.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '20px',
        paddingTop: '80px', // <-- Added space below navbar to prevent overlap
      }}
    >
      <motion.div
  initial={{ y: '100vh', opacity: 0 }} // Start from bottom
  animate={{ y: 0, opacity: 1 }} // Move to original position
  transition={{ duration: 1.2, ease: 'easeOut' }} // <-- Increased duration to 1.2s for a slower effect
  style={{ width: '100%', maxWidth: '900px' }}
>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            width: '100%',
            height: '600px',
            border: '2px solid #ced6e0',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'scale(1.02)' },
            backgroundColor: 'white',
            margin: 'auto',
          }}
        >
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

          <Box
            sx={{
              flex: 1,
              p: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 4,
            }}
          >
            <form 
              onSubmit={handleLogin}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} 
            >
              <Typography
                variant="h4"
                sx={{
                  textAlign: 'center',
                  color: '#007bff',
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                  transition: 'color 0.3s ease, transform 0.2s',
                  '&:hover': {
                    color: '#0056b3',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                Welcome Back!
              </Typography>

              <TextField
                label="Email"
                placeholder="Enter Email-id"
                fullWidth
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

              <TextField
                label="Password"
                placeholder="Enter Password"
                fullWidth
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

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  background: 'linear-gradient(90deg, #007bff, #4b86f6)',
                  color: 'white',
                  fontSize: '1.1rem',
                  borderRadius: '5px',
                  transition: 'all 0.3s ease-in-out',
                }}
                disabled={isLoading}
              >
                Login {isLoading && <AiOutlineLoading3Quarters />}
              </Button>

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
      </motion.div>
      <ToastContainer />
    </Box>
  );
};

export default Login;