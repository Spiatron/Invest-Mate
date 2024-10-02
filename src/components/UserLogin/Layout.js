// Layout.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEmail } from '../UserLogin/EmailContext'; 
import Navbar from '../Navbar/Navbar';

const Layout = ({ children }) => {
  const location = useLocation();
  const { email } = useEmail(); // Access the email from context

  // Check if the current path should hide the Navbar
  const shouldHideNavbar =
    location.pathname === '/login' || 
    location.pathname === '/forgetpassword' || 
    location.pathname === '/LastStep' ||
    location.pathname === '/UploadDocumentsForm' ||
    location.pathname === '/LinkBankAccount' ||
    location.pathname === '/aadhaar' ||
    location.pathname === '/pan-step' ||
    location.pathname === '/segment-selection' ||
    location.pathname === '/SignupForm';

  // console.log('Current Path:', location.pathname);
  // console.log('Email:', email); 

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <main>{children}</main>
    </>
  );
};

export default Layout;
