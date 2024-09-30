import React from 'react';
import { Row, Col, Divider } from 'antd';
import { DollarOutlined, LineChartOutlined, StockOutlined, FundOutlined, BarChartOutlined } from '@ant-design/icons';

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

      {/* Section Line */}
      <Divider />

      {/* First Section (Left) */}
      <Row justify="start" style={{ textAlign: 'left', marginTop: '30px' }}>
        <Col span={12}>
          <p style={{ fontSize: '18px', fontWeight: '400', color: '#333' }}>
            We began operations on the 15th of August, 2024, with a vision to break all barriers that traders and investors in India face, whether it's related to costs, support, or technology. We named our platform Mengal Keshav, symbolizing our commitment to removing obstacles for every investor.
          </p>
          <p style={{ fontSize: '18px', fontWeight: '400', color: '#333', marginTop: '20px' }}>
            Today, our innovative pricing models and proprietary technology have established us as a leading stock brokerage in India.
          </p>
          <p style={{ fontSize: '18px', fontWeight: '400', color: '#333', marginTop: '20px' }}>
            With over 1 crore clients, millions of orders are executed daily through our powerful investment platforms, accounting for more than 15% of India’s retail trading volumes.
          </p>
        </Col>
      </Row>

      {/* Second Section (Right) */}
      <Row justify="end" style={{ textAlign: 'right', marginTop: '30px' }}>
        <Col span={12}>
          <p style={{ fontSize: '18px', fontWeight: '400', color: '#333' }}>
            Moreover, we operate several popular educational and community initiatives to empower retail traders and investors.
          </p>
          <p style={{ fontSize: '18px', fontWeight: '400', color: '#333', marginTop: '20px' }}>
            Our fintech fund and incubator, Rainmatter, has invested in multiple fintech startups with the goal of expanding the Indian capital markets.
          </p>
          <p style={{ fontSize: '18px', fontWeight: '400', color: '#333', marginTop: '20px' }}>
            And we are always evolving. Stay updated with our latest developments by visiting our blog or checking out what the media has to say about us.
          </p>
        </Col>
      </Row>

      {/* Final Section Line */}
      <Divider />

      {/* New Section with Trading Options */}
      <Row justify="center" style={{ textAlign: 'center', marginTop: '30px' }}>
        <Col span={24}>
          <h2 style={{ fontSize: '28px', fontWeight: '500' }}>
            The range of trading options we offer
          </h2>
        </Col>
      </Row>
      
      <Row justify="center" style={{ marginTop: '40px' }}>
        <Col span={12} style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '20px' }}>
            <DollarOutlined style={{ fontSize: '40px', color: '#ff0000' }} />
            <p style={{ fontSize: '18px', marginTop: '10px' }}>Intraday Trading</p>
            <p>Write some info about Intraday</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <StockOutlined style={{ fontSize: '40px', color: '#ff0000' }} />
            <p style={{ fontSize: '18px', marginTop: '10px' }}>Futures & Options</p>
            <p>Write some info about Futures & Options</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <LineChartOutlined style={{ fontSize: '40px', color: '#ff0000' }} />
            <p style={{ fontSize: '18px', marginTop: '10px' }}>Long Term Trading</p>
            <p>Write some info about Long Term Trading</p>
          </div>
        </Col>

        <Col span={12} style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '20px' }}>
            <FundOutlined style={{ fontSize: '40px', color: '#ff0000' }} />
            <p style={{ fontSize: '18px', marginTop: '10px' }}>ETF</p>
            <p>Write some info about ETF</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <BarChartOutlined style={{ fontSize: '40px', color: '#ff0000' }} />
            <p style={{ fontSize: '18px', marginTop: '10px' }}>Mutual Funds</p>
            <p>Write some info about Mutual Funds</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <DollarOutlined style={{ fontSize: '40px', color: '#ff0000' }} />
            <p style={{ fontSize: '18px', marginTop: '10px' }}>Derivatives</p>
            <p>Write some info about Derivatives</p>
          </div>
        </Col>
      </Row>

      {/* Section Line */}
      <Divider />
      
    </div>
  );
};

export default About;
