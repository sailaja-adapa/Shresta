import React, { useState } from 'react';
import './regi.css';
import { db2 } from './firebaseRegistrationConfig';
import { addDoc, collection, where, query, getDocs } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Registration = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [state, setState] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [adhar, setAdhar] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dbref = collection(db2, "Auth");

  const signup = async () => {
    const matchEmail = query(dbref, where('Email', '==', email));
    try {
      const snapshot = await getDocs(matchEmail);
      const emailMatchingArray = snapshot.docs.map((doc) => doc.data());
      if (emailMatchingArray.length > 0) {
        toast.error("This Email Already Exists", {
          position: 'top-center'
        });
      } else {
        await addDoc(dbref, {
          FullName: fullName,
          FirstName: firstName,
          LastName: lastName,
          Username: username,
          Gender: gender,
          State: state,
          PhoneNumber: phoneNumber,
          Email: email,
          AdharNumber: adhar,
          Country: country,
          Password: password,
          ConfirmPassword: confirmPassword
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
    navigate('/login');
  };

  const statesList = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
    'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Jammu and Kashmir'
  ];

  const handleSubmit = (e) => {
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
    } else {
      signup();
    }
  };

  return (
    <div className="registration-container">
      <div className="container-with-image">
        <div className="image-side"></div>
        <div className="form-side">
          <div className="form-wrapper">
            <form className="registration-form" onSubmit={handleSubmit}>
              <h2 className='registration-heading'>Register</h2>
              <div className='form-group'>
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className='form-group'>
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className='form-group'>
                <label>Last Name</label>
                <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                />
              </div>
              
              <div className='form-group'>
                <label>Username</label>
                <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
              </div>

              <div className='form-group'>
                <label>Gender</label>
                <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className='form-group'>
                <label>State</label>
                <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                >
                  <option value="">Select State</option>
                  {statesList.map((stateOption, index) => (
                    <option key={index} value={stateOption}>
                      {stateOption}
                    </option>
                  ))}
                </select>
              </div>

              <div className='form-group'>
                <label>Phone Number</label>
                <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                />
              </div>

              <div className='form-group'>
                <label>Email <span><MdEmail className='icon'/></span> </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className='form-group'>
                <label>Adhar Number</label>
                <input
                  type="text"
                  placeholder="Adhar Number"
                  value={adhar}
                  onChange={(e) => setAdhar(e.target.value)}
                  required
                />
              </div>

              <div className='form-group'>
                <label>Country</label>
                <input
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </div>

              <div className='form-group'>
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

              <div className='form-group'>
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit">Register</button>

              <p>
                Already have an account?{' '}
                <span className="login-link" onClick={handleLogin}>
                  Login
                </span>
              </p>

            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Registration;
