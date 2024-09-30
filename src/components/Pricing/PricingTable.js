import React, { useState } from 'react';
import { Tabs, Table } from 'antd';

const { TabPane } = Tabs;

const PricingTable = () => {
    const [activeTab, setActiveTab] = useState('equity');

    const equityColumns = [
        {
            title: 'Category', dataIndex: 'category', key: 'category', onHeaderCell: () => ({
                style: { fontSize: '16px', fontWeight: 'bold' }, // Heading font size
            }),
            onCell: () => ({
                style: { fontSize: '16px' }, // Data font size
            }),
        },
        {
            title: 'Equity Delivery', dataIndex: 'delivery', key: 'delivery', onHeaderCell: () => ({
                style: { fontSize: '16px', fontWeight: 'bold' }, // Heading font size
            }),
            onCell: () => ({
                style: { fontSize: '16px' }, // Data font size
            }),
        },
        {
            title: 'Equity Intraday', dataIndex: 'intraday', key: 'intraday', onHeaderCell: () => ({
                style: { fontSize: '16px', fontWeight: 'bold' }, // Heading font size
            }),
            onCell: () => ({
                style: { fontSize: '16px' }, // Data font size
            }),
        },
        {
            title: 'F&O - Futures', dataIndex: 'futures', key: 'futures', onHeaderCell: () => ({
                style: { fontSize: '16px', fontWeight: 'bold' }, // Heading font size
            }),
            onCell: () => ({
                style: { fontSize: '16px' }, // Data font size
            }),
        },
        {
            title: 'F&O - Options', dataIndex: 'options', key: 'options', onHeaderCell: () => ({
                style: { fontSize: '16px', fontWeight: 'bold' }, // Heading font size
            }),
            onCell: () => ({
                style: { fontSize: '16px' }, // Data font size
            }),
        },
    ];

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

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px' }}>
            <h1 style={{ fontSize: '60px', textAlign: 'center', marginBottom: '20px' }}>Pricing Table</h1>
            <Tabs activeKey={activeTab} onChange={setActiveTab}>

                {/* Equity Tab */}
                <TabPane tab={<span style={{ fontSize: '24px' }}>Equity</span>} key="equity">
                    <Table columns={equityColumns} dataSource={equityData} pagination={false} />
                </TabPane>

                {/* Currency Tab */}
                <TabPane tab={<span style={{ fontSize: '24px' }}>Currency</span>} key="currency">
                    <Table columns={currencyColumns} dataSource={currencyData} pagination={false} />
                </TabPane>

            </Tabs>
            {/* Add the "Calculate your costs upfront" text here */}
            <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '24px', fontWeight: '500' }}>
                Calculate your costs upfront using our <a href="/brokerage-calculator" style={{ color: "#ff0000" }}>brokerage calculator</a>.
            </div>
        </div>
    );
};

export default PricingTable;
