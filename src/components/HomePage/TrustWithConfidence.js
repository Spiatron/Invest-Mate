import React from 'react';
import { Row, Col, Typography, Image } from 'antd';

const { Title, Paragraph } = Typography;

const TrustWithConfidence = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '80px auto', padding: '40px', borderRadius: '12px' }}>
      <Row gutter={[32, 48]} justify="space-between" align="middle">

        {/* Left Column: Text Section */}
        <Col xs={24} md={12}>
          
          {/* Main Heading */}
          <Title level={2} style={{ fontSize: '32px', fontWeight: 700, color: '#1f1f1f', marginBottom: '16px' }}>
            Trust with Confidence
          </Title>

          {/* Customer-first always */}
          <Title level={4} style={{ fontSize: '20px', fontWeight: 600, color: '#333' }}>Customer-First Always</Title>
          <Paragraph style={{ fontSize: '16px', color: '#555', lineHeight: '1.6', marginBottom: '24px' }}>
            That’s why 1.5+ crore customers trust us with ₹4.5+ lakh crores of equity investments and contribute to 15% of daily retail exchange volumes in India.
          </Paragraph>

          {/* No spam or gimmicks */}
          <Title level={4} style={{ fontSize: '20px', fontWeight: 600, color: '#333' }}>No Spam or Gimmicks</Title>
          <Paragraph style={{ fontSize: '16px', color: '#555', lineHeight: '1.6', marginBottom: '24px' }}>
            No gimmicks, spam, "gamification", or annoying push notifications. High-quality apps that you use at your pace, the way you like.
          </Paragraph>

          {/* The ecosystem */}
          <Title level={4} style={{ fontSize: '20px', fontWeight: 600, color: '#333' }}>The Ecosystem</Title>
          <Paragraph style={{ fontSize: '16px', color: '#555', lineHeight: '1.6' }}>
            Not just an app, but a whole ecosystem. Our investments in fintech startups offer you tailored services specific to your needs.
          </Paragraph>

        </Col>

        {/* Right Column: Image Section */}
        <Col xs={24} md={12} style={{ textAlign: 'center' }}>
          <Image
            src="/HomePage/pic2.webp"
            alt="Trust with confidence"
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px'}}
          />
        </Col>

      </Row>
    </div>
  );
};

export default TrustWithConfidence;
