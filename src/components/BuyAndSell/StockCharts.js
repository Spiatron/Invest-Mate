import React, { useState, useEffect } from 'react';
import { Button, Layout, Skeleton } from 'antd';
import NSEChart from './NSEChart';  // NSEChart is the chart for NSE
import BSEChart from './BSEChart';  // Similar chart component for BSE

const { Content } = Layout;

const StockCharts = ({ data }) => {
  const [activeTab, setActiveTab] = useState('nse');
  const [loading, setLoading] = useState(false);

  const handleTabChange = (key) => {
    setLoading(true); // Set loading to true when switching tabs
    setActiveTab(key);
  };

  console.log(`Receiving StockData in Stockcharts Componenet ${data}`);
  // Simulate a loading time when switching charts
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false); // Set loading to false after 1 second (or any desired time)
      }, 1000);
      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [loading]);

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div bordered={false} style={{ width: '100%', maxWidth: '1000px' }}>
          
          {/* NSE and BSE Toggle Buttons (on the left) */}
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {/* NSE Button */}
            <Button
              type={activeTab === 'nse' ? 'primary' : 'default'}
              onClick={() => handleTabChange('nse')}
              style={{ marginRight: '10px' }}
            >
              NSE
            </Button>
            {/* BSE Button */}
            <Button
              type={activeTab === 'bse' ? 'primary' : 'default'}
              onClick={() => handleTabChange('bse')}
            >
              BSE
            </Button>
          </div>

          {/* Chart Heading and Buttons */}
          {activeTab === 'nse' ? (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h2>NIFTY 24964.25 <span style={{ color: '#ff0000' }}>-34.20 (-0.14%)</span></h2>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h2>BSE 56789.25 <span style={{ color: '#ff0000' }}>-124.25 (-0.22%)</span></h2>
            </div>
          )}

          {/* Conditionally render the appropriate chart */}
          <div>
            {loading ? (
              <Skeleton active paragraph={{ rows: 12 }} />
            ) : (
              activeTab === 'nse' ? <NSEChart /> : <BSEChart />
            )}
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default StockCharts;
