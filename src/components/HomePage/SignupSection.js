import React from 'react';
import { Row, Col, Typography, Button } from 'antd';

// Destructure Ant Design components
const { Title, Text, Link } = Typography;

const SignupSection = () => {
  const sectionStyle = {
    backgroundColor: '#1C1C1C', // Dark background
    padding: '20px 0', // Padding for space around the content
    textAlign: 'center',
    borderRadius: '30px', // Rounded corners for a softer look
    margin: '50px 0',
  };

  const buttonStyle = {
    marginTop: '10px',
    color: '#fff',
    borderRadius: '5px',
  };

  return (
    <div style={sectionStyle}>
      <Row justify="center" align="middle">
        <Col xs={24} sm={24} md={12}>
          <Title level={3} style={{fontSize: '32px', fontWeight: 700, color:"#fff"}}>Open a demat account</Title>
          <Text style={{ fontSize: '20px',display: 'block', marginBottom: '20px', color:"#fff" }}>
            Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.
          </Text>
          <Link href="/SignupForm">
          <Button type="primary" size="large" style={buttonStyle}>
            Sign up for free
          </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default SignupSection;
