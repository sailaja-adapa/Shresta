import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Contact from './Contact';
import Login from './Login';
import StoreImageTextFirebase from './StoreImageTextFirebase.jsx';
import WelcomePage from './WelcomePage';
import Registration, { AdditionalDetailsPage, GeneralDetailsPage } from './Registration';
import Aboutus from './Aboutus';
import GetCurrentAddress from './GetCurrentAddress.jsx';
import ForgotPassword from './Forpas';
import Setpass from './Setpass';
import Pass from './Pass';
import Pass1 from './Pass1';
import 'react-toastify/dist/ReactToastify.css';
import Thankyou from './Thankyou';
import FeedbackPage from './FeedbackPage';
import Dashboard from './Dashboard';
import Complaints from './Complaints';
import ComplaintsPage from './Complaintspage';
import { toast } from 'react-toastify';
import Navbar from './Navbar';
import NotFound from "./NotFound.js";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Layout Routes */}
        <Route path="/" element={<Layout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/register" element={<Registration />}>
          <Route path='/register' element={<Navigate to={'general'} />} />
          <Route path='general' element={<GeneralDetailsPage />} />
          <Route path='additional-details' element={<AdditionalDetailsPage />} />
        </Route>
        <Route path="/GetCurrentAddress" element={<GetCurrentAddress />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/setpass" element={<Setpass />} />
        <Route path="/pass" element={<Pass />} />
        <Route path="/pass1" element={<Pass1 />} />
        <Route path="/thankyou" element={<Thankyou />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/WelcomePage" element={<WelcomePage />} />
        <Route path="/StoreImageTextFirebase" element={<StoreImageTextFirebase />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/ComplaintsPage" element={<ComplaintsPage />} />
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
