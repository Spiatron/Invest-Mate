import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Pagination, Typography, Select, Row, Col, message } from 'antd';
import { Country, State, City } from 'country-state-city';

const { Title } = Typography;
const { Option } = Select;

const AdminPanel = () => {
    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCountry, setSelectedCountry] = useState('IN');
    const [selectedState, setSelectedState] = useState('');    

    const [form] = Form.useForm(); // Create form instance

    const pageSize = 10;

    const showModal = () => {
        setIsModalVisible(true);
    };

    useEffect(() => {
        const fetchModerators = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    message.error("Token not found");
                    console.error("Token not found");
                    return;
                }
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/admin/getAllModerators`, {
                    method: 'GET',
                    headers: {
                        "token": token,
                    },
                });
                
                if (response.ok) {
                    const result = await response.json();
                    const formattedData = result.map((item, index) => ({
                        key: index,
                        username: item.username,
                        email: item.email,
                        mobileNumber: item.mobileNumber,
                        aadhaar: item.aadhaar,
                        pan: item.pan,
                        country: item.address.country,
                        state: item.address.state,
                        city: item.address.city,
                    }));
                    setData(formattedData);
                } else {
                    message.error('Failed to fetch moderators');
                }
            } catch (error) {
                console.error('Error fetching moderators:', error);
                message.error('Error fetching moderators');
            }
        };

        fetchModerators();
    }, []);

    // const handleSaveUser = async (values) => {
    //     setData([...data, { ...values, key: data.length }]);
    //     setIsModalVisible(false);
    //     form.resetFields(); // Reset form fields after saving
    // };

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
            title: 'Mobile Number',
            align: 'center',
            dataIndex: 'mobileNumber',
            key: 'mobileNumber',
        },
        {
            title: 'Aadhaar Number',
            align: 'center',
            dataIndex: 'aadhaar',
            key: 'aadhaar',
        },
        {
            title: 'PAN Number',
            align: 'center',
            dataIndex: 'pan',
            key: 'pan',
        },
        {
            title: 'Country',
            align: 'center',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'State',
            align: 'center',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: 'City',
            align: 'center',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'Actions',
            align: 'center',
            key: 'actions',
            render: (text, record) => (
                <span>
                    <Button type="link" danger>Remove</Button>
                </span>
            ),
        },
    ];

    const handleCountryChange = (value) => {
        setSelectedCountry(value);
        setSelectedState('');
    };

    const handleStateChange = (value) => {
        setSelectedState(value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const token = localStorage.getItem('token');
    if (!token) {
      message.error("Token not found");
      console.error("Token not found");
      return;
    }

    const handleSaveUser = async (values) => {
    // Get full state name from the selected state ISO code
    const stateName = State.getStatesOfCountry(selectedCountry).find(
        (state) => state.isoCode === values.state
    )?.name;

        const payload = {
            username: values.username,
            email: values.email,
            mobileNumber: `+91${values.mobileNumber}`,
            address: {
                country: values.country,
                state: stateName,
                city: values.city
            },
            role: 'moderator',
            password: values.password,
            aadhaar: values.aadhaar,
            pan: values.pan,
        };
        console.log(payload);
    
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/admin/addAdmin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "token": token,
                },
                body: JSON.stringify(payload),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                // Success block
                message.success(data.message); // Display success message
                setIsModalVisible(false);
                form.resetFields(); // Reset form fields after saving
            } else {
                // Error block (handling specific API errors)
                message.error(`Error: ${data.error || 'Unknown error'}`, 5); // Display error message from the API
            }
    
        } catch (error) {
            // Catch block for network or unexpected errors
            console.error('Error occurred:', error);
            message.error(`Error: ${error.message}`, 5); // Display error message for 5 seconds
        }
    };
    


    return (
        <div style={containerStyle}>
            <div style={titleContainerStyle}>
                <Title level={2} style={titleStyle}>Moderators Management</Title>
            </div>
            <Button type="primary" onClick={showModal} style={addButtonStyle}>Add Moderators</Button>

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
                visible={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    form.resetFields(); // Reset fields when closing modal
                }}

                footer={null}
            >
                <Form form={form} onFinish={handleSaveUser} layout="vertical">
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: 'Please enter a username' }]}>
                        <Input placeholder="Enter username" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Please enter an email' }, { type: 'email', message: "Please include an '@' in your email address!" }]}>
                        <Input placeholder="Enter email" />
                    </Form.Item>
                    <Form.Item
                        name="mobileNumber"
                        label="Mobile Number"
                        rules={[{ required: true, message: 'Please enter a mobile number' }, { len: 10, message: 'Mobile number must be 10 digits' }]}>
                        <Input addonBefore="+91" placeholder="Enter mobile number" />
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="aadhaar"
                                label="Aadhaar Number"
                                rules={[{ required: true, message: 'Please enter your Aadhaar number' }, { len: 12, message: 'Aadhaar number must be 12 digits' }, { pattern: /^\d{12}$/, message: 'Aadhaar number must be numeric' }]}>
                                <Input placeholder="Enter Aadhaar number" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="pan"
                                label="PAN Number"
                                rules={[{ required: true, message: 'Please enter your PAN number' },
                                { pattern: /^[A-Z0-9]{10}$/, message: 'Must be a 10-digit alphanumeric code!' },
                                ]}>
                                <Input placeholder="Enter PAN number" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Address" required>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    name="country"
                                    initialValue="India"
                                    rules={[{ required: true, message: 'Please select a country' }]}>
                                    <Select onChange={handleCountryChange} placeholder="Country" disabled>
                                        {Country.getAllCountries().map((country) => (
                                            <Option key={country.isoCode} value={country.isoCode}>
                                                {country.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="state"
                                    rules={[{ required: true, message: 'Please select a state' }]}>
                                    <Select onChange={handleStateChange} placeholder="State" disabled={!selectedCountry}>
                                        {State.getStatesOfCountry(selectedCountry).map((state) => (
                                            <Option key={state.isoCode} value={state.isoCode}>
                                                {state.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="city"
                                    rules={[{ required: true, message: 'Please select a city' }]}>
                                    <Select placeholder="City" disabled={!selectedState}>
                                        {City.getCitiesOfState(selectedCountry, selectedState).map((city) => (
                                            <Option key={city.name} value={city.name}>
                                                {city.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[{ required: true, message: 'Please enter a password' }, { min: 8, message: 'Password must be at least 8 characters long!' }]}>
                                <Input.Password placeholder="Enter password" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="confirmPassword"
                                label="Confirm Password"
                                rules={[
                                    { required: true, message: 'Please confirm your password' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The two passwords do not match!'));
                                        },
                                    }),
                                ]}>
                                <Input.Password placeholder="Confirm password" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Add Admin
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

const containerStyle = {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
};

const titleContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
};

const titleStyle = {
    margin: 0,
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
