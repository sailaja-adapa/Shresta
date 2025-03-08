import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import './login.css';
import { db2 } from './firebaseRegistrationConfig';
import { getDocs, collection, where, query } from 'firebase/firestore';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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
    <div className="login-container">
      <div className="login-box-wrapper">
        <div className="login-box">
          {/* Image Section */}
          <div className="image-section">
            <img
              src="https://media.istockphoto.com/id/1305268276/vector/registration-abstract-concept-vector-illustration.jpg?s=612x612&w=0&k=20&c=nfvUbHjcNDVIPdWkaxGx0z0WZaAEuBK9SyG-aIqg2-0="
              alt="Registration Illustration"
            />
          </div>

          {/* Form Section */}
          <div className="form-section">
            <form className="login-form" onSubmit={handleLogin}>
              <h2 className="welcome-heading">Welcome Back!</h2>
              {/* Email Input */}
              <div className="form-group">
                <label>Email <span><MdEmail className='icon'/></span> </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Input */}
              <div className="form-group">
                <label>Password <span><RiLockPasswordFill className='icon'/></span></label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? 'text' : 'password'} // Toggle input type
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* Eye icon for showing/hiding password */}
                  <div
                    className="eye-icon"
                    onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </div>

              {/* Login Button */}
              <button type="submit" className="login-button" disabled={isLoading}>
                Login {isLoading && <AiOutlineLoading3Quarters className="loading-animation" />}
              </button>

              {/* Register and Forgot Password Links */}
              <div className="login-options">
                Don't have an account?{' '}
                <span onClick={handleRegister} className="register-link">
                  Register Here
                </span>
                <p className="forgot-password" onClick={handleForgotPassword}>
                  Forgot Password?
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
