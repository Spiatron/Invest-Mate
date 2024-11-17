import { Row, Col, Image } from 'antd';

const ContentSection = () => (
  <>
    {/* First Section (Left - Image on Right) */}
    <Row justify="space-between" align="middle" style={{ marginTop: '30px' }}>
      <Col xs={24} md={12} style={{ textAlign: 'left', paddingRight: '20px' }}>
        <p style={{ fontSize: '18px', fontWeight: '400', color: '#333' }}>
          We began operations with a vision to break all barriers that traders and investors in India face, whether it's related to costs, support, or technology. We named our platform Mengal Keshav, symbolizing our commitment to removing obstacles for every investor.
        </p>
        <p style={{ fontSize: '18px', fontWeight: '400', color: '#333', marginTop: '20px' }}>
          Today, our innovative pricing models and proprietary technology have established us as a leading stock brokerage in India.
        </p>
        <p style={{ fontSize: '18px', fontWeight: '400', color: '#333', marginTop: '20px' }}>
          With over 1 crore clients, millions of orders are executed daily through our powerful investment platforms, accounting for more than 15% of India’s retail trading volumes.
        </p>
      </Col>
      <Col xs={24} md={8} style={{ textAlign: 'center', marginTop: '20px' }}>
        <Image 
          width="100%" 
          src="/About/about_section1.svg" 
          alt="Image representing our vision" 
          style={{ borderRadius: '8px', maxWidth: '300px' }}
        />
      </Col>
    </Row>

    {/* Second Section (Right - Image on Left) */}
    <Row justify="space-between" align="middle" style={{ marginTop: '30px' }}>
      <Col xs={24} md={8} style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Image 
          width="100%" 
          src="/About/about_section2.svg" 
          alt="Image representing our community initiatives" 
          style={{ borderRadius: '8px', maxWidth: '300px' }}
        />
      </Col>
      <Col xs={24} md={12} style={{ paddingLeft: '20px' }}>
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
  </>
);

export default ContentSection;
