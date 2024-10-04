import React from 'react';
import { Layout, Row, Col, Button } from 'antd';
import InvestSection from './InvestSection';
import TrustWithConfidence from './TrustWithConfidence';
import PricingSection from './PricingSection.js';
import SignupSection from './SignupSection';

const { Content } = Layout;

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
              src="your-image-url-here" 
              alt="Trading app visual" 
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }} 
            />
          </Col>
        </Row>
        
         <InvestSection />
         <TrustWithConfidence />
         <PricingSection />
         <SignupSection />
      </Content>
    </Layout>
  );
};

export default HomePage;
