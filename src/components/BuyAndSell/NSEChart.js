import React, { useEffect, useRef, useState } from 'react';
import { Layout, Card, Row, Col } from 'antd';
import { createChart } from 'lightweight-charts';
import { CaretUpOutlined , CaretDownOutlined, MinusOutlined } from '@ant-design/icons';

const { Content } = Layout;

const NSEChart = () => {
  const chartRef = useRef();
  const [areaSeries, setAreaSeries] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [todaysHigh, setTodaysHigh] = useState(0); // State for today's high
  const [todaysLow, setTodaysLow] = useState(0);   // State for today's low

  // Load existing chart data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('chartData');
    
    // Validate and parse saved data from localStorage
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (Array.isArray(parsedData)) {
          setChartData(parsedData);
        }
      } catch (error) {
        console.error('Error parsing chartData from localStorage:', error);
      }
    }

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: chartRef.current.clientHeight,
      layout: { backgroundColor: '#FFFFFF', textColor: '#000000' },
      grid: { horzLines: { color: '#f0f0f0' }, vertLines: { color: '#f0f0f0' } },
      crossHair: { mode: 1 },
      rightPriceScale: {
        visible: false,
      },
      leftPriceScale: {
        visible: true,
        borderColor: '#f0f0f0',
        textColor: '#000000',
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        tickMarkFormatter: (time) => {
          const date = new Date(time * 1000);
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          return `${hours}:${minutes}`;
        },
      },
    });

    const series = chart.addAreaSeries({
      topColor: 'rgba(89, 179, 98, 0.6)',
      bottomColor: 'rgba(89, 179, 98, 0.0)',
      lineColor: 'rgba(89, 179, 98, 1)',
      lineWidth: 2,
    });

    setAreaSeries(series);

    // If there's saved data, set it in the chart
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (Array.isArray(parsedData)) {
          series.setData(parsedData);
        }
      } catch (error) {
        console.error('Error setting saved chart data:', error);
      }
    }

    return () => chart.remove();
  }, []);

  // WebSocket connection to receive live data and update chart
  // useEffect(() => {
  //   const ws = new WebSocket('ws://localhost:8080');

  //   ws.onopen = () => {
  //    // console.log('Connected to WebSocket');
  //   };

  //   ws.onmessage = (event) => {
  //     try {
  //       const data = JSON.parse(event.data);

  //       // Validate the received data
  //       if (data && typeof data.value === 'number' && typeof data.time === 'number') {
  //         const newEntry = { time: data.time, value: data.value };

  //         if (areaSeries) {
  //           const updatedData = [...chartData, newEntry]; // Add new data point to chartData

  //           areaSeries.update(newEntry); // Update the chart with the new data point
  //           setChartData(updatedData); // Update the chartData state

  //           // Update today's high and low values based on the received data
  //           if (data.value > todaysHigh) {
  //             setTodaysHigh(data.value); // Update today's high if the new value is higher
  //           }
  //           if (data.value < todaysLow || todaysLow === 0) {
  //             setTodaysLow(data.value); // Update today's low if the new value is lower or if it's the first value
  //           }

  //           // Save the updated chartData to localStorage
  //           localStorage.setItem('chartData', JSON.stringify(updatedData));
  //         }
  //       } else {
  //       //  console.error('Invalid data received:', data);
  //       }
  //     } catch (error) {
  //      // console.error('Error processing WebSocket message:', error);
  //     }
  //   };

  //   ws.onclose = () => {
  //   //  console.log('WebSocket connection closed');
  //   };

  //   return () => ws.close();
  // }, [areaSeries, chartData, todaysHigh, todaysLow]);

  return (
    <Layout>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Card bordered={false} style={{ width: '100%', maxWidth: '1000px', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)', }}>
          <div ref={chartRef} style={{ height: '400px', width: '100%' }} />
        </Card>
        {/* Statistics Card - positioned below the chart */}
        <Card 
          bordered={false} 
          style={{ 
            width: '100%', 
            maxWidth: '1000px', 
            marginTop: '20px', 
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)', 
            padding: '4px 8px' // Padding for a slimmer look
          }}
        >
          <Row gutter={16} justify="space-between" align="middle">
            <Col style={{ textAlign: 'center' }}>
              <h4 style={{ margin: 0, fontSize: '12px' }}>Today's High</h4>
              <p style={{ margin: 0, fontSize: '12px', color: '#00b200' }}>{todaysHigh}</p>
            </Col>
            <Col style={{ textAlign: 'center' }}>
              <h4 style={{ margin: 0, fontSize: '12px' }}>Today's Low</h4>
              <p style={{ margin: 0, fontSize: '12px', color: '#ff0000' }}>{todaysLow}</p>
            </Col>
            <Col style={{ textAlign: 'center' }}>
              <h4 style={{ margin: 0, fontSize: '12px' }}>
                Advances
              </h4>
              <p style={{ margin: 0, fontSize: '12px', display: 'flex', alignItems: 'center' }}>
                <CaretUpOutlined style={{ color: '#00b200', marginRight: '4px' }} /> 1129
              </p>
            </Col>
            <Col style={{ textAlign: 'center' }}>
              <h4 style={{ margin: 0, fontSize: '12px' }}>
                Declines
              </h4>
              <p style={{ margin: 0, fontSize: '12px', display: 'flex', alignItems: 'center' }}>
                <CaretDownOutlined style={{ color: '#ff0000', marginRight: '4px' }} /> 1066
              </p>
            </Col>
            <Col style={{ textAlign: 'center' }}>
              <h4 style={{ margin: 0, fontSize: '12px' }}>
                Unchanged
              </h4>
              <p style={{ margin: 0, fontSize: '12px', display: 'flex', alignItems: 'center' }}>
                <MinusOutlined style={{ color: '#747c92', marginRight: '4px' }} /> 29
              </p>
            </Col>
          </Row>
        </Card>
      </Content>
    </Layout>
  );
};

export default NSEChart;
