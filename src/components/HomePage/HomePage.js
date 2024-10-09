import React from 'react';
import { Layout, Row, Col, Button } from 'antd';
import InvestSection from './InvestSection';
import TrustWithConfidence from './TrustWithConfidence';
import PricingSection from './PricingSection.js';
import SignupSection from './SignupSection';
// import Cookies from 'js-cookie';

const { Content } = Layout;

const handleAPI = async () => {
  // try {
  //   const response = await fetch('http://localhost:5000/get-token', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   //  credentials: 'include' // This ensures cookies are sent/received
  //   });
  //   const result = await response.json();
  //   if (response.ok) {
  //     console.log("Cookie received successfully");
  //       // Set the cookie with the name and value from the response
  //       const cookieValue =  Cookies.set('token', result.token, {
  //         expires: 1/24, // Cookie expires in 1 day
  //         secure: true, // Use 'true' if you're using HTTPS
  //         sameSite: 'None', // Necessary for cross-origin cookies
  //     });

  //     console.log(`cookie value by js-cookie: ${cookieValue}`);
  //   } else {
  //     console.log("Error: ", response.statusText);
  //   }
  // } catch (error) {
  //   console.error("Error while hitting the endpoint:", error);
  // }
  

  const response = await fetch('http://localhost:5000/get-token',{
   headers:{
    'auth':"tokeeeeeeeen"
   } 
  });

  console.log(response.ok);
  console.log(response.status);

  const data = await response.json();

  console.log(data);

};

//console.log(`Cookie: ${document.cookie}`);

const HomePage = () => {
  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <Content style={{ maxWidth: '1200px', margin: '80px auto', padding: '40px' }}>
        <Row gutter={[32, 32]} justify="space-between" align="middle">
          
          {/* Left Column: Text Section */}
          <Col xs={24} md={14}>
            
            {/* Muted Text */}
            <p style={{ color: '#7a7a7a', fontSize: '14px', textTransform: 'uppercase', marginBottom: '10px', fontWeight: '500' }}>
              AWARD-WINNING BROKER
            </p>
            
            {/* Main Heading */}
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', margin: '0 0 20px 0', lineHeight: '1.2' }}>
            Elevate Your Trading: Harness Powerful Leverage!
            </h1>

            {/* Subtext */}
            <p style={{ fontSize: '18px', color: '#7a7a7a', marginBottom: '20px' }}>
              Trade on your mobile, tablet or desktop with instant market access and local support from a global broker.
            </p>

            {/* Start Trading Button */}
            <Button 
              type="primary" 
              size="large" 
              style={{ fontWeight: 'bold' }}
            >
              START TRADING
            </Button>
          </Col>
          
          {/* Right Column: Image Section */}
          <Col xs={24} md={10}>
            <img 
              src="\HomePage\pic1.webp" 
              alt="Trading app visual" 
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }} 
            />
          </Col>
        </Row>
        
         <InvestSection />
         <TrustWithConfidence />
         <PricingSection />
         <SignupSection />
       {/* <button onClick={handleAPI}>hit api</button>  */}
      </Content>
    </Layout>
  );
};

export default HomePage;
