import { Row, Col, Card, Typography } from 'antd';
import { DollarOutlined, StockOutlined, LineChartOutlined, FundOutlined, BarChartOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const TradingOptionsSection = () => (
  <>
    {/* Section Title */}
    <Row justify="center" style={{ marginTop: '30px', marginBottom: '20px' }}>
      <Col span={24}>
        <Title level={2} style={{ textAlign: 'center', fontWeight: '500', color: '#333' }}>
          The Range of Trading Options We Offer
        </Title>
      </Col>
    </Row>
    
    {/* Trading Options */}
    <Row justify="center" gutter={[32, 32]} style={{ padding: '0 20px' }}>
      <Col span={8} xs={24} sm={12} lg={8}>
        <Card hoverable style={{ textAlign: 'center', padding: '20px', borderRadius: '10px' }}>
          <DollarOutlined style={{ fontSize: '40px', color: '#ff4d4f' }} />
          <Title level={4} style={{ marginTop: '15px' }}>Intraday Trading</Title>
          <Paragraph>Intraday trading is about buying and selling on the same day to take advantage of price movements.</Paragraph>
        </Card>
      </Col>
      
      <Col span={8} xs={24} sm={12} lg={8}>
        <Card hoverable style={{ textAlign: 'center', padding: '20px', borderRadius: '10px' }}>
          <StockOutlined style={{ fontSize: '40px', color: '#ff4d4f' }} />
          <Title level={4} style={{ marginTop: '15px' }}>Futures & Options</Title>
          <Paragraph>Explore leveraged positions with futures and options in diverse markets.</Paragraph>
        </Card>
      </Col>
      
      <Col span={8} xs={24} sm={12} lg={8}>
        <Card hoverable style={{ textAlign: 'center', padding: '20px', borderRadius: '10px' }}>
          <LineChartOutlined style={{ fontSize: '40px', color: '#ff4d4f' }} />
          <Title level={4} style={{ marginTop: '15px' }}>Long Term Trading</Title>
          <Paragraph>Invest for long-term growth and stable returns over extended periods.</Paragraph>
        </Card>
      </Col>

      <Col span={8} xs={24} sm={12} lg={8}>
        <Card hoverable style={{ textAlign: 'center', padding: '20px', borderRadius: '10px' }}>
          <FundOutlined style={{ fontSize: '40px', color: '#ff4d4f' }} />
          <Title level={4} style={{ marginTop: '15px' }}>ETF</Title>
          <Paragraph>Exchange-traded funds offer a balanced approach to diversified investing.</Paragraph>
        </Card>
      </Col>
      
      <Col span={8} xs={24} sm={12} lg={8}>
        <Card hoverable style={{ textAlign: 'center', padding: '20px', borderRadius: '10px' }}>
          <BarChartOutlined style={{ fontSize: '40px', color: '#ff4d4f' }} />
          <Title level={4} style={{ marginTop: '15px' }}>Mutual Funds</Title>
          <Paragraph>Mutual funds offer a group investment strategy with professional management.</Paragraph>
        </Card>
      </Col>
      
      <Col span={8} xs={24} sm={12} lg={8}>
        <Card hoverable style={{ textAlign: 'center', padding: '20px', borderRadius: '10px' }}>
          <DollarOutlined style={{ fontSize: '40px', color: '#ff4d4f' }} />
          <Title level={4} style={{ marginTop: '15px' }}>Derivatives</Title>
          <Paragraph>Manage risk and enhance returns with derivative trading options.</Paragraph>
        </Card>
      </Col>
    </Row>
  </>
);

export default TradingOptionsSection;
