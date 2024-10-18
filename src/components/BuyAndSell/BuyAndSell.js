import React from 'react';
import StockCharts from './StockCharts'; // Import StockCharts component
import StocksTable from './StocksTable'; // Import StocksTable component

const BuyPage = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '20px', 
        color: '#4CAF50', 
        fontSize: '36px', 
        fontWeight: 'bold' 
      }}>
        <span style={{ marginRight: '10px' }}>📈</span> {/* Buy Icon */}
        Buy and Sell Stocks
        <span style={{ marginLeft: '10px' }}>📉</span> {/* Sell Icon */}
      </div>
      <div style={{ marginBottom: '40px' }}>
        <StockCharts />  {/* Render StockCharts component */}
      </div>
      <div style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '20px', backgroundColor: '#fff' }}>
        <StocksTable />   {/* Render StocksTable component */}
      </div>
    </div>
  );
};

export default BuyPage;
