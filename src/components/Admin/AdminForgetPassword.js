import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const AdminForgetPassword = () => {
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [adminID, setAdminID] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    // Validator for adminID (alphanumeric, uppercase)
    // const validateAdminID = (_, value) => {
    //     const adminIDPattern = /^[A-Z0-9]{5,}$/;
    //     if (!value || adminIDPattern.test(value)) {
    //         return Promise.resolve();
    //     }
    //     return Promise.reject(new Error('Please enter a valid Admin ID (alphanumeric, uppercase).'));
    // };

    // Handle adminID submission (send OTP)
    const handleAdminIDSubmit = async (values) => {
        setAdminID(values.adminID);

        const jsonBody = { username: values.adminID };

        console.log('Sending OTP request with body:', jsonBody); // Log the JSON body for OTP request

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/admin/forgetPasswordStep1`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonBody),
            });
            const result = await response.json();
            console.log('Response:', result);
            if (response.ok) {
                setIsOTPSent(true);
                message.success(result.message);
            } else {
                message.error("Failed to send OTP. Please try again.");
            }
        } catch (error) {
            message.error("An error occurred. Please try again later.");
        }
    };

    // Handle OTP and password submission (verify OTP and reset password)
    const handlePasswordReset = async () => {
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        const jsonBody = { username: adminID, newPassword: password, OTP: otp };

        console.log('Resetting password with body:', jsonBody); // Log the JSON body for password reset request

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/admin/forgetPasswordStep2`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonBody),
            });
            const result = await response.json();
            console.log('Response:', result);
            if (response.ok) {
                message.success(result.message);
                navigate("/adminLogin");
            } else {
                message.error("Failed to reset password. Please try again.");
                setIsOTPSent(false);
            }
        } catch (error) {
            message.error("An error occurred. Please try again later.");
            setIsOTPSent(false);
        }
    };

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f2f5' }}>
            <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px' }}>
                <Title level={3}>Admin Forgot Password</Title>

                {!isOTPSent ? (
                    <Form onFinish={handleAdminIDSubmit} layout="vertical">
                        <Form.Item
                            name="adminID"
                            rules={[
                                { required: true, message: 'Please input your Admin Username!' },
                              //  { validator: validateAdminID }  // Custom validation for Admin ID
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="Admin Username"
                            />
                        </Form.Item>

                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Send OTP
                        </Button>
                    </Form>
                ) : (
                    <Form onFinish={handlePasswordReset} layout="vertical">
                        <Text>OTP has been sent to your registered email. Please enter it below along with your new password.</Text>

                        <Form.Item
                            name="otp"
                            rules={[{ required: true, message: 'Please input the OTP!' }]}
                        >
                            <Input
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                                style={{ textAlign: 'center' }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: 'Please input your new password!' },
                                { min: 8, message: 'Password must be at least 8 characters long!' }
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="New Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            name="confirmPassword"
                            rules={[{ required: true, message: 'Please confirm your new password!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Confirm Password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Item>

                        {errorMessage && <Text type="danger">{errorMessage}</Text>}

                        <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: '6px' }}>
                            Reset Password
                        </Button>
                    </Form>
                )}
            </div>
        </div>
    );
};

export default AdminForgetPassword;
