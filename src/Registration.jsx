import React, { useState } from 'react';
import './regi.css';
import { db2 } from './firebaseRegistrationConfig';
import { addDoc, collection, where, query, getDocs } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Registration = () => {

  return (
    <div className="registration-container">
      <div className="container-with-image">
        <div className='image-box'>
          <img src="https://static.vecteezy.com/system/resources/previews/003/689/228/non_2x/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg" className="image-side" />
        </div>
        <div className="form-side">
          <Outlet />
        </div>
      </div>
      <ToastContainer />
    </div>
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
    <div className="form-wrapper">
      <form className="registration-form" onSubmit={handleContinue}>
        <h2 className='registration-heading'>Register</h2>

        <div className='d-inline'>
          <div className='form-group'>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className='form-group'>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className='form-group'>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='form-group'>
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className='registration-button mb-2 d-inline' style={{ width: "100%" }} onClick={handleContinue}>
          <span>Continue</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} fill="currentColor"><path d="M15.6315 12L10.8838 3.03212L9.11622 3.9679L13.3685 12L9.11622 20.0321L10.8838 20.9679L15.6315 12Z"></path></svg>
        </button>
        <p className='text-center'>
          Already have an account?{' '}
          <span className="login-link">
            Login
          </span>
        </p>
      </form>
    </div>
  )
}

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
    <div className="form-wrapper">
      <form className="registration-form">
        <h2 className='registration-heading'>Fill your details</h2>
        <div className='form-group'>
          <input
            type="number"
            placeholder="Enter your Phone number"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <input
            type="text"
            placeholder="Adhar Number"
            value={adhar}
            onChange={(e) => setAdhar(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
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

        <div className='d-inline'>
          <div className='form-group'>
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
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
        </div>

        <div className='d-inline mt-4'>
          <button type="submit" className='registration-button back-btn' style={{ width: "100%" }} onClick={() => navigate(-1)}>Back</button>
          <button type="submit" className='registration-button' style={{ width: "100%" }} onClick={handleLogin}>Register</button>
        </div>
      </form>
    </div>
  )
}

export default Registration;
