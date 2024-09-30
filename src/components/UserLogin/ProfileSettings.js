import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ProfileSettings = () => {
    const [form] = Form.useForm();

    const handleFormSubmit = (values) => {
        console.log('Updated Info:', values);
        // Handle logic for updating the profile (e.g., API call)
    };

    // Inline styles
    const containerStyle = {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5',
    };

    const formBoxStyle = {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '500px',
    };

    const formItemStyle = {
        marginBottom: '20px',
    };

    return (
        <div style={containerStyle}>
            <div style={formBoxStyle}>
                <Title level={3} style={{ textAlign: 'center', marginBottom: '30px' }}>
                    Update Profile
                </Title>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFormSubmit}
                >
                    {/* Name */}
                    <Form.Item
                        name="name"
                        label="Full Name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                        style={formItemStyle}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Enter your full name"
                        />
                    </Form.Item>

                    {/* Email */}
                    <Form.Item
                        name="email"
                        label="Email Address"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                        style={formItemStyle}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Enter your email address"
                        />
                    </Form.Item>

                    {/* Password */}
                    <Form.Item
                        name="password"
                        label="New Password"
                        rules={[
                            { required: true, message: 'Please input your new password!' },
                            { min: 8, message: 'Password must be at least 8 characters long.' },
                        ]}
                        style={formItemStyle}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Enter your new password"
                        />
                    </Form.Item>

                    {/* Confirm Password */}
                    <Form.Item
                        name="confirmPassword"
                        label="Confirm Password"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Passwords do not match!'));
                                },
                            }),
                        ]}
                        style={formItemStyle}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Confirm your new password"
                        />
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Update Profile
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ProfileSettings;
