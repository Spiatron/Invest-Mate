import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const LoginForm = () => {
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const [form] = Form.useForm();  // Ant Design form instance

    // Custom validator for userID (capital letters alphanumeric)
    const validateUserID = (_, value) => {
        const userIDPattern = /^[A-Z0-9]{5,}$/;
        if (!value || userIDPattern.test(value)) {
            return Promise.resolve();
        }
        return Promise.reject(new Error("Please enter a valid User ID (alphanumeric, uppercase)."));
    };

    // Custom validator for password (at least 8 characters long)
    const validatePassword = (_, value) => {
        if (!value || value.length >= 8) {
            return Promise.resolve();
        }
        return Promise.reject(new Error("Password must be at least 8 characters long!"));
    };

    // Function to handle login submission (step 1)
    const handleLoginSubmit = async (values) => {
        const { userID, password } = values;

        // Create the JSON body for step 1
        const loginBody = { userZID: userID, password: password  };

        // Log the JSON body
        console.log('Step 1 JSON Body:', loginBody);

        try {
            const response = await fetch('https://9d34-2400-adc3-121-c100-d5d5-52ee-ea72-c27b.ngrok-free.app/api/v1/user/login/step1', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginBody),
            });
            const result = await response.json();
            console.log('Response:', result);
            if (response.ok) {
                setIsOTPSent(true);  // Proceed to OTP step
                message.success(result.message);
            } else {
                message.error(result.error);
            }
        } catch (error) {
            message.error("Failed to login. Please try again later.");
        }
    };

    // Function to handle OTP submission (step 2)
    const handleOTPSubmit = async () => {
        const userID = form.getFieldValue('userID');  // Retrieve userID from form

        // Create the JSON body for step 2
        const otpBody = { userZID: userID, OTP: otp };

        // Log the JSON body
        console.log('Step 2 JSON Body:', otpBody);

        try {
            const response = await fetch('https://9d34-2400-adc3-121-c100-d5d5-52ee-ea72-c27b.ngrok-free.app/api/v1/user/login/step2', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(otpBody),
            });
            const result = await response.json();
            console.log('Response:', result);
            if (response.ok) {
                message.success(result.message);
                navigate("/");  // Redirect to the homepage
            } 
            else {
                message.error("Invalid OTP. Please try again.");
                setIsOTPSent(false);  // Go back to login step 1
                form.resetFields();  // Clear form fields
            }
        } catch (error) {
            message.error("Failed to submit OTP. Please try again later.");
            setIsOTPSent(false);  // Go back to login step 1
            form.resetFields();  // Clear form fields 
        }
    };

    // Handle OTP input change
    const handleOTPChange = (e) => {
        const value = e.target.value;
        if (value.length <= 6) {
            setOtp(value);
        }
    };

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f2f5' }}>
            <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px' }}>
                <Title level={3}>Welcome</Title>

                {!isOTPSent ? (
                    <Form
                        form={form}
                        onFinish={handleLoginSubmit}
                        layout="vertical"
                    >
                        <Form.Item
                            name="userID"
                            rules={[
                                { required: true, message: 'Please input your User ID!' },
                                { validator: validateUserID } // Custom User ID validation rule
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="User ID"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: 'Please input your password!' },
                                { validator: validatePassword } // Custom password validation rule
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Password"
                            />
                        </Form.Item>

                        <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                            <Link to="/forgetpassword" style={{ color: '#ff0000' }}>
                                Forgot Password?
                            </Link>
                        </div>

                        <Button type="primary" htmlType="submit" style={{ width: '100%', marginBottom: '10px' }}>
                            Login
                        </Button>

                        <Text style={{ justifyContent: 'center', display: "flex", alignItems: 'center' }}>
                            Don't have an account?
                            <Link to="/SignupForm" style={{ color: "#ff0000", marginLeft: '4px' }}>Sign Up</Link>
                        </Text>
                    </Form>
                ) : (
                    <>
                        <Text>OTP has been sent to your registered email. Please check.</Text>
                        <div style={{ marginTop: '20px', marginBottom: '10px' }}>
                            <Input
                                maxLength={6}
                                value={otp}
                                onChange={handleOTPChange}
                                placeholder="Enter OTP"
                            />
                        </div>
                        <Button type="primary" onClick={handleOTPSubmit} style={{ width: '100%', marginTop: '10px' }}>
                            Submit OTP
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginForm;
