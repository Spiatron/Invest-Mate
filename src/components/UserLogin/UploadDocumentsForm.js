import React, { useState } from 'react';
import { Form, Button, Upload, Typography, Col, message, Avatar } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUsername } from './UsernameContext'; // Adjust the path as necessary

const { Title, Text } = Typography;

const UploadDocumentsForm = () => {
    const [loading, setLoading] = useState(false);
    const [isIncomeProofUploaded, setIsIncomeProofUploaded] = useState(false);
    const [isSignatureUploaded, setIsSignatureUploaded] = useState(false);
    const navigate = useNavigate();
    const { username } = useUsername();

    const handleIncomeProofUpload = async ({ fileList }) => {
        if (fileList.length > 0) {
            await uploadIncomeProof(fileList[0]);
        }
    };

    const handleSignatureUpload = async ({ fileList }) => {
        if (fileList.length > 0) {
            await uploadUserSignature(fileList[0]);
        }
    };

    const uploadIncomeProof = async (file) => {
        const formData = new FormData();
        formData.append('incomeProof-pic', file.originFileObj);
        formData.append('userObjectID', localStorage.getItem("userObjectID"));

        try {
            setLoading(true);
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/user/updateIncomeProof`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data && response.data.message) {
                message.success(response.data.message);
            } else {
                message.success('Income proof picture Uploaded successfully!');
            }
            setIsIncomeProofUploaded(true);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                message.error(`${error.response.data.error} or Image must be smaller than 5MB!`);
            } else {
                message.error('Failed to upload Income proof.');
            }
        } finally {
            setLoading(false);
        }
    };

    const uploadUserSignature = async (file) => {
        const formData = new FormData();
        formData.append('userSignature-pic', file.originFileObj);
        formData.append('userObjectID', localStorage.getItem("userObjectID"));

        try {
            setLoading(true);
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/user/updateUserSignaturePic`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data && response.data.message) {
                message.success(response.data.message);
            } else {
                message.success('E-Signature picture Uploaded successfully!');
            }
            setIsSignatureUploaded(true);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                message.error(`${error.response.data.error} or Image must be smaller than 5MB!`);
            } else {
                message.error('Failed to upload E-Signature.');
            }
        } finally {
            setLoading(false);
        }
    };

    const onFinish = () => {
        if (isIncomeProofUploaded && isSignatureUploaded) {
            navigate('/LastStep');
        } else {
            message.warning('Please upload both income proof and signature.');
        }
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
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

    const buttonStyle = {
        width: '100%',
    };

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
                    <Title level={4}>Step 6 of 7</Title>
                    <Form name="uploadDocuments" onFinish={onFinish} layout="vertical">
                        <Form.Item
                            name="incomeProof-pic"
                            label="Upload Income Proof"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
                        >
                            <Upload
                                name="incomeProofFile"
                                listType="picture"
                                onChange={handleIncomeProofUpload}
                                beforeUpload={() => false}
                                maxCount={1}
                            >
                                <Button icon={<UploadOutlined />} loading={loading} disabled={loading}>
                                    Click to Upload
                                </Button>
                            </Upload>
                            <Text type="secondary">
                                Income proof is required if you wish to trade in Futures & Options segments.
                            </Text>
                        </Form.Item>

                        <Form.Item
                            name="userSignature-pic"
                            label="Upload E-Signature"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
                        >
                            <Upload
                                name="signatureFile"
                                listType="picture"
                                onChange={handleSignatureUpload}
                                beforeUpload={() => false}
                                maxCount={1}
                            >
                                <Button icon={<UploadOutlined />} loading={loading} disabled={loading}>
                                    Click to Upload
                                </Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={buttonStyle}
                                disabled={!isIncomeProofUploaded || !isSignatureUploaded || loading}
                            >
                                Continue
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Col>
        </div>
    );
};

export default UploadDocumentsForm;
