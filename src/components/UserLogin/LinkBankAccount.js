import React, { useState } from 'react';
import { Form, Input, Button, Typography, Col, Radio, message, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useUsername } from './UsernameContext'; // Adjust the path as necessary

const { Title, Text, Link } = Typography;

const LinkBankAccount = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [accountNumber, setAccountNumber] = useState('');
    const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
    const { username } = useUsername();

    const isValidAccountNumber = (value) => /^\d{9,18}$/.test(value); // 9 to 18 digits
    const isValidIFSC = (value) => /^[A-Za-z]{4}\d{7}$/.test(value); // 4 letters followed by 7 digits
    const isValidMICR = (value) => /^\d{9}$/.test(value); // 9 digits

    const onFinish = async (values) => {
        const { ifsc, micr, accountNumber } = values;

        // Validate account details (will not stop form submission)
        const errors = {};
        if (!isValidAccountNumber(accountNumber)) {
            errors.accountNumber = 'Invalid bank account number';
        }
        if (!isValidIFSC(ifsc)) {
            errors.ifsc = 'Invalid IFSC code';
        }
        if (!isValidMICR(micr)) {
            errors.micr = 'Invalid MICR code';
        }

        // If there are errors, display them and stop submission
        if (Object.keys(errors).length > 0) {
            message.error('Please fix the errors in the form.');
            return;
        }

        const bankDetails = {
            accountNumber,
            micrCode: micr,
            ifsc: ifsc,
        };

        const userObjectID = localStorage.getItem('userObjectID'); // Assume userObjectID is stored in localStorage

        const jsonBody = { bankDetails, userObjectID };

        console.log('JSON Body:', jsonBody); // Log the JSON body for debugging

        try {
            const response = await fetch('https://9d34-2400-adc3-121-c100-d5d5-52ee-ea72-c27b.ngrok-free.app/api/v1/user/insertBankDetails', { // Replace with your API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonBody),
            });
            const result = await response.json();
            console.log('Response:', result);
            if (response.ok) {
                message.success(result.message);
                navigate('/UploadDocumentsForm');
            } else {
                message.error('Failed to submit bank details. Please try again.');
            }
        } catch (error) {
            message.error('An error occurred while submitting bank details. Please try again.');
        }
    };

    // Inline styles
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
    };

    const formBoxStyle = {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
    };

    const isContinueDisabled = step === 3 && (accountNumber !== confirmAccountNumber || !accountNumber || !confirmAccountNumber);

    return (
        <div style={containerStyle}>
            <Col xs={24} sm={18} md={12} lg={8}>
                <div style={formBoxStyle}>
                    {/* Username Card */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: "#f0f0f0",
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            padding: '10px',
                            height: '30px',
                            margin: '5px',
                        }}
                    >
                        <Avatar icon={<UserOutlined />} style={{ marginRight: '20px' }} />
                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
                            {username ? username : 'Current User'}
                        </span>
                    </div>
                    <Title level={4}>Step 5 of 7</Title>
                    <Title level={3}>Link bank account</Title>
                    <Text>Bank account in your name from which you will transact funds for trading.</Text>

                    {step === 1 && (
                        <Form layout="vertical" style={{ marginTop: '20px' }}>
                            <Form.Item>
                                <Radio.Group
                                    onChange={(e) => setStep(e.target.value === 'upi' ? 2 : 3)}
                                    style={{ width: '100%' }}
                                >
                                    <Radio style={{ display: 'block', padding: '10px 0' }} value="upi">
                                        Link with UPI <Text type="secondary">(Recommended)</Text>
                                    </Radio>
                                    <Radio style={{ display: 'block', padding: '10px 0' }} value="manual">
                                        Enter bank details manually
                                    </Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{ width: '100%' }}
                                    disabled={step === 1}
                                >
                                    Continue
                                </Button>
                            </Form.Item>
                        </Form>
                    )}

                    {step === 2 && (
                        <Form name="linkWithUPI" onFinish={onFinish} layout="vertical" style={{ marginTop: '20px' }}>
                            <Text strong>Link with UPI</Text>
                            <Text type="secondary" style={{ display: 'block', marginBottom: '15px' }}>
                                ₹1 will be debited from your account and refunded within 7 working days.
                            </Text>
                            <Button block style={{ marginBottom: '10px' }}>UPI</Button>
                            <Text>
                                <Link onClick={() => setStep(3)} style={{ color: "#ff0000" }}>
                                    Link manually →
                                </Link>
                            </Text>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{ width: '100%', marginTop: '15px' }}
                                >
                                    Continue
                                </Button>
                            </Form.Item>
                        </Form>
                    )}

                    {step === 3 && (
                        <Form name="enterBankDetails" onFinish={onFinish} layout="vertical" style={{ marginTop: '20px' }}>
                            <Form.Item
                                label="Branch's IFSC"
                                name="ifsc"
                                rules={[
                                    { required: true, message: 'Please enter your branch IFSC code' },
                                    { validator: (_, value) => isValidIFSC(value) ? Promise.resolve() : Promise.reject('Invalid IFSC code') }
                                ]}
                            >
                                <Input placeholder="Branch's IFSC" />
                            </Form.Item>

                            <Form.Item
                                label="Branch MICR code"
                                name="micr"
                                rules={[
                                    { required: true, message: 'Please enter the branch MICR code' },
                                    { validator: (_, value) => isValidMICR(value) ? Promise.resolve() : Promise.reject('Invalid MICR code') }
                                ]}
                            >
                                <Input placeholder="Branch MICR code" />
                            </Form.Item>

                            <Form.Item
                                label="Bank account number"
                                name="accountNumber"
                                rules={[
                                    { required: true, message: 'Please enter your bank account number' },
                                    { validator: (_, value) => isValidAccountNumber(value) ? Promise.resolve() : Promise.reject('Invalid bank account number') }
                                ]}
                            >
                                <Input
                                    placeholder="Bank account number"
                                    value={accountNumber}
                                    onChange={(e) => setAccountNumber(e.target.value)}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Confirm bank account number"
                                name="confirmAccountNumber"
                                rules={[
                                    { required: true, message: 'Please confirm your bank account number' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('accountNumber') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Bank account numbers do not match'));
                                        },
                                    }),
                                ]}
                            >
                                <Input
                                    placeholder="Confirm bank account number"
                                    value={confirmAccountNumber}
                                    onChange={(e) => setConfirmAccountNumber(e.target.value)}
                                />
                            </Form.Item>

                            <Text>
                                <Link style={{ color: "#ff0000" }} onClick={() => setStep(2)}>
                                    Link with UPI →
                                </Link>
                            </Text>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{ width: '100%', marginTop: '15px' }}
                                    disabled={isContinueDisabled}
                                >
                                    Continue
                                </Button>
                            </Form.Item>
                        </Form>
                    )}
                </div>
            </Col>
        </div>
    );
};

export default LinkBankAccount;
