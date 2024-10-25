import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import ProfilePicture from './ProfilePicture';
import NameAndEmail from './NameAndEmail';
import PersonalInfo from './PersonalInfo';
import BankDetails from './BankDetails';
import LocationDetails from './LocationDetails';

const ProfileSettings = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    mobileNumber: '',
    DOB: '',
    Aadhaar: '',
    PAN: '',
    city: '',
    state: '',
    country: '',
    accountNumber: '',
    ifsc: '',
    micrCode: '',
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  };

  const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        console.error("Token not found");
      }

  useEffect(() => {
    // API request to get user data
    fetch(`${process.env.REACT_APP_API_URL}/api/v1/user/getUser`,{

    method: 'GET',
        headers: {
          'token': storedToken, // Add the token to the headers
        }
    })
    
      .then(response => response.json()) // Assuming the response is in JSON format
      .then(data => {
        console.log('User data:', data);
        const { city, state, country } = data.user.address; // Destructure address fields
        const { accountNumber, ifsc, micrCode } = data.user.bankDetails; // Destructure bank details
      

        //getting userData from response
        setUserData({
          username: data.user.username,
          email: data.user.email,
          mobileNumber: data.user.mobileNumber,
          DOB: formatDate(data.user.dob), // Format the date here
          Aadhaar: data.user.aadhaar,
          PAN: data.user.pan,
          city,   // Set city
          state,  // Set state
          country, // Set country
          accountNumber, // Set account number
          ifsc,         // Set IFSC
          micrCode,     // Set MICR code
        });



      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []); // Empty dependency array to run only on component mount



  return (
    <div style={{ padding: '20px', minHeight: '100vh', height: 'auto' }}>
      <Row gutter={16} align="middle">
        <Col span={3}><ProfilePicture /></Col>
        <Col xs={24} sm={12} md={8} span={18}><NameAndEmail username={userData.username} email={userData.email} /></Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col xs={24} sm={12} md={8}>
        <PersonalInfo 
            mobileNumber={userData.mobileNumber}
            DOB={userData.DOB}
            Aadhaar={userData.Aadhaar}
            PAN={userData.PAN}
          />
          </Col>
        <Col xs={24} sm={12} md={8}>
        <BankDetails 
            accountNumber={userData.accountNumber}
            ifsc={userData.ifsc}
            micrCode={userData.micrCode}
          />
        </Col>
        <Col xs={24} sm={12} md={8}><LocationDetails 
            city={userData.city}
            state={userData.state}
            country={userData.country}
          /></Col>
      </Row>
    </div>
  );
};

export default ProfileSettings;
