import React, { useEffect, useState, useRef } from 'react';

const LiveData = () => {
    const [data, setData] = useState({});
    const [metrics, setMetrics] = useState({});
    const [error, setError] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState("Disconnected");
    const [instruments, setInstruments] = useState({});
    const [selectedInstrument, setSelectedInstrument] = useState(null);

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
            })
            .catch(error => {
                console.error("Error fetching instruments:", error);
                setError("Failed to load instruments");
            });
    }, []);

    useEffect(() => {
        let socket;
        let reconnectInterval = 5000; // 5 seconds

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
               // console.log(WebSocket disconnected: Code=${event.code}, Reason=${event.reason});
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
        return <div style={{ color: 'red', padding: '20px', fontFamily: 'Arial, sans-serif' }}>Error: {error}</div>;
    }

    if (!selectedInstrument || !data[selectedInstrument] || data[selectedInstrument].last_price.length === 0) {
        return <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>Loading...</div>;
    }

    const instrumentData = data[selectedInstrument];
    const latestIndex = instrumentData.last_price.length - 1;

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Live Market Data</h1>
            <p>Status: <strong>{connectionStatus}</strong></p>
            <label>
                Select Instrument:
                <select value={selectedInstrument} onChange={(e) => setSelectedInstrument(Number(e.target.value))}>
                    {Object.entries(instruments).map(([token, name]) => (
                        <option key={token} value={token}>{name}</option>
                    ))}
                </select>
            </label>
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <div style={{ flex: 1 }}>
                    <h2>{instruments[selectedInstrument]} - Latest Tick</h2>
                    <ul>
                        <li>Last Price: {instrumentData.last_price[latestIndex]}</li>
                        <li>Open Price: {instrumentData.open[latestIndex]}</li>
                        <li>Close Price: {instrumentData.close[latestIndex]}</li>
                        <li>High Price: {instrumentData.high[latestIndex]}</li>
                        <li>Low Price: {instrumentData.low[latestIndex]}</li>
                        <li>Time: {instrumentData.time[latestIndex]}</li>
                    </ul>
                </div>
                <div style={{ flex: 1 }}>
                    <h2>Metrics</h2>
                    <ul>
                        <li>Current Price: {metrics.current_price}</li>
                        <li>Price Change: {metrics.price_change}</li>
                        <li>Percent Change: {metrics.percent_change?.toFixed(2)}%</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LiveData;