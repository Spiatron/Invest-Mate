import React from 'react';
import { Table, Tag, Row, Col } from 'antd';

const ChargesTable = () => {
    const accountOpeningColumns = [
        {
            title: 'Type of account',
            dataIndex: 'type',
            key: 'type',
            width: '80%', // Increased width for "Type of account"
        },
        {
            title: 'Charges',
            dataIndex: 'charges',
            key: 'charges',
            width: '20%', // Smaller width for "Charges"
            render: (text) => (
                <Tag color={text === 'FREE' ? 'red' : 'volcano'}>
                    {text}
                </Tag>
            ),
        },
    ];

    const accountOpeningData = [
        {
            key: '1',
            type: 'Online account',
            charges: 'FREE',
        },
        {
            key: '2',
            type: 'Offline account',
            charges: 'FREE',
        },
        {
            key: '3',
            type: 'NRI account (offline only)',
            charges: '₹ 500',
        },
        {
            key: '4',
            type: 'Partnership, LLP, HUF, or Corporate accounts (offline only)',
            charges: '₹ 500',
        },
    ];

    const valueAddedColumns = [
        {
            title: 'Service',
            dataIndex: 'service',
            key: 'service',
            width: '40%', // Larger width for "Service"
        },
        {
            title: 'Billing Frequency',
            dataIndex: 'billing',
            key: 'billing',
            width: '30%', // Medium width for "Billing Frequency"
        },
        {
            title: 'Charges',
            dataIndex: 'charges',
            key: 'charges',
            width: '30%', // Medium width for "Charges"
        },
    ];

    const valueAddedData = [
        {
            key: '1',
            service: 'Tickertape',
            billing: 'Monthly / Annual',
            charges: 'Free: 0 | Pro: 249/2399',
        },
        {
            key: '2',
            service: 'Smallcase',
            billing: 'Per transaction',
            charges: 'Buy & Invest More: 100 | SIP: 10',
        },
        {
            key: '3',
            service: 'Kite Connect',
            billing: 'Monthly',
            charges: 'Connect: 2000 | Historical: 2000',
        },
    ];

    return (
        <div>
            <Row justify="center" style={{ marginBottom: '20px' }}>
                <Col  xs={24} md={24}> {/* Adjust the span to match the desired width */}
                    <h2>Charges for account opening</h2>
                    <Table
                        columns={accountOpeningColumns}
                        dataSource={accountOpeningData}
                        pagination={false}
                        style={{ width: '100%' }}
                        scroll={{ x: '100%' }}
                    />
                </Col>
            </Row>

            <Row justify="center"  style={{marginTop:"50px", marginBottom:"50px"}}>
                <Col xs={24} md={24}> {/* Adjust the span to match the desired width */}
                    <h2>Charges for optional value added services</h2>
                    <Table
                        columns={valueAddedColumns}
                        dataSource={valueAddedData}
                        pagination={false}
                        style={{ width: '100%' }}
                        scroll={{ x: '100%' }}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default ChargesTable;
