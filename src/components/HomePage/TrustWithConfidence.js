import React from 'react';
import { Row, Col, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const TrustWithConfidence = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '80px auto', padding: '40px' }}>
      <Row gutter={[32, 32]} justify="space-between" align="top">

        {/* Left Column: Text Section */}
        <Col xs={24} md={12}>

          {/* Main Heading */}
          <Title level={2} style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
            Trust with confidence
          </Title>

          {/* Customer-first always */}
          <Title level={4}>Customer-first always</Title>
          <Paragraph>
            That’s why 1.5+ crore customers trust us with ₹4.5+ lakh crores of equity investments and contribute to 15% of daily retail exchange volumes in India.
          </Paragraph>

          {/* No spam or gimmicks */}
          <Title level={4}>No spam or gimmicks</Title>
          <Paragraph>
            No gimmicks, spam, "gamification", or annoying push notifications. High-quality apps that you use at your pace, the way you like.
          </Paragraph>

          {/* The ecosystem */}
          <Title level={4}>The Ecosystem</Title>
          <Paragraph>
            Not just an app, but a whole ecosystem. Our investments in fintech startups offer you tailored services specific to your needs.
          </Paragraph>

        </Col>

        {/* Right Column: Image Section */}
        <Col xs={24} md={12} style={{ textAlign: 'center' }}>
          <img
            src="\HomePage\pic2.webp"
            alt="Trust with confidence"
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </Col>

      </Row>
    </div>
  );
};

export default TrustWithConfidence;
