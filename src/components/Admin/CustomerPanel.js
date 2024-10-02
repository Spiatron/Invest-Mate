import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Pagination, Typography, Descriptions } from 'antd';

const { Option } = Select;
const { Title } = Typography;

const CustomerPanel = () => {
    const [data, setData] = useState([...Array(50).keys()].map((i) => ({
        key: i,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        pan: `PAN${i + 1}`,
        aadhaar: `AADHAAR${i + 1}`,
        dob: '1990-01-01',
        phone: `123456789${i}`,
        country: 'India',
        state: 'State Name',
        city: 'City Name',
        bankAccount: `1234567890${i}`,
        branchMicr: `MICR${i}`,
        branchIfsc: `IFSC${i}`,
        status: i % 2 === 0 ? 'Active' : 'Frozen',
        approval: 'Pending', // Default approval status
    })));
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [detailsModalVisible, setDetailsModalVisible] = useState(false); // For details modal
    const [editingUser, setEditingUser] = useState(null);
    const [viewingUser, setViewingUser] = useState(null); // For details modal
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');

    const pageSize = 10;

    // Show Modal for Edit
    const showModal = (user) => {
        setEditingUser(user);
        setIsModalVisible(true);
    };

    // Show Modal for Details
    const showDetailsModal = (user) => {
        setViewingUser(user);
        setDetailsModalVisible(true);
    };

    // Handle Save User
    const handleSaveUser = (values) => {
        setData(data.map((user) => user.key === editingUser.key ? { ...user, ...values } : user));
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
            align: 'center',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            align: 'center',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'PAN',
            align: 'center',
            dataIndex: 'pan',
            key: 'pan',
        },
        {
            title: 'Aadhaar',
            align: 'center',
            dataIndex: 'aadhaar',
            key: 'aadhaar',
        },
        {
            title: 'Status',
            align: 'center',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Approval',
            dataIndex: 'approval',
            key: 'approval',
            align: 'center',
            render: (approval) => {
                const approvalStyles = {
                    Pending: { color: '#ffba08' }, //yellow
                    Approved: { color: '#38b000' }, //green
                    Rejected: { color: '#ff0000' }, //red
                };

                return <span style={approvalStyles[approval]}>{approval}</span>;
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'center',
            render: (text, record) => (
                <>
                    <Button type="link" onClick={() => showModal(record)}>Edit</Button>
                    <Button type="link" danger onClick={() => handleDeleteUser(record.key)}>Remove</Button>
                    <Button type="link" onClick={() => showDetailsModal(record)}>Details</Button>
                </>
            ),
        },
    ];

    // Filter data based on search input
    const filteredData = data.filter(user =>
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase()) ||
        user.aadhaar.toLowerCase().includes(searchText.toLowerCase()) ||
        user.pan.toLowerCase().includes(searchText.toLowerCase())
    );

    // Pagination change handler
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div style={containerStyle}>
            <Title level={2} style={titleStyle}>Admin Customer Management</Title>

                <Input
                    placeholder="Search by Name, Email, Aadhaar or PAN"
                    onChange={(e) => setSearchText(e.target.value)}
                    style={searchInputStyle}
                />

            <Table
                columns={columns}
                dataSource={filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                pagination={false}
                style={tableStyle}
            />
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredData.length}
                onChange={handlePageChange}
                style={paginationStyle}
            />

            {/* Edit Modal */}
            <Modal
                title="Edit User"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form
                    onFinish={handleSaveUser}
                    initialValues={editingUser || { status: 'Active', approval: 'Pending' }} // Default approval is pending
                >
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
                        name="approval"
                        label="Approval"
                        rules={[{ required: true }]}
                    >
                        <Select>
                            <Option value="Approved">Approve</Option>
                            <Option value="Rejected">Reject</Option>
                            <Option value="Pending">Pending</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Details Modal */}
            <Modal
                title="User Details"
                visible={detailsModalVisible}
                onCancel={() => setDetailsModalVisible(false)}
                footer={null}
                centered
                width={800}
            >
                {viewingUser && (
                    <Descriptions
                        bordered
                        column={2}
                        size="middle"
                        layout="horizontal"
                        style={descriptionStyle}
                    >
                        <Descriptions.Item label="userName">{viewingUser.name}</Descriptions.Item>
                        <Descriptions.Item label="Email">{viewingUser.email}</Descriptions.Item>
                        <Descriptions.Item label="PAN">{viewingUser.pan}</Descriptions.Item>
                        <Descriptions.Item label="Aadhaar">{viewingUser.aadhaar}</Descriptions.Item>
                        <Descriptions.Item label="Date of Birth">{viewingUser.dob}</Descriptions.Item>
                        <Descriptions.Item label="Phone Number">{viewingUser.phone}</Descriptions.Item>
                        <Descriptions.Item label="Country">{viewingUser.country}</Descriptions.Item>
                        <Descriptions.Item label="State">{viewingUser.state}</Descriptions.Item>
                        <Descriptions.Item label="City">{viewingUser.city}</Descriptions.Item>
                        <Descriptions.Item label="Bank Account">{viewingUser.bankAccount}</Descriptions.Item>
                        <Descriptions.Item label="Branch MICR Code">{viewingUser.branchMicr}</Descriptions.Item>
                        <Descriptions.Item label="Branch IFSC">{viewingUser.branchIfsc}</Descriptions.Item>
                    </Descriptions>
                )}
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

const searchInputStyle = {
    marginBottom: '10px',
    width: '500px',
    marginLeft: 'auto',
    display: 'block',
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

const descriptionStyle = {
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

export default CustomerPanel;
