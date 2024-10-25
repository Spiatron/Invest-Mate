import React, { useState, useEffect } from 'react';
import { Table, Tag, Input, Select, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { AntDesignOutlined } from '@ant-design/icons';
import axios from 'axios'; // Import axios for making API calls

// Ant Design components
const { Option } = Select;

const TransactionHistory = () => {
  const [transactionsData, setTransactionsData] = useState([]); // State for all transactions
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filterType, setFilterType] = useState('all'); // Default to show all transactions
  const [searchTerm, setSearchTerm] = useState(''); // For search

  // Fetch user stock transaction details from the API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/stocks/getUserStockTransactionDetails`, {
          headers: {
            'token': localStorage.getItem('token'), // Assuming you store your token in local storage
          },
        });
        setTransactionsData(response.data);
        setFilteredTransactions(response.data); // Initialize filtered transactions with fetched data
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      }
    };

    fetchTransactions();
  }, []);

  // Handle filter change (buy, sell, or all)
  const handleFilterChange = (value) => {
    setFilterType(value);

    const updatedTransactions = transactionsData.filter((item) => {
      if (value === 'all') return true;
      return item.transactionType === value;
    });

    setFilteredTransactions(updatedTransactions);
  };

  // Handle search input change
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const searchedTransactions = transactionsData.filter((item) =>
      item.stockName.toLowerCase().includes(value)
    );

    setFilteredTransactions(searchedTransactions);
  };

  // Table columns definition
  const columns = [
    {
      title: 'Stock Name',
      dataIndex: 'stockName',
      key: 'stockName',
      align: 'center',
    },
    {
      title: 'Transaction Type',
      dataIndex: 'transactionType',
      key: 'transactionType',
      align: 'center',
      render: (type) => (
        <Tag color={type === 'buy' ? 'green' : 'red'}>{type.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'stockQuantity',
      key: 'stockQuantity',
      align: 'center',
    },
    {
      title: 'Price Per Unit',
      dataIndex: 'pricePerUnit',
      key: 'pricePerUnit',
      align: 'center',
      render: (price) => `₹${price.toFixed(2)}`,
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      align: 'center',
      render: (total) => `₹${total.toFixed(2)}`,
    },
    {
      title: 'Transaction Fee',
      dataIndex: 'transactionFee',
      key: 'transactionFee',
      align: 'center',
      render: (fee) => `₹${fee}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => (
        <Tag color={status === 'completed' ? 'blue' : 'orange'}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
      align: 'center',
   // render: (date) => new Date(date).toLocaleDateString(),
   render: (date) => {
    const options = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: true // For AM/PM
    };
    return new Date(date).toLocaleString([], options); // Combines date and time
  },
    },
  ];

  return (
    <div style={{ minHeight: '100vh', maxWidth: '1600px', margin: '0 auto', padding: '20px' }}>
      {/* Header Section with Logo and Title */}
      <Row justify="center" align="middle" style={{ marginBottom: '20px' }}>
        <Col>
          <h2 style={{ display: 'flex', alignItems: 'center' }}>
            <AntDesignOutlined style={{ fontSize: '40px', marginRight: '10px' }} />
            <span style={{ fontSize: '30px' }}>Buy & Sell Transactions</span>
          </h2>
        </Col>
      </Row>

      {/* Filter Dropdown and Search Bar */}
      <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
        <Col>
          {/* Filter Dropdown */}
          <Select
            value={filterType}
            onChange={handleFilterChange}
            style={{ width: '200px' }}
          >
            <Option value="all">All Transactions</Option>
            <Option value="buy">Buy Transactions</Option>
            <Option value="sell">Sell Transactions</Option>
          </Select>
        </Col>
        <Col>
          {/* Search Bar */}
          <Input
            placeholder="Search by Stock Name"
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={handleSearch}
            style={{ width: '300px' }}
          />
        </Col>
      </Row>

      {/* Transactions Table */}
      <Table
        dataSource={filteredTransactions}
        columns={columns}
        rowKey="transactionDate" // Assuming transactionDate is unique
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default TransactionHistory;
