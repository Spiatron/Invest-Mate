import React, { useState } from 'react';
import { Table, InputNumber, Button, message } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'; // Import Ant Design icons

const StocksTable = () => {
  // Stock data with initial quantities set to 1
  const initialStockData = [
    {
      key: '1',
      stock: 'Sensex',
      price: 61560.64,
      change: '-371.83 (-0.60%)',
      index: 'INDICES',
      quantity: 1,
    },
    {
      key: '2',
      stock: 'Nifty 50',
      price: 18181.75,
      change: '-104.75 (-0.57%)',
      index: 'INDICES',
      quantity: 1,
    },
    {
      key: '3',
      stock: 'Astron',
      price: 26.05,
      change: '-0.35 (-1.32%)',
      index: 'NSE',
      quantity: 1,
    },
    {
      key: '4',
      stock: 'Asian Paint',
      price: 3092.45,
      change: '-45.65 (-1.45%)',
      index: 'NSE',
      quantity: 1,
    },
    {
      key: '5',
      stock: 'Rites',
      price: 396.50,
      change: '+8.15 (+2.09%)',
      index: 'NSE',
      quantity: 1,
    },
    {
      key: '6',
      stock: 'BHEL',
      price: 82.30,
      change: '+0.74 (+0.90%)',
      index: 'BSE',
      quantity: 1,
    },
    {
      key: '7',
      stock: 'Reliance',
      price: 2439.30,
      change: '-14.50 (-0.59%)',
      index: 'NSE',
      quantity: 1,
    },
    {
      key: '8',
      stock: 'Nifty Bees',
      price: 199.79,
      change: '-0.76 (-0.37%)',
      index: 'BSE',
      quantity: 1,
    },
  ];

  // State to manage stock data including quantities
  const [stockData, setStockData] = useState(initialStockData);

  // Define columns for Ant Design Table
  const columns = [
    {
      title: 'Stock Name',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Current Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `₹${price.toFixed(2)}`, // Format price
    },
    {
      title: 'Market',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Quantity',
      key: 'quantity',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            icon={<MinusOutlined />}
            onClick={() => handleQuantityChange(record.key, record.quantity - 1)}
            disabled={record.quantity <= 1}
            size="small"
            style={{ marginRight: '4px' }} // Small margin for spacing
          />
          <InputNumber
            min={1}
            value={record.quantity}
            onChange={(value) => handleQuantityChange(record.key, value)}
            style={{ width: '50px', margin: '0 4px' }} // Smaller width for the quantity input
          />
          <Button
            icon={<PlusOutlined />}
            onClick={() => handleQuantityChange(record.key, record.quantity + 1)}
            size="small"
            style={{ marginLeft: '4px' }} // Small margin for spacing
          />
        </div>
      ),
    },
    {
      title: 'Total Price',
      key: 'totalPrice',
      render: (text, record) => {
        const totalPrice = record.price * record.quantity; // Calculate total price
        return `₹${totalPrice.toFixed(2)}`; // Format total price
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => handleBuy(record.stock, record.key, record.quantity, record.price)} // Pass stock name
            style={{ marginRight: '8px' }}
          >
            Buy
          </Button>
          <Button
            type="danger"
            onClick={() => handleSell(record.stock, record.key, record.quantity, record.price)} // Pass stock name
          >
            Sell
          </Button>
        </div>
      ),
    },
  ];

  // Function to handle quantity changes
  const handleQuantityChange = (key, value) => {
    if (value < 1) return; // Prevent setting quantity below 1
    setStockData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, quantity: value } : item
      )
    );
  };

  // Function to handle Buy action
  const handleBuy = (stock, key, quantity, price) => {
    const totalPrice = price * quantity;
    message.success(`Bought ${quantity} shares of ${stock} for ₹${totalPrice.toFixed(2)}`);
    // Add your logic for buying the stock here
  };

  // Function to handle Sell action
  const handleSell = (stock, key, quantity, price) => {
    const totalPrice = price * quantity;
    message.success(`Sold ${quantity} shares of ${stock} for ₹${totalPrice.toFixed(2)}`);
    // Add your logic for selling the stock here
  };

  return (
    <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
      <Table
        dataSource={stockData}
        columns={columns}
        pagination={false}
        style={{ width: '100%', overflowX: 'auto' }} // Makes the table responsive
      />
    </div>
  );
};

export default StocksTable;
