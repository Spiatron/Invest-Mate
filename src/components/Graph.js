import React, { useEffect, useRef } from 'react';
import { Layout, Card } from 'antd';
import { createChart } from 'lightweight-charts';

const { Content } = Layout;

const BuyAndSell = () => {
  const chartRef = useRef();

  useEffect(() => {
    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: chartRef.current.clientHeight,
      layout: { backgroundColor: '#FFFFFF', textColor: '#000000' },
      grid: { horzLines: { color: '#f0f0f0' }, vertLines: { color: '#f0f0f0' } },
      crossHair: { mode: 1 },
      rightPriceScale: {
        visible: false, // Hide the right price scale
      },
      leftPriceScale: {
        visible: true, // Show the left price scale
        borderColor: '#f0f0f0',
        textColor: '#000000',
      },
      timeScale: {
        timeVisible: true, // Show time on the x-axis
        secondsVisible: false, // Hide seconds for cleaner display
        tickMarkFormatter: (time) => {
          const date = new Date(time * 1000);
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          return `${hours}:${minutes}`; // Show only time in HH:MM format
        },
      },
    });

    const areaSeries = chart.addAreaSeries({
      topColor: 'rgba(89, 179, 98, 0.6)',
      bottomColor: 'rgba(89, 179, 98, 0.0)',
      lineColor: 'rgba(89, 179, 98, 1)',
      lineWidth: 2,
    });

    const data = [];
    const startTime = Math.floor(Date.now() / 1000) - (3600 * 24); // 24 hours ago
    const interval = 40 * 60; // 40 minutes in seconds

    // Generating data with 40-minute intervals for the past 24 hours
    for (let i = 0; i < 1036; i++) { // 36 data points for 24 hours
      const time = startTime + i * interval; // Increment time by 40 minutes
      const value = Math.random() * (25500 - 25000) + 25000; // Random value between 25000 and 25500
      data.push({ time, value });
    }

    // Set the generated data to the area series
    areaSeries.setData(data);

    return () => chart.remove();
  }, []);

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Card bordered={false} title="NIFTY" style={{ width: '100%', maxWidth: '800px' }}>
          <div ref={chartRef} style={{ height: '400px', width: '100%' }} />
        </Card>
      </Content>
    </Layout>
  );
};

export default BuyAndSell;
