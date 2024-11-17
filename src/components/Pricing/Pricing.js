import React from 'react';
import { Row, Col, Card } from 'antd';
import PricingTable from './PricingTable';
import Charges from './Charges';
import ChargesTable from './ChargesTable';

const Pricing = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px', minHeight: '100vh' }}>

      {/* Heading Section */}
      <Row justify="center" style={{ textAlign: 'center' }}>
        <Col span={24}>
          <h1 style={{ fontSize: '60px', fontWeight: '500', margin: '0', lineHeight: '1', marginBottom: "50px" }}>
            Charges
            <br />
            <span style={{ color: '#adb5bd', fontSize: '20px', fontWeight: '400', margin: '0', display: 'inline-block' }}>
              List of all charges and taxes
            </span>
          </h1>
        </Col>
      </Row>

      {/* Pricing Section */}
      <Row gutter={[16, 16]} justify="center" style={{ textAlign: 'center' }}>

        <Col xs={24} sm={12} md={8}>
          <Card
            bordered={false}
            style={{ borderRadius: '10px', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)', }}>
            <h1 style={{ fontSize: '80px', color: '#ff0000' }}>₹0</h1>
            <h3 style={{ fontSize: '35px' }}>Free equity delivery</h3>
            <p style={{ fontSize: '20px' }}>All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
          </Card>
        </Col>


        <Col xs={24} sm={12} md={8}>
          <Card
            bordered={false}
            style={{ borderRadius: '10px', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)', }}>
            <h1 style={{ fontSize: '80px', color: '#ff0000' }}>₹20</h1>
            <h3 style={{ fontSize: '33px' }}>Intraday - F&O trades</h3>
            <p style={{ fontSize: '20px' }}>
              Flat fee of ₹20 or 0.03% (whichever is less) on intraday trades across equity, currency, and ₹20 for all option trades.
            </p>
          </Card>
        </Col>


        <Col xs={24} sm={12} md={8}>
          <Card bordered={false} style={{ borderRadius: '10px', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)', }}>
            <h1 style={{ fontSize: '80px', color: '#ff0000' }}>₹0</h1>
            <h3 style={{ fontSize: '35px' }}>Free direct MF</h3>
            <p style={{ fontSize: '20px' }}>All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
          </Card>
        </Col>
        <PricingTable />
        <div>
          <h1 style={{ textAlign: 'start' }}>Charges explained</h1>
          <Charges />
        </div>
      </Row>

      <div style={{marginTop:"50px"}}>
        <ChargesTable />
        {/* You can add more components or content here */}
      </div>
    </div>
  );
};

export default Pricing;
