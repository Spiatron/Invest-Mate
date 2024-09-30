import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Pagination, Row, Col, Typography } from 'antd';

const { Option } = Select;
const { Title } = Typography;

const AdminPanel = () => {
    const [data, setData] = useState([...Array(50).keys()].map((i) => ({
        key: i,
        name: `User ${i + 1}`,
        status: i % 2 === 0 ? 'Active' : 'Frozen',
        accountType: i % 2 === 0 ? 'Customer' : 'Demat',
        paymentStatus: i % 3 === 0 ? 'Pending' : 'Approved'
    })));
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 10;

    // Show Modal for Add/Edit
    const showModal = (user = null) => {
        setEditingUser(user);
        setIsModalVisible(true);
    };

    // Handle Save User
    const handleSaveUser = (values) => {
        if (editingUser) {
            setData(data.map((user) => user.key === editingUser.key ? { ...editingUser, ...values } : user));
        } else {
            setData([...data, { ...values, key: data.length }]);
        }
        setIsModalVisible(false);
    };

    // Handle Delete User
    const handleDeleteUser = (key) => {
        setData(data.filter(user => user.key !== key));
    };

    // Table Columns
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Account Type',
            dataIndex: 'accountType',
            key: 'accountType',
        },
        {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <span>
                    <Button type="link" onClick={() => showModal(record)}>Edit</Button>
                    <Button type="link" danger onClick={() => handleDeleteUser(record.key)}>Delete</Button>
                </span>
            ),
        },
    ];

    // Pagination change handler
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div style={containerStyle}>
            <Title level={2} style={titleStyle}>Admin User Management</Title>
            <Button type="primary" onClick={() => showModal()} style={addButtonStyle}>Add User</Button>
            
            <Table
                columns={columns}
                dataSource={data.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                pagination={false}
                style={tableStyle}
            />
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={data.length}
                onChange={handlePageChange}
                style={paginationStyle}
            />

            <Modal
                title={editingUser ? "Edit User" : "Add User"}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form
                    onFinish={handleSaveUser}
                    initialValues={editingUser || { status: 'Active', accountType: 'Customer' }}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please enter user name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{ required: true }]}
                    >
                        <Select>
                            <Option value="Active">Active</Option>
                            <Option value="Frozen">Frozen</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="accountType"
                        label="Account Type"
                        rules={[{ required: true }]}
                    >
                        <Select>
                            <Option value="Customer">Customer</Option>
                            <Option value="Demat">Demat</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="paymentStatus"
                        label="Payment Status"
                        rules={[{ required: true }]}
                    >
                        <Select>
                            <Option value="Pending">Pending</Option>
                            <Option value="Approved">Approved</Option>
                            <Option value="Rejected">Rejected</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {editingUser ? 'Save' : 'Add'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

// Inline CSS
const containerStyle = {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
};

const titleStyle = {
    textAlign: 'center',
    marginBottom: '20px',
};

const addButtonStyle = {
    marginBottom: '20px',
};

const tableStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
};

const paginationStyle = {
    marginTop: '20px',
    textAlign: 'center',
};

export default AdminPanel;
