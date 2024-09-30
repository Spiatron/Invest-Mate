import React, { useState, useRef } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';  // Import Link and useNavigate

const { Title, Text } = Typography;

const LoginForm = () => {
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [otp, setOtp] = useState(new Array(4).fill(""));
    const [errorMessage, setErrorMessage] = useState("");
    const otpInputs = useRef([]);
    const navigate = useNavigate();  // Initialize the navigate function

    const handleLoginSubmit = () => {
        setIsOTPSent(true);
        setErrorMessage("");
    };

    const handleOTPChange = (e, index) => {
        const value = e.target.value;
        if (value.length === 1 && index < otpInputs.current.length - 1) {
            otpInputs.current[index + 1].focus();
        }

        let newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    };

    const handleOTPSubmit = () => {
        const enteredOTP = otp.join("");
        if (enteredOTP === "1234") {
            // Redirect to home page on OTP verification
            navigate("/");  // Redirects the user to the home page ("/")
        } else {
            setErrorMessage("Invalid OTP. Please try again.");
        }
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
        maxWidth: '400px',
        textAlign: 'center',
    };

    const otpInputStyle = {
        width: '50px',
        margin: '0 5px',
        textAlign: 'center',
    };

    return (
        <div style={containerStyle}>
            <div style={formBoxStyle}>
                <Title level={3}>Welcome</Title>

                {!isOTPSent ? (
                    <Form onFinish={handleLoginSubmit} layout="vertical">
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input
                                prefix={<MailOutlined />}
                                placeholder="Email"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Button type="primary" htmlType="submit" style={{ width: '100%', marginBottom: '10px' }}>
                            Login
                        </Button>

                        {/* Link to Sign Up */}
                        <Text >
                            Don't have an account? <Link to="/SignupForm" style={{color:"#ff0000"}}>Sign Up</Link>
                        </Text>
                    </Form>
                ) : (
                    <>
                        <Text>OTP has been sent to your registered email. Please check.</Text>
                        <div style={{ marginTop: '20px', marginBottom: '10px' }}>
                            {otp.map((_, index) => (
                                <Input
                                    key={index}
                                    maxLength={1}
                                    style={otpInputStyle}
                                    onChange={(e) => handleOTPChange(e, index)}
                                    ref={el => otpInputs.current[index] = el}
                                />
                            ))}
                        </div>
                        {errorMessage && <Text type="danger">{errorMessage}</Text>}
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
