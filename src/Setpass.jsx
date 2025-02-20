import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications
import './setpass.css'; // Assuming you have a CSS file for styling
import background from './reset.jpg';
import { RiLockPasswordFill } from "react-icons/ri";

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
    <div className="setpass-container" style={{ backgroundImage: `url(${background})` }}>
      <div className="centered-box">
        <h2>Set New Password<span><RiLockPasswordFill className='icon'/></span></h2>
        <div className="setpass-form">
          <input 
            type="password" 
            placeholder="Enter New Password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Confirm New Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
          <button type="button" onClick={handleUpdatePassword}>Update Password</button>
        </div>
        {passwordUpdated && (
          <div className="success-message">
            Password updated successfully!
          </div>
        )}
      </div>
      <ToastContainer /> {/* Include ToastContainer to display toast notifications */}
    </div>
  );
};

export default SetPass;
