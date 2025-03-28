import React, { useState, useEffect } from 'react';
import { Table, InputNumber, Button, message, Input } from 'antd';
import { PlusOutlined, MinusOutlined, HistoryOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'; 
import Swal from 'sweetalert2';

const StocksTable = ({ stockData }) => {
  const [stocks, setStocks] = useState([]);   // Manage the stock data with quantities
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term

  useEffect(() => {
    if (stockData.length) {
      // Merge the new stock data with the existing quantities
      const updatedStocks = stockData.map((stock) => {
        const existingStock = stocks.find((s) => s.key === stock.key); // Find the stock in the current state
        return {
          ...stock,
          quantity: existingStock ? existingStock.quantity : stock.quantity || 1, // Preserve quantity or set default
        };
      });
      setStocks(updatedStocks);
    }
  }, [stockData]); // Dependencies: update when stockData changes

  const token = localStorage.getItem('token');
  if (!token) {
    message.error("Token not found");
    console.error("Token not found");
    return;
  }

  // Define columns for Ant Design Table
  const columns = [
    {
      title: 'Stock Name',
      dataIndex: 'name',
      align: 'center',
      key: 'name',
    },
    {
      title: 'Current Price',
      dataIndex: 'lastPrice',
      align: 'center',
      key: 'lastPrice',
      render: (price) => `₹${price}`,
      // render: (price) => `₹${price.toFixed(1)}`, // Format price
    },
    {
      title: 'Quantity',
      key: 'quantity',
      align: 'center',
      render: (text, record) => (
        <div>
          <Button
            icon={<MinusOutlined />}
            onClick={() => handleQuantityChange(record.key, record.quantity - 1)}
            disabled={record.quantity <= 1}
            size="small"
            style={{ marginRight: '4px' }}
          />
          <InputNumber
            min={1}
            value={record.quantity}
            onChange={(value) => handleQuantityChange(record.key, value)}
            style={{ width: '50px', margin: '0 4px' }}
          />
          <Button
            icon={<PlusOutlined />}
            onClick={() => handleQuantityChange(record.key, record.quantity + 1)}
            size="small"
            style={{ marginLeft: '4px' }}
          />
        </div>
      ),
    },
    {
      title: 'Total Amount',
      key: 'totalPrice',
      align: 'center',
      render: (text, record) => {
        const totalPrice = record.lastPrice * record.quantity; // Calculate total price
        //return `₹${totalPrice}`; 
        return `₹${totalPrice.toFixed(2)}`; // Display total price
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => handleBuy(record.name, record.key, record.quantity, record.lastPrice)}
            style={{ marginRight: '8px' }}
          >
            Buy
          </Button>
          <Button
            color="danger" variant="outlined"
            onClick={() => handleSell(record.name, record.key, record.quantity, record.lastPrice)}
          >
            Sell
          </Button>
        </div>
      ),
    },
  ];

  // Handle quantity change
  const handleQuantityChange = (key, value) => {
    if (value < 1) return;
    setStocks((prevStocks) =>
      prevStocks.map((item) => (item.key === key ? { ...item, quantity: value } : item))
    );
  };

  // Handle buy action
const handleBuy = async (stock, key, quantity, price) => {
  const totalPrice = price * quantity;

   // SweetAlert2 confirmation dialog
  const { value: confirmed } = await Swal.fire({
    title: 'Confirm Purchase',
    text: `Are you sure you want to purchase ${quantity} share${quantity > 1 ? 's' : ''} of ${stock} for a total amount of ₹${totalPrice}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    confirmButtonColor:"#ff0000",
  });

  if (confirmed) {
    const transactionData = {
      stockName: stock,
      pricePerUnit: price,
      stockQuantity: quantity,
      totalAmount: totalPrice,
      transactionType: 'buy', // Add action type
    };
    console.log(`Payload of buy ${transactionData}`);

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/stocks/registerTransaction/buy`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'token': token, // Included token for authentication
          },
          body: JSON.stringify(transactionData),
        });

        if (response.ok) {
          Swal.fire({
            title: 'Success!',
            text: `You have successfully purchased ${quantity} share${quantity > 1 ? 's' : ''} of ${stock} for a total of ₹${totalPrice}.`,
            icon: 'success',
            timer: 2000, // Automatically close after 3 seconds
            showConfirmButton: false,
          });
        } else {
          message.error('Failed to process the buy request.');
        }
      } catch (error) {
        message.error('An error occurred while processing the buy request.');
        console.error('Buy transaction error:', error);
      }
    }
};

  // Handle sell action
const handleSell = async (stock, key, quantity, price) => {
  const totalPrice = price * quantity;

  // SweetAlert2 confirmation dialog
  const { value: confirmed } = await Swal.fire({
    title: 'Confirm Sell',
    text: `Are you sure you want to sell ${quantity} share${quantity > 1 ? 's' : ''} of ${stock} for a total amount of ₹${totalPrice}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    confirmButtonColor:"#ff0000",
  });

  if (confirmed) {
    const transactionData = {
      stockName: stock,
      pricePerUnit: price,
      stockQuantity: quantity,
      totalAmount: totalPrice,
      transactionType: 'sell', // Add action type
    };
    console.log(`Payload of sell ${transactionData}`);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/stocks/registerTransaction/sell`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token, // Included token for authentication
        },
        body: JSON.stringify(transactionData),
      });

      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          text: `You have successfully sold ${quantity} share${quantity > 1 ? 's' : ''} of ${stock} for a total of ₹${totalPrice}.`,
          icon: 'success',
          timer: 2000, // Automatically close after 3 seconds
          showConfirmButton: false,
        });
      } else {
        message.error('Failed to process the sell request.');
      }
    } catch (error) {
      message.error('An error occurred while processing the sell request.');
      console.error('Sell transaction error:', error);
    }
  }
};

  // Filter stocks based on search term
  const filteredStocks = stocks.filter((stock) =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
      {/* Wrapper div with flexbox for input and button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Input
          placeholder="Search stock by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 'auto' }}
        />

        {/* Transaction History Button */}
        <Link to="/TransactionHistory">
          <Button type="primary" icon={<HistoryOutlined />}>
            Transaction History
          </Button>
        </Link>
      </div>
      <Table
        dataSource={filteredStocks}
        columns={columns}
        style={{ width: '100%', overflowX: 'auto' }}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default StocksTable;
