import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Pagination, Typography, Descriptions, Row, Col, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Title } = Typography;
const { confirm: antdConfirm } = Modal; // Rename 'confirm' to 'antdConfirm' to avoid conflicts

const CustomerPanel = () => {
    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [detailsModalVisible, setDetailsModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [viewingUser, setViewingUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [approvalFilter, setApprovalFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [kycDisabled, setKycDisabled] = useState(false); // KYC DropDown disabler after one

    const pageSize = 10;

    // Fetch users from the API with filters applied
    const fetchUsers = async () => {
        try {
            let url = '';
    
            // Determine which API to hit based on the filters
            if (approvalFilter) {
                // If 'kycStatus' filter is applied, use the 'getUsersByKYC' endpoint
                url = `${process.env.REACT_APP_API_URL}/api/v1/admin/getUsersByKYC?kycStatus=${approvalFilter}`;
            } else if (statusFilter) {
                // If 'status' filter is applied, use the 'getUsersByStatus' endpoint
                url = `${process.env.REACT_APP_API_URL}/api/v1/admin/getUsersByStatus?status=${statusFilter}`;
            } else {
                // If no filters are applied, default to fetching pending users from 'getUsersByKYC'
                url = `${process.env.REACT_APP_API_URL}/api/v1/admin/getUsersByKYC`;
            }
    
            // If there is search text, append it to the URL
            if (searchText) {
                const searchParam = `search=${encodeURIComponent(searchText)}`;
                url += url.includes('?') ? `&${searchParam}` : `?${searchParam}`;
            }
    
            console.log('Fetching URL:', url); // Debugging to check the constructed URL
    
            const response = await fetch(url, { method: 'GET' });
            const users = await response.json();
    
            console.log('Fetched users:', users);
            setData(users);  // Update the state with the fetched users
    
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    
    

    // Fetch users whenever filters or search text change
    useEffect(() => {
        fetchUsers();
    }, [approvalFilter, statusFilter, searchText]);


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

    // Handle Delete User
    const handleDeleteUser = (id) => {
        setData(data.filter(user => user._id !== id));
    };

    // Table Columns
    const columns = [
        {
            title: 'Username',
            align: 'center',
            dataIndex: 'username',
            key: 'username',
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
            dataIndex: 'kycStatus',
            key: 'kycStatus',
            align: 'center',
            render: (kycStatus) => {
                const approvalStyles = {
                    pending: { color: '#ffc917' }, // yellow
                    approved: { color: '#38b000' }, // green
                    rejected: { color: '#ff0000' }, // red
                };
                return <span style={approvalStyles[kycStatus.toLowerCase()]}>{kycStatus}</span>;
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'center',
            render: (text, record) => (
                <>
                    <Button type="link" onClick={() => showModal(record)}>Edit</Button>
                    <Button type="link" danger onClick={() => handleDeleteUser(record._id)}>Remove</Button>
                    <Button type="link" onClick={() => showDetailsModal(record)}>Details</Button>
                </>
            ),
        },
    ];

    const filteredData = data.filter(user => {
        const matchesSearch = user.username.toLowerCase().includes(searchText.toLowerCase()) ||
            user.email.toLowerCase().includes(searchText.toLowerCase()) ||
            user.aadhaar.toLowerCase().includes(searchText.toLowerCase()) ||
            user.pan.toLowerCase().includes(searchText.toLowerCase());

        const matchesApproval = !approvalFilter || user.kycStatus === approvalFilter;

        const matchesStatus = !statusFilter || user.status === statusFilter || user.kycStatus === approvalFilter;

        return matchesSearch && matchesApproval && matchesStatus;
    });
    console.log(filteredData)

    // Pagination change handler
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Handle Save User (Approve/Reject)
    const handleSaveUser = (values) => {
        const { kycStatus } = values;

        // Show confirmation popup
        antdConfirm({
            title: 'KYC Status',
            icon: <ExclamationCircleOutlined />,
            content: `Are you sure you want to ${kycStatus === 'approved' ? 'approve' : 'reject'} this user? This action cannot be undone.`,
            onOk: async () => {
                try {
                    // Call the appropriate API based on the KYC status
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/admin/${kycStatus === 'approved' ? 'approveUser' : 'rejectUser'}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ aadhaar: editingUser.aadhaar }),
                    });

                    if (!response.ok) {
                        throw new Error('Error processing user status');
                    }

                    const result = await response.json();
                    message.success(result.message || 'User processed successfully');

                    // Disable the KYC dropdown after confirmation
                    setKycDisabled(true);

                    // Update the local state with the new KYC status
                    setData(data.map((user) => user._id === editingUser._id ? { ...user, ...values } : user));
                    setIsModalVisible(false);  // Close the modal

                } catch (error) {
                    console.error('Error:', error);
                    message.error('Error processing KYC status');
                }
            },
            onCancel() {
                console.log('Cancel action');
            },
        });
    };

    return (
        <div style={containerStyle}>
            <Title level={2} style={titleStyle}>Admin Customer Management</Title>

            {/* Search and Filters */}
            <Row gutter={16}>
                <Col>
                    <Input
                        placeholder="Search by Username, Email, Aadhaar or PAN"
                        onChange={(e) => setSearchText(e.target.value)}
                        style={searchInputStyle}
                    />
                </Col>
                <Col>
                    <Select
                        placeholder="Filter by KYC Status"
                        onChange={(value) => setApprovalFilter(value)}
                        style={{ width: 200 }}
                        allowClear
                    >
                        <Option value="approved">Approved</Option>
                        <Option value="rejected">Rejected</Option>
                        <Option value="pending">Pending</Option>
                    </Select>
                </Col>
                <Col>
                    <Select
                        placeholder="Filter by Status"
                        onChange={(value) => setStatusFilter(value)}
                        style={{ width: 200 }}
                        allowClear
                    >
                        <Option value="active">Active</Option>
                        <Option value="frozen">Frozen</Option>
                    </Select>
                </Col>
            </Row>

            {/* Table and Pagination */}
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
                    initialValues={editingUser || { status: 'active', kycStatus: 'pending' }} // Default values
                >
                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{ required: true }]}
                    >
                        <Select>
                            <Option value="active">Active</Option>
                            <Option value="frozen">Frozen</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="kycStatus"
                        label="KYC Status"
                        rules={[{ required: true }]}
                        style={editingUser?.kycStatus === 'approved' ? { display: 'none' } : {}} // Hide if approved
                    >
                        <Select disabled={editingUser?.kycDisabled}>
                            <Option value="approved">Approve</Option>
                            <Option value="rejected">Reject</Option>
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
                        <Descriptions.Item label="Username">{viewingUser.username}</Descriptions.Item>
                        <Descriptions.Item label="Email">{viewingUser.email}</Descriptions.Item>
                        <Descriptions.Item label="PAN">{viewingUser.pan}</Descriptions.Item>
                        <Descriptions.Item label="Aadhaar">{viewingUser.aadhaar}</Descriptions.Item>
                        <Descriptions.Item label="Mobile Number">{viewingUser.mobileNumber}</Descriptions.Item>
                        <Descriptions.Item label="Status">{viewingUser.status}</Descriptions.Item>
                        <Descriptions.Item label="KYC Status">{viewingUser.kycStatus}</Descriptions.Item>
                        <Descriptions.Item label="Profile Photo">
                            <img src={viewingUser.profilePhoto} alt="Profile" style={{ width: 100 }} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Signature">
                            <img src={viewingUser.signature} alt="Signature" style={{ width: 100 }} />
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
        </div>
    );
};

// Styles (you can adjust them as needed)
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
