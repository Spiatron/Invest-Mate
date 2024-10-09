import React, { useState } from 'react';
import { Layout, Row, Col, Card, Table, Select } from 'antd';
import { FaQuoteLeft } from 'react-icons/fa';

const { Content } = Layout;
const { Option } = Select;

// Sample transaction data
const initialTransactionData = [
  {
    key: '1',
    date: '2024-10-01',
    type: 'Buy',
    stock: 'AAPL',
    amount: 10,
    price: 150,
    total: 1500,
  },
  {
    key: '2',
    date: '2024-10-02',
    type: 'Sell',
    stock: 'AAPL',
    amount: 5,
    price: 155,
    total: 775,
  },
  {
    key: '3',
    date: '2024-10-03',
    type: 'Buy',
    stock: 'TSLA',
    amount: 2,
    price: 700,
    total: 1400,
  },
  {
    key: '4',
    date: '2024-10-04',
    type: 'Sell',
    stock: 'TSLA',
    amount: 1,
    price: 720,
    total: 720,
  },
];

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Transaction Type',
    dataIndex: 'type',
    key: 'type',
    filters: [
      { text: 'Buy', value: 'Buy' },
      { text: 'Sell', value: 'Sell' },
    ],
    onFilter: (value, record) => record.type.includes(value),
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    key: 'stock',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Price per Share',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
  },
];

const BuyAndSell = () => {
  const [transactionData, setTransactionData] = useState(initialTransactionData);
  const [filter, setFilter] = useState('All');

  // Calculate summary statistics
  const totalInvestment = transactionData.reduce((sum, transaction) => {
    return transaction.type === 'Buy' ? sum + transaction.total : sum;
  }, 0);
  
  const totalReturns = transactionData.reduce((sum, transaction) => {
    return transaction.type === 'Sell' ? sum + transaction.total : sum;
  }, 0);

  const averagePrice = transactionData.length
    ? transactionData.reduce((sum, transaction) => sum + transaction.price, 0) / transactionData.length
    : 0;

  const filteredData = filter === 'All' ? transactionData : transactionData.filter(item => item.type === filter);

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <Content style={{ width: '100%', margin: '0', padding: '40px' }}>
        
        {/* Decorative Trading Lines with Quotes */}
        <Row gutter={[16, 16]} justify="center" style={{ marginBottom: '20px' }}>
          <Col span={24}>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', position: 'relative' }}>
              <div style={{ color: '#52c41a', fontWeight: 'bold', fontSize: '24px', position: 'relative', zIndex: 1 }}>
                ▲ Buy Signal: +1.5%
              </div>
              <div
                style={{
                  borderBottom: '2px solid #52c41a',
                  width: '30%',
                  position: 'absolute',
                  top: '50%',
                  zIndex: 0,
                }}
              />
              <div style={{ color: '#f5222d', fontWeight: 'bold', fontSize: '24px', position: 'relative', zIndex: 1 }}>
                ▼ Sell Signal: -0.7%
              </div>
              <div
                style={{
                  borderBottom: '2px solid #f5222d',
                  width: '30%',
                  position: 'absolute',
                  top: '50%',
                  zIndex: 0,
                }}
              />
            </div>
            {/* Inspirational Quote */}
            <div style={{ textAlign: 'center', marginTop: '20px', fontStyle: 'italic', color: '#595959' }}>
              <FaQuoteLeft style={{ color: '#1890ff', fontSize: '24px' }} />
              <span style={{ marginLeft: '8px' }}>
                "In investing, what is comfortable is rarely profitable." - Robert Arnott
              </span>
            </div>
          </Col>
        </Row>

        {/* User Profile and Summary Statistics Section */}
        <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
          <Col xs={24} md={12}>
            <Card 
              title="User Profile" 
              headStyle={{ backgroundColor: '#f5222d', color: '#fff' }}
              bodyStyle={{ backgroundColor: '#f0f0f0' }}
             // style={{ border: '1px solid #f5222d' }}
            >
              <p><strong>Name:</strong> John Doe</p>
              <p><strong>Email:</strong> johndoe@example.com</p>
              <p><strong>Account Balance:</strong> ₹10,000</p>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card 
              title="Summary Statistics"
              headStyle={{ backgroundColor: '#f5222d', color: '#fff' }}
              bodyStyle={{ backgroundColor: '#f0f0f0' }}
             // style={{ border: '1px solid #f5222d' }}
            >
              <p>Total Investment: ₹{totalInvestment}</p>
              <p>Total Returns: ₹{totalReturns}</p>
              <p>Average Price per Share: ₹{averagePrice.toFixed(2)}</p>
            </Card>
          </Col>
        </Row>

        {/* Image Placeholder */}
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card bordered={false} title="Buy and Sell" style={{ width: '100%' }}>
              <img
                src="\BuyAndSell\chart.PNG"
                alt="Chart Placeholder"
                style={{ width: '100%', height: 'auto', minHeight: '500px' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Filter and Transaction History Table */}
        <Row gutter={[16, 16]} style={{ marginTop: '40px' }}>
          <Col span={24}>
            <Card title="Transaction History" style={{ width: '100%' }}>
              <Select
                defaultValue="All"
                style={{ width: '200px', marginBottom: '20px' }}
                onChange={value => setFilter(value)}
              >
                <Option value="All">All</Option>
                <Option value="Buy">Buy</Option>
                <Option value="Sell">Sell</Option>
              </Select>
              <Table
                columns={columns}
                dataSource={filteredData}
                pagination={{ pageSize: 5 }}
                rowKey="key"
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default BuyAndSell;
