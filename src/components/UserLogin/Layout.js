// Layout.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useUsername } from './UsernameContext'; 
import Navbar from '../Navbar/Navbar';

const Layout = ({ children }) => {
  const location = useLocation();
  const { username } = useUsername(); // Access the username from context

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
    location.pathname === '/SignupForm'||
    location.pathname === '/adminLogin'||
    location.pathname === '/adminForgetpassword';

  console.log('Current Path:', location.pathname);
  console.log('username:', username); 

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <main>{children}</main>
    </>
  );
};

export default Layout;
