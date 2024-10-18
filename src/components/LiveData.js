// frontend/src/LiveData.js

import React, { useEffect, useState } from 'react';

const LiveData = () => {
    const [data, setData] = useState({
        time: [],
        high: [],
        low: [],
        open: [],
        close: [],
        last_price: []
    });
    const [metrics, setMetrics] = useState({});
    const [error, setError] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState("Disconnected");

    useEffect(() => {
        let socket;
        let reconnectInterval = 5000; // 5 seconds

        const connectWebSocket = () => {
            // Update the WebSocket URL if your backend is hosted elsewhere
            socket = new WebSocket("ws://localhost:8000/ws");

            socket.onopen = () => {
                console.log('Connected to WebSocket server');
                setConnectionStatus("Connected");
                setError(null);
            };

            socket.onmessage = (event) => {
                console.log("WebSocket message received:", event.data);
                 // Add a 2-second delay before processing the message
            setTimeout(() => {
                try {
                    const message = JSON.parse(event.data);

                    if (message.type === "initial_data") {
                        // Handle initial data
                        const initialData = message.data;
                        setData(initialData);

                        // Calculate metrics based on the initial data
                        if (initialData.last_price.length >= 2) {
                            const current_price = initialData.last_price[initialData.last_price.length - 1];
                            const previous_price = initialData.last_price[initialData.last_price.length - 2];
                            const price_change = current_price - previous_price;
                            const percent_change = previous_price !== 0 ? (price_change / previous_price) * 100 : 0;

                            setMetrics({
                                current_price,
                                price_change,
                                percent_change
                            });
                        }
                    } else if (message.type === "tick") {
                        // Handle new tick data
                        const newTick = message.data;
                        setData(prevData => ({
                            time: [...prevData.time, newTick.exchange_timestamp || newTick.timestamp || new Date().toLocaleString()],
                            high: [...prevData.high, newTick.ohlc?.high || 0],
                            low: [...prevData.low, newTick.ohlc?.low || 0],
                            open: [...prevData.open, newTick.ohlc?.open || 0],
                            close: [...prevData.close, newTick.ohlc?.close || 0],
                            last_price: [...prevData.last_price, newTick.last_price || 0]
                        }));

                        setMetrics(prevMetrics => {
                            const current_price = newTick.last_price || prevMetrics.current_price || 0;
                            const previous_price = prevMetrics.current_price || current_price;
                            const price_change = current_price - previous_price;
                            const percent_change = previous_price !== 0 ? (price_change / previous_price) * 100 : 0;
                            
                            return {
                                current_price,
                                price_change,
                                percent_change
                            };
                        });
                    } else {
                        console.warn("Unknown message type:", message.type);
                    }

                } catch (err) {
                    console.error("Error parsing WebSocket message:", err);
                }
            }, 2000); // 2-second delay
            };

            socket.onerror = (err) => {
                console.error("WebSocket error:", err);
                setError("WebSocket connection error");
            };

            socket.onclose = (event) => {
                console.log(`WebSocket disconnected: Code=${event.code}, Reason=${event.reason}`);
                setConnectionStatus("Disconnected");
                if (!event.wasClean) {
                    setError("WebSocket connection closed unexpectedly. Attempting to reconnect...");
                    // Attempt to reconnect after a delay
                    setTimeout(() => {
                        console.log("Attempting to reconnect WebSocket...");
                        connectWebSocket();
                    }, reconnectInterval);
                }
            };
        };

        connectWebSocket();

        // Cleanup function to close the WebSocket when the component unmounts
        return () => {
            if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
                socket.close();
                console.log('WebSocket disconnected');
            }
        };
    }, []); // Empty dependency array ensures this runs only once on mount

    // if (error) {
    //     return <div style={{ color: 'red', padding: '20px', fontFamily: 'Arial, sans-serif' }}>Error: {error}</div>;
    // }

    // Loading state if no data yet
    if (data.last_price.length === 0) {
        return <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>Loading...</div>;
    }

    // Display the latest tick data
    const latestIndex = data.last_price.length - 1;

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Live Market Data</h1>
            <p>Status: <strong>{connectionStatus}</strong></p>
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <div style={{ flex: 1 }}>
                    <h2>Latest Tick</h2>
                    <ul>
                        <li>Last Price: {data.last_price[latestIndex]}</li>
                        <li>Open Price: {data.open[latestIndex]}</li>
                        <li>Close Price: {data.close[latestIndex]}</li>
                        <li>High Price: {data.high[latestIndex]}</li>
                        <li>Low Price: {data.low[latestIndex]}</li>
                        <li>Time: {data.time[latestIndex]}</li>
                    </ul>
                </div>
                <div style={{ flex: 1 }}>
                    <h2>Metrics</h2>
                    <ul>
                        <li>Current Price: {metrics.current_price}</li>
                        <li>Price Change: {metrics.price_change}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LiveData;