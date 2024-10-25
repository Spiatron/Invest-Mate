import React from 'react';
import { Row, Col, Divider, } from 'antd';
import TradingOptionsSection from './TradingOptionsSection';
import ContentSection from './ContentSection';

const About = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px', minHeight: '100vh' }}>

      {/* Heading Section */}
      <Row justify="center" style={{ textAlign: 'center', marginTop: '50px' }}>
        <Col span={24}>
          <h1 style={{ fontSize: '34px', fontWeight: '500' }}>
            We revolutionized the discount brokerage model in India.
            <br />
            Now, we're leading the way with innovative technology.
          </h1>
        </Col>
      </Row>

      {/* Closing Line */}
      <Row justify="center" style={{ textAlign: 'center' }}>
        <Col span={24}>
          <p style={{ fontSize: '18px', fontStyle: 'italic' }}>
            Join us as we continue to lead innovation in the financial industry.
          </p>
        </Col>
      </Row>


      <Divider />
      <ContentSection />
      <Divider />
      <TradingOptionsSection />
      <Divider />
      
    </div>
  );
};

export default About;
