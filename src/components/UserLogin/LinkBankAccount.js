import React, { useState } from 'react';
import { Form, Input, Button, Typography, Col, Radio, Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Text, Link } = Typography;
const { Option } = Select;

const LinkBankAccount = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // Track which step to show (1: initial, 2: UPI, 3: Manual)
    const [accountNumber, setAccountNumber] = useState('');
    const [confirmAccountNumber, setConfirmAccountNumber] = useState('');

    const onFinish = () => {
        console.log('Form submitted');
        navigate('/UploadDocumentsForm');
        // Handle form submission or transition to the next step
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
                    {/* Step Title */}
                    <Title level={4}>Step 5 of 7</Title>

                    {/* Main Title */}
                    <Title level={3}>Link bank account</Title>

                    <Text>
                        Bank account in your name from which you will transact funds for trading.
                    </Text>

                    {/* Initial screen with two options */}
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

                            {/* Submit Button */}
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

                    {/* Display "Link with UPI" screen */}
                    {step === 2 && (
                        <Form name="linkWithUPI" onFinish={onFinish} layout="vertical" style={{ marginTop: '20px' }}>
                            <Text strong>Link with UPI</Text>
                            <Text type="secondary" style={{ display: 'block', marginBottom: '15px' }}>
                                ₹1 will be debited from your account and refunded within 7 working days.
                            </Text>

                            {/* Placeholder buttons for UPI apps */}
                            <Button block style={{ marginBottom: '10px' }}>Google Pay</Button>
                            <Button block style={{ marginBottom: '10px' }}>PhonePe</Button>
                            <Button block style={{ marginBottom: '10px' }}>Paytm</Button>
                            <Button block style={{ marginBottom: '10px' }}>UPI</Button>

                            {/* Link manually option */}
                            <Text>
                                <Link onClick={() => setStep(3)} style={{color:"#ff0000"}}>
                                    Link manually →
                                </Link>
                            </Text>

                            {/* Submit Button */}
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

                    {/* Display "Enter bank details manually" screen */}
                    {step === 3 && (
                        <Form name="enterBankDetails" onFinish={onFinish} layout="vertical" style={{ marginTop: '20px' }}>
                            <Form.Item
                                label="Branch's IFSC"
                                name="ifsc"
                                rules={[{ required: true, message: 'Please enter your branch IFSC code' }]}
                            >
                                <Input placeholder="Branch's IFSC" />
                            </Form.Item>

                            <Form.Item
                                label="Branch MICR code"
                                name="micr"
                                rules={[{ required: true, message: 'Please select the branch MICR code' }]}
                            >
                                 <Input placeholder="Branch MICR code" />
                            </Form.Item>

                            <Form.Item
                                label="Bank account number"
                                name="accountNumber"
                                rules={[{ required: true, message: 'Please enter your bank account number' }]}
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

                            {/* Link with UPI option */}
                            <Text>
                                <Link style={{color:"#ff0000"}} onClick={() => setStep(2)}>
                                    Link with UPI →
                                </Link>
                            </Text>

                            {/* Submit Button */}
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
