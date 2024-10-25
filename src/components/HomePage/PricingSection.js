import React from 'react';
import { Row, Col, Card, Typography } from 'antd';

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
    fontSize: '1.2rem',
    color: '#ff0000',
    display: 'block',
    marginTop: '10px',
  };

  return (
    <div style={sectionStyle}>
      <Row gutter={[24, 24]} justify="center" align="middle">
        <Col xs={24} sm={24} md={12}>
          <Title level={2} style={{ fontSize: '32px', fontWeight: 700, color: '#1f1f1f', textAlign: 'left' }}>
            Unbeatable pricing
          </Title>
          <Text style={{ fontSize: '20px', display: 'block', textAlign: 'left', marginBottom: '10px' }}>
            We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.
          </Text>
          <Link href="/pricing" style={linkStyle}>
            See pricing &rarr;
          </Link>
        </Col>

        <Col xs={24} sm={24} md={12}>
          <Row gutter={[24, 24]}>
            {[
              { price: '₹ 0', description: 'Free account opening' },
              { price: '₹ 0', description: 'Free equity delivery & direct mutual funds' },
              { price: '₹ 20', description: 'Intraday and F&O' },
            ].map((item, index) => (
              <Col key={index} span={8} xs={24} sm={12} lg={8}>
                <Card
                  hoverable
                  style={{ textAlign: 'center', padding: '20px', borderRadius: '10px', height: '220px',}} // Set a fixed height
                >
                  <Text style={highlightStyle}>{item.price}</Text>
                  <br />
                  <Text style={labelStyle}>{item.description}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default PricingSection;
