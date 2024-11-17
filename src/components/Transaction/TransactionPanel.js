import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Select, Space, Typography, message, Modal, Grid } from 'antd';
import { EyeOutlined, UserSwitchOutlined, EditOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { FaIndianRupeeSign } from "react-icons/fa6";

const { Option } = Select;
const { Title } = Typography;

const TransactionPanel = () => {
  const { xs } = Grid.useBreakpoint(); // Detects if the screen is extra small (mobile)
  const [users, setUsers] = useState([]); // Store fetched users
  const [loading, setLoading] = useState(true); // Loading state for API call
  const [transactions, setTransactions] = useState([]); // Store user transactions
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [filterStatus, setFilterStatus] = useState(''); // Filter state
  const [searchText, setSearchText] = useState(''); // Search state
  const [selectedUserName, setSelectedUserName] = useState(''); // Store selected user's name
  const [selectedUserPan, setSelectedUserPan] = useState(''); // Store selected user's PAN


  // Fetch users from API when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/stocks/getUserbyKycStatusAndStatus`, {
          method: 'GET',
          headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data); // Set fetched users
      } catch (error) {
        message.error('Failed to fetch users');
        console.error(error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchUsers();
  }, []);

  // Handle "Show All Transactions" click
  const showTransactions = async (user) => {
    try {
      const { pan, username } = user; // Extract both PAN and username

      setSelectedUserName(username); // Store the username
      setSelectedUserPan(pan); // Store the PAN

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/stocks/getUserStockTransactions`, {
        method: 'POST',
        headers: {
          'token': localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pan }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      setTransactions(result.data); // Store transactions
      setIsModalVisible(true); // Open the modal
    } catch (error) {
      message.error('Failed to fetch transactions');
      console.error(error);
    }
  };


  // Close the modal
  const handleModalClose = () => {
    setIsModalVisible(false);
    setTransactions([]); // Clear transactions
  };

  // Filter and search users
  const filteredData = users.filter((user) => {
    const userName = user.username || ''; // Default to empty string if name is missing
    return (
      (!filterStatus || user.status === filterStatus) &&
      (!searchText || userName.toLowerCase().includes(searchText.toLowerCase()))
    );
  });

  // Define table columns
  const columns = [
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'name',
      align: 'center',
      width: '25%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      width: '35%',
      responsive: ['lg'],
    },
    {
      title: 'PAN',
      dataIndex: 'pan',
      key: 'pan',
      align: 'center',
      width: '20%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>,
      width: '10%',
      responsive: ['lg'],
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (text, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => showTransactions(record)}
          >
            {!xs && 'Show All Transactions'} {/* Show text only if screen is not XS */}
          </Button>
          <Button
            type="default"
            icon={<EditOutlined />}
          >
            {!xs && 'Edit'} {/* Show text only if screen is not XS */}
          </Button>
        </Space>
      ),
      width: '30%',
    },
  ];

  // Define columns for the transactions modal
  const transactionColumns = [
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
      render: (type) => <span style={{ textTransform: 'capitalize' }}>{type}</span>,
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
      render: (amount) => `₹${amount.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => <span style={{ textTransform: 'capitalize' }}>{status}</span>,
    },
    {
      title: 'Date',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
      align: 'center',
      render: (date) => new Date(date).toLocaleString(),
    },
  ];

  return (
    <div style={{ minHeight: '100vh', maxWidth: '1800px', margin: '0 auto', padding: '20px' }}>
      {/* Heading */}
      <Space style={{ marginBottom: '20px', marginTop: '20px', justifyContent: 'center', width: '100%' }}>
        <UserSwitchOutlined style={{ fontSize: '40px', color: 'black', marginRight: '10px' }} />
        <Title level={2} style={{ fontSize: xs ? '20px' : '30px', margin: 0 }}>
          User Stocks Transactions
        </Title>
      </Space>

      {/* Filter and Search Section */}
      <Space style={{ marginBottom: '20px', width: '100%', justifyContent: 'space-between' }}>
        <Select
          placeholder="Filter by Status"
          onChange={(value) => setFilterStatus(value)}
          allowClear
          style={{ width: 150 }}
          suffixIcon={<FilterOutlined />}
        >
          <Option value="active">Active</Option>
          <Option value="frozen">Frozen</Option>
        </Select>
        <Input
          placeholder="Search by Name"
          onChange={(e) => setSearchText(e.target.value)}
          prefix={<SearchOutlined />}
        />
      </Space>

      <Table 
      columns={columns} 
      dataSource={filteredData} 
      loading={loading} 
      pagination={{ pageSize: 10 }} 
      // scroll={{ x: 1000 }} // Enables horizontal scroll if the table exceeds 1000px in width
      />


      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <FaIndianRupeeSign style={{  fontSize: xs ? '16px' : '24px', marginRight: '8px'  }} />
            <Title level={4} style={{
              margin: 0,
              fontWeight: 'bold',
              textAlign: 'center', // Center the title
              fontSize: xs ? '16px' : '30px'
            }}>
              {`Transactions for ${selectedUserName || 'User'}`}
            </Title>
          </div>
        }
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width="max-content" // Set width to max-content for responsiveness
      >
        <Table
          columns={transactionColumns}
          dataSource={transactions.map((txn) => ({
            ...txn,
            key: txn._id, // Use transaction ID as key
          }))}
          pagination={{ pageSize: 5 }}
          rowKey="_id" // Ensures that the row key is set correctly
          bordered // Adds borders to the table
          scroll={{ x: 1000 }} // Enables horizontal scroll if the table exceeds 1000px in width
        />
      </Modal>

    </div>
  );
};

export default TransactionPanel;
