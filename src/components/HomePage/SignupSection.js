import React from 'react';
import { Row, Col, Typography, Button } from 'antd';

// Destructure Ant Design components
const { Title, Text, Link } = Typography;

const SignupSection = () => {
  const sectionStyle = {
    padding: '40px 20px',
    textAlign: 'center',
    backgroundColor: '#fff',
  };

  const buttonStyle = {
    marginTop: '20px',
    color: '#fff',
    borderRadius: '5px',
  };

  return (
    <div style={sectionStyle}>
      <Row justify="center" align="middle">
        <Col xs={24} sm={24} md={12}>
          <Title level={3}>Open a demat account</Title>
          <Text style={{ display: 'block', marginBottom: '20px' }}>
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
