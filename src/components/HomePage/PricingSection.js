import React from 'react';
import { Row, Col, Typography } from 'antd';

// Destructure Ant Design components
const { Title, Text, Link } = Typography;

const PricingSection = () => {
  const sectionStyle = {
    padding: '40px 20px',
    backgroundColor: '#fff',
  };

  const highlightStyle = {
    fontSize: '2.5rem',
    color: '#ff0000',
    fontWeight: 'bold',
  };

  const labelStyle = {
    fontSize: '1rem',
    color: '#666',
  };

  const linkStyle = {
    fontSize: '1rem',
    color: '#ff0000',
    display: 'block',
    marginTop: '10px',
  };

  return (
    <div style={sectionStyle}>
      <Row gutter={[24, 24]} justify="center" align="middle">
        {/* Left section: Heading, description, and link */}
        <Col xs={24} sm={24} md={12}>
          <Title level={2} style={{ textAlign: 'left' }}>Unbeatable pricing</Title>
          <Text style={{ display: 'block', textAlign: 'left', marginBottom: '10px' }}>
            We pioneered the concept of discount broking and price transparency in India. 
            Flat fees and no hidden charges.
          </Text>
          <Link href="/pricing" style={linkStyle}>
            See pricing &rarr;
          </Link>
        </Col>

        {/* Right section: Numbers and their descriptions */}
        <Col xs={24} sm={24} md={12}>
          <Row gutter={[24, 24]}>
            <Col span={8}>
              <Text style={highlightStyle}>₹ 0</Text>
              <br />
              <Text style={labelStyle}>Free account opening</Text>
            </Col>
            <Col span={8}>
              <Text style={highlightStyle}>₹ 0</Text>
              <br />
              <Text style={labelStyle}>Free equity delivery and direct mutual funds</Text>
            </Col>
            <Col span={8}>
              <Text style={highlightStyle}>₹ 20</Text>
              <br />
              <Text style={labelStyle}>Intraday and F&O</Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default PricingSection;
