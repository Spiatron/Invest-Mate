import React from 'react';
import { Button, Typography } from 'antd';

const { Link } = Typography;

const InvestSection = () => {
  return (
    <div style={{
      backgroundColor: '#1C1C1C', // Dark background
      padding: '20px 0', // Padding for space around the content
      textAlign: 'center',
      borderRadius: '30px', // Rounded corners for a softer look
      margin: '50px 0',
      color: '#fff' // White text for contrast
    }}>
      {/* Heading */}
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>
        Invest in everything
      </h1>
      
      {/* Subtext */}
      <p style={{ fontSize: '18px', color: '#b0b0b0', marginBottom: '30px' }}>
        Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.
      </p>

      {/* Sign-up Button */}
      <Link href="/SignupForm">
        <Button 
          type="primary" 
          size="large"
          style={{
            fontWeight: 'bold',
            borderRadius: '5px', // Soft rounded edges for the button
            color: '#fff' // White text for readability
          }}
        >
          Sign up for free
        </Button>
      </Link>
    </div>
  );
};

export default InvestSection;
