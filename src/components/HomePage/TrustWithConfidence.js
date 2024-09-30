import React from 'react';
import { Row, Col, Typography } from 'antd';
import { TrophyOutlined, CustomerServiceOutlined, SafetyOutlined, DollarCircleOutlined } from '@ant-design/icons';

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

        {/* Right Column: Icons Section */}
        {/* <Col xs={24} md={12}>
          <Row gutter={[16, 16]} justify="center" align="middle">
            
         
            <Col span={12} style={{ textAlign: 'center' }}>
              <TrophyOutlined style={{ fontSize: '40px', color: '#1890ff' }} />
              <Paragraph>Streak</Paragraph>
            </Col>
            <Col span={12} style={{ textAlign: 'center' }}>
              <SafetyOutlined style={{ fontSize: '40px', color: '#1890ff' }} />
              <Paragraph>Console</Paragraph>
            </Col>
            <Col span={12} style={{ textAlign: 'center' }}>
              <CustomerServiceOutlined style={{ fontSize: '40px', color: '#1890ff' }} />
              <Paragraph>Kite</Paragraph>
            </Col>
            <Col span={12} style={{ textAlign: 'center' }}>
              <DollarCircleOutlined style={{ fontSize: '40px', color: '#1890ff' }} />
              <Paragraph>Coin</Paragraph>
            </Col>

          </Row>
        </Col> */}

      </Row>

    </div>
  );
};

export default TrustWithConfidence;
