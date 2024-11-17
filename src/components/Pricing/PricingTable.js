import React, { useState, useEffect } from 'react';
import { Tabs, Table } from 'antd';

const { TabPane } = Tabs;

const PricingTable = () => {
    const [activeTab, setActiveTab] = useState('equity');
    const [isMobile, setIsMobile] = useState(false);

    // Check screen size
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Adjust based on your mobile breakpoint
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Equity columns (only the first three for mobile)
    const equityColumns = [
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            onHeaderCell: () => ({ style: { fontSize: '16px', fontWeight: 'bold' } }),
            onCell: () => ({ style: { fontSize: '16px' } }),
        },
        {
            title: 'Equity Delivery',
            dataIndex: 'delivery',
            key: 'delivery',
            onHeaderCell: () => ({ style: { fontSize: '16px', fontWeight: 'bold' } }),
            onCell: () => ({ style: { fontSize: '16px' } }),
        },
        {
            title: 'Equity Intraday',
            dataIndex: 'intraday',
            key: 'intraday',
            onHeaderCell: () => ({ style: { fontSize: '16px', fontWeight: 'bold' } }),
            onCell: () => ({ style: { fontSize: '16px' } }),
        },
        {
            title: 'F&O - Futures',
            dataIndex: 'futures',
            key: 'futures',
            onHeaderCell: () => ({ style: { fontSize: '16px', fontWeight: 'bold' } }),
            onCell: () => ({ style: { fontSize: '16px' } }),
        },
        {
            title: 'F&O - Options',
            dataIndex: 'options',
            key: 'options',
            onHeaderCell: () => ({ style: { fontSize: '16px', fontWeight: 'bold' } }),
            onCell: () => ({ style: { fontSize: '16px' } }),
        },
    ];

    // Display only first three columns for mobile
    const displayedEquityColumns = isMobile ? equityColumns.slice(0, 3) : equityColumns;

    const equityData = [
        {
            key: '1',
            category: 'Brokerage',
            delivery: 'Zero Brokerage',
            intraday: '0.03% or Rs. 20/executed order whichever is lower',
            futures: '0.03% or Rs. 20/executed order whichever is lower',
            options: 'Flat Rs. 20 per executed order',
        },
        {
            key: '2',
            category: 'STT/CTT',
            delivery: '0.1% on buy & sell',
            intraday: '0.025% on the sell side',
            futures: '0.0125% on the sell side',
            options: (
                <ul style={{ paddingLeft: '20px' }}>
                    <li>0.125% of intrinsic value on exercised options</li>
                    <li>0.0625% on sell side (on premium)</li>
                </ul>
            ),
        },
        {
            key: '3',
            category: 'Transaction Charges',
            delivery: 'NSE: 0.00322%, BSE: 0.00375%',
            intraday: 'NSE: 0.00322%, BSE: 0.00375%',
            futures: 'NSE: 0.00188%, BSE: 0',
            options: 'NSE: 0.0495%, BSE: 0.0495% (on premium)',
        },
        {
            key: '4',
            category: 'GST',
            delivery: '18% on (brokerage + SEBI charges + transaction charges)',
            intraday: '18% on (brokerage + SEBI charges + transaction charges)',
            futures: '18% on (brokerage + SEBI charges + transaction charges)',
            options: '18% on (brokerage + SEBI charges + transaction charges)',
        },
        {
            key: '5',
            category: 'SEBI Charges',
            delivery: '₹10 / crore',
            intraday: '₹10 / crore',
            futures: '₹10 / crore',
            options: '₹10 / crore',
        },
        {
            key: '6',
            category: 'Stamp Charges',
            delivery: '₹1500 / crore on buy side',
            intraday: '₹300 / crore on buy side',
            futures: '₹200 / crore on buy side',
            options: '₹300 / crore on buy side',
        },
    ];

    const currencyColumns = [
        {
            title: 'Category', dataIndex: 'category', key: 'category', onHeaderCell: () => ({
                style: { fontSize: '16px', fontWeight: 'bold' }, // Heading font size
            }),
            onCell: () => ({
                style: { fontSize: '16px' }, // Data font size
            }),
        },
        {
            title: 'Currency Futures', dataIndex: 'futures', key: 'futures', onHeaderCell: () => ({
                style: { fontSize: '16px', fontWeight: 'bold' }, // Heading font size
            }),
            onCell: () => ({
                style: { fontSize: '16px' }, // Data font size
            }),
        },
        {
            title: 'Currency Options', dataIndex: 'options', key: 'options', onHeaderCell: () => ({
                style: { fontSize: '16px', fontWeight: 'bold' }, // Heading font size
            }),
            onCell: () => ({
                style: { fontSize: '16px' }, // Data font size
            }),
        },
    ];

    const currencyData = [
        {
            key: '1',
            category: 'Brokerage',
            futures: '0.03% or Rs. 20/executed order whichever is lower',
            options: 'Flat Rs. 20 per executed order',
        },
        {
            key: '2',
            category: 'STT/CTT',
            futures: 'N/A',
            options: 'N/A',
        },
        {
            key: '3',
            category: 'Transaction Charges',
            futures: 'NSE: 0.0009%, BSE: 0.00022%',
            options: 'NSE: 0.040%, BSE: 0.040% (on premium)',
        },
        {
            key: '4',
            category: 'GST',
            futures: '18% on (brokerage + SEBI charges + transaction charges)',
            options: '18% on (brokerage + SEBI charges + transaction charges)',
        },
        {
            key: '5',
            category: 'SEBI Charges',
            futures: '₹10 / crore',
            options: '₹10 / crore',
        },
        {
            key: '6',
            category: 'Stamp Charges',
            futures: '₹200 / crore on buy side',
            options: '₹300 / crore on buy side',
        },
    ];


    // Columns for F&O
    const commodityColumns = [
        {
            title: 'Category', dataIndex: 'category', key: 'category', onHeaderCell: () => ({
                style: { fontSize: '16px', fontWeight: 'bold' },
            }),
            onCell: () => ({
                style: { fontSize: '16px' },
            }),
        },
        {
            title: 'Futures', dataIndex: 'futures', key: 'futures', onHeaderCell: () => ({
                style: { fontSize: '16px', fontWeight: 'bold' },
            }),
            onCell: () => ({
                style: { fontSize: '16px' },
            }),
        },
        {
            title: 'Options', dataIndex: 'options', key: 'options', onHeaderCell: () => ({
                style: { fontSize: '16px', fontWeight: 'bold' },
            }),
            onCell: () => ({
                style: { fontSize: '16px' },
            }),
        },
    ];

    // Data for F&O
    const commodityData = [
        {
            key: '1',
            category: 'Brokerage',
            futures: '0.03% or Rs. 20/executed order whichever is lower',
            options: 'Flat Rs. 20 per executed order',
        },
        {
            key: '2',
            category: 'STT/CTT',
            futures: '0.01% on sell side',
            options: '0.05% on sell side (on premium)',
        },
        {
            key: '3',
            category: 'Transaction Charges',
            futures: 'MCX: 0.0026%',
            options: 'MCX: 0.05% (on premium)',
        },
        {
            key: '4',
            category: 'GST',
            futures: '18% on (brokerage + SEBI charges + transaction charges)',
            options: '18% on (brokerage + SEBI charges + transaction charges)',
        },
        {
            key: '5',
            category: 'SEBI Charges',
            futures: '₹10 / crore',
            options: '₹10 / crore',
        },
        {
            key: '6',
            category: 'Stamp Charges',
            futures: '₹200 / crore on buy side',
            options: '₹300 / crore on buy side',
        },
    ];

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px' }}>
            <h1 style={{ fontSize: '60px', textAlign: 'center', marginBottom: '20px' }}>Pricing Table</h1>
            <Tabs activeKey={activeTab} onChange={setActiveTab}>

                {/* Equity Tab */}
                <TabPane tab={<span style={{ fontSize: '24px' }}>Equity</span>} key="equity">
                    <Table columns={displayedEquityColumns} dataSource={equityData} pagination={false} />
                </TabPane>

                {/* Currency Tab */}
                <TabPane tab={<span style={{ fontSize: '24px' }}>Currency</span>} key="currency">
                    <Table columns={currencyColumns} dataSource={currencyData} pagination={false} />
                </TabPane>

                {/* F&O Tab */}
                <TabPane tab={<span style={{ fontSize: '24px' }}>F&O</span>} key="F&O">
                    <Table columns={commodityColumns} dataSource={commodityData} pagination={false} />
                </TabPane>

            </Tabs>
        </div>
    );
};

export default PricingTable;
