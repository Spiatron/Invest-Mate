import React, { useEffect, useState, useRef } from 'react';
import { Skeleton } from 'antd'; // Import Skeleton from Ant Design
import StockCharts from './StockCharts';
import StocksTable from './StocksTable';

const BuyPage = () => {
    const [data, setData] = useState({});
    const [metrics, setMetrics] = useState({});
    const [error, setError] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState("Disconnected");
    const [instruments, setInstruments] = useState({});
    const [selectedInstrument, setSelectedInstrument] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    const selectedInstrumentRef = useRef(selectedInstrument);

    useEffect(() => {
        selectedInstrumentRef.current = selectedInstrument;
    }, [selectedInstrument]);

    // Fetch the list of instruments from the backend
    useEffect(() => {
        fetch("http://localhost:8000/api/instruments")
            .then(response => response.json())
            .then(data => {
                setInstruments(data);
                // Set default selected instrument
                const defaultInstrumentToken = Object.keys(data)[0];
                setSelectedInstrument(Number(defaultInstrumentToken));
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch(error => {
                console.error("Error fetching instruments:", error);
                setError("Failed to load instruments");
                setLoading(false); // Set loading to false on error
            });
    }, []);

    useEffect(() => {
        let socket;
        let reconnectInterval = 2000; // 5 seconds

        const connectWebSocket = () => {
            socket = new WebSocket("ws://localhost:8000/ws");

            socket.onopen = () => {
                console.log('Connected to WebSocket server');
                setConnectionStatus("Connected");
                setError(null);
            };

            socket.onmessage = (event) => {
                console.log("WebSocket message received:", event.data);
                try {
                    const message = JSON.parse(event.data);

                    if (message.type === "initial_data") {
                        // Store initial data for all instruments
                        const initialData = message.data;
                        setData(initialData);
                        setLoading(false); // Set loading to false when initial data is received
                    } else if (message.type === "tick") {
                        const newTick = message.data;
                        const instrumentToken = newTick.instrument_token;

                        // Update data for this instrument
                        setData(prevData => {
                            const instrumentData = prevData[instrumentToken] || {
                                time: [],
                                high: [],
                                low: [],
                                open: [],
                                close: [],
                                last_price: [],
                            };

                            const updatedInstrumentData = {
                                ...instrumentData,
                                time: [...instrumentData.time, newTick.exchange_timestamp || newTick.timestamp || new Date().toLocaleString()],
                                high: [...instrumentData.high, newTick.ohlc?.high || 0],
                                low: [...instrumentData.low, newTick.ohlc?.low || 0],
                                open: [...instrumentData.open, newTick.ohlc?.open || 0],
                                close: [...instrumentData.close, newTick.ohlc?.close || 0],
                                last_price: [...instrumentData.last_price, newTick.last_price || 0],
                            };

                            return {
                                ...prevData,
                                [instrumentToken]: updatedInstrumentData,
                            };
                        });

                        // Update metrics if the tick is for the selected instrument
                        if (instrumentToken === selectedInstrumentRef.current) {
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
                        }
                    }
                } catch (err) {
                    console.error("Error parsing WebSocket message:", err);
                }
            };

            socket.onerror = (err) => {
                console.error("WebSocket error:", err);
                setError("WebSocket connection error");
            };

            socket.onclose = (event) => {
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

    if (error) {
        return console.log(error);
    }

    // Use Ant Design Skeleton for loading state
    if (loading || !selectedInstrument || !data[selectedInstrument] || data[selectedInstrument].last_price.length === 0) {
        return (
            <div style={{ padding: '20px' }}>
                <Skeleton active paragraph={{ rows: 400 }} />
                <Skeleton active paragraph={{ rows: 400 }} />
            </div>
        );
    }

    const instrumentData = data[selectedInstrument];
    const latestIndex = instrumentData.last_price.length - 1;

    // Prepare data for StockCharts component
    const stockChartData = {
        lastPrice: instrumentData.last_price,
        openPrice: instrumentData.open,
        closePrice: instrumentData.close,
        highPrice: instrumentData.high,
        lowPrice: instrumentData.low,
        time: instrumentData.time,
    };
    console.log(`Passing StockData to Stockcharts Component:`, stockChartData);
    console.log(instrumentData);


    return (
        <div style={{ minHeight: '100vh' }}>
            <div style={{ marginTop: '40px' }}>
                <StockCharts data={stockChartData} />
            </div>
            <div style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '20px', backgroundColor: '#fff', marginTop: '20px' }}>
                <StocksTable stockData={Object.entries(data).map(([token, instrumentData]) => {
                    const latestIndex = instrumentData.last_price.length - 1;
                    const lastPrice = instrumentData.last_price[latestIndex];

                    return {
                        key: token,
                        name: instruments[token] || 'Unknown',
                        lastPrice: !isNaN(lastPrice) ? parseFloat(lastPrice) : 0,  // Convert to float or fallback to 0
                    };
                })} instruments={instruments} />
            </div>
        </div>
    );
};

export default BuyPage;
