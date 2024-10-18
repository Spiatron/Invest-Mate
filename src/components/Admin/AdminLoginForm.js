import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const { Title, Text } = Typography;

const AdminLoginForm = () => {
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const [form] = Form.useForm();  // Ant Design form instance

    // const validateUserID = (_, value) => {
    //     const userIDPattern = /^[A-Z0-9]{5,}$/;
    //     if (!value || userIDPattern.test(value)) {
    //         return Promise.resolve();
    //     }
    //     return Promise.reject(new Error("Please enter a valid User ID (alphanumeric, uppercase)."));
    // };

    const validatePassword = (_, value) => {
        if (!value || value.length >= 8) {
            return Promise.resolve();
        }
        return Promise.reject(new Error("Password must be at least 8 characters long!"));
    };

    const handleLoginSubmit = async (values) => {
        const { userID, password } = values;
        const loginBody = { username: userID, password: password };
        console.log(loginBody)

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/admin/login/step1`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginBody),
            });
            const result = await response.json();
            if (response.ok) {
                setIsOTPSent(true);
                message.success(result.message);
            } else {
                message.error(result.error);
            }
        } catch (error) {
            message.error("Failed to login. Please try again later.");
        }
    };

    const handleOTPSubmit = async () => {
        const userID = form.getFieldValue('userID');
        const otpBody = { username: userID, OTP: otp };
        console.log(otpBody);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/admin/login/step2`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(otpBody),
            });
            const result = await response.json();
            if (response.ok) {
                const { token, userData } = result;
                localStorage.setItem("token", token);
                localStorage.setItem("adminName", userData.username);
                localStorage.setItem("adminRole", userData.userRole);
                localStorage.setItem("adminObjectID", userData.userObjectID);
                console.log(result);
                navigate("/admin");  // Redirect to the homepage
            } else {
                message.error(result.error);
                setIsOTPSent(false);
            }
        } catch (error) {
            message.error("Failed to submit OTP. Please try again.");
            setIsOTPSent(false);
        }
    };

    const handleOTPChange = (e) => {
        const value = e.target.value;
        if (value.length <= 6) {
            setOtp(value);
        }
    };

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f2f5' }}>
            <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px' }}>
                <Title level={3}>Admin Login</Title>
                {!isOTPSent ? (
                    <Form form={form} onFinish={handleLoginSubmit} layout="vertical">
                        <Form.Item
                            name="userID"
                            rules={[{ required: true, message: 'Please input your Admin Username!' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Admin Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }, { validator: validatePassword }]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                        </Form.Item>
                        <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                            <Link to="/adminForgetpassword" style={{ color: '#ff0000' }}>Forgot Password?</Link>
                        </div>
                        <Button type="primary" htmlType="submit" style={{ width: '100%', marginBottom: '10px' }}>Login</Button>
                    </Form>
                ) : (
                    <>
                        <Text>OTP has been sent to your registered email. Please check.</Text>
                        <div style={{ marginTop: '20px', marginBottom: '10px' }}>
                            <Input maxLength={6} value={otp} onChange={handleOTPChange} placeholder="Enter OTP" />
                        </div>
                        <Button type="primary" onClick={handleOTPSubmit} style={{ width: '100%', marginTop: '10px' }}>Submit OTP</Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminLoginForm;
