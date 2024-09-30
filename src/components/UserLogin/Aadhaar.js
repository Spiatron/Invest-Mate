import React, { useState } from 'react';
import { Form, Input, Button, Typography, Col, Upload, message, Row } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios'; // Make sure to import axios
import dayjs from 'dayjs'; // Only if you have a date to format
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

const { Title, Text } = Typography;

const Aadhaar = () => {
    const navigate = useNavigate();
    const [aadhaarNumber, setAadhaarNumber] = useState('');
    const [fileList, setFileList] = useState([]);
    const [captchaValid, setCaptchaValid] = useState(false);
    const [aadhaarError, setAadhaarError] = useState('');

    const handleAadhaarChange = (e) => {
        let input = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        if (input.length > 12) input = input.slice(0, 12); // Limit to 12 digits
        const formatted = input.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3');
        setAadhaarNumber(formatted);

        // Validate the Aadhaar number format
        if (input.length < 12) {
            setAadhaarError('Invalid format! Valid format is XXXX XXXX XXXX (12 digits)');
        } else {
            setAadhaarError('');
        }
    };

    const onFinish = async () => {
        if (aadhaarNumber.replace(/\s/g, '').length !== 12) {
            message.error('Please enter a valid 12-digit Aadhaar number!');
            return;
        }
        if (!captchaValid) {
            message.error('Please solve the CAPTCHA correctly.');
            return;
        }

        // Prepare FormData for sending all data including file
        const formData = new FormData();
        formData.append('adhaar', aadhaarNumber.replace(/\s/g, '')); // Remove spaces from Aadhaar number
        formData.append('userObjectID', localStorage.getItem("userObjectID")); // Get userObjectID from localStorage

        // Append the uploaded file
        if (fileList.length > 0) {
            formData.append('adhaar-pic', fileList[0].originFileObj); // Add the file to FormData
        }
        console.log('Form Data:');
        formData.forEach((value, key) => {
            console.log(key + ':', value);
        });
        try {
            const response = await axios.post(
                'https://e849-2400-adc3-121-c100-8498-9e-27cb-eeeb.ngrok-free.app/api/v1/user//updateAdhaar',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            if (response.data && response.data.message) {
                message.success(response.data.message); // Use API response success message
              } else {
                message.success('Aadhaar details updated successfully!'); // Fallback success message
              }
              console.log('API response:', response);
            navigate('/LinkBankAccount'); // Navigate to the next step
        } catch (error) {
            // Check if the error has a response and display the specific error message
            if (error.response && error.response.data && error.response.data.error) {
              message.error(`${error.response.data.error}`);
            } else {
              message.error('Failed to update Aadhaar card details.');
            }
            console.error('Error updating Aadhaar card details:', error);
          }
    };

    const handleUpload = ({ fileList }) => {
        setFileList(fileList);
    };

    const onReCAPTCHAChange = (value) => {
        if (value) {
            setCaptchaValid(true);
            message.success('Captcha verified successfully!');
        } else {
            setCaptchaValid(false);
            message.error('Captcha verification failed. Please try again.');
        }
    };

    // Inline styles (you may keep or modify these)
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

    return (
        <div style={containerStyle}>
            <Col xs={24} sm={18} md={12} lg={8}>
                <div style={formBoxStyle}>
                    <Title level={4}>Step 4 of 7</Title>
                    <Title level={3}>Mengal Keshav</Title>
                    <Text>
                        You are about to link your account with Mengal Keshav application.
                        You will be signed up for a DigiLocker account if it does not exist.
                    </Text>

                    <Form name="digiLockerLink" onFinish={onFinish} layout="vertical" style={{ marginTop: '20px' }}>
                        <Form.Item
                            label="Enter Aadhaar Number*"
                            rules={[{ required: true, message: 'Please enter your Aadhaar number!' }]}
                        >
                            <Input
                                value={aadhaarNumber}
                                onChange={handleAadhaarChange}
                                placeholder="XXXX XXXX XXXX"
                                maxLength={14} // 12 digits + 2 spaces
                            />
                            {aadhaarError && (
                                <Text type="danger" style={{ display: 'block', marginTop: '8px' }}>
                                    {aadhaarError}
                                </Text>
                            )}
                        </Form.Item>

                        <Form.Item
                            name="aadhaar-pic" // Updated name to match your field
                            label="Upload Aadhaar Card (PDF or Image)"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)} // Handle fileList correctly
                        >
                            <Upload
                                name="aadhaarFile" // Specify the name for the file input
                                listType="picture" // Change the list type to picture if you want to display thumbnails
                                onChange={handleUpload} // Function to handle the upload state
                                beforeUpload={() => false} // Prevent automatic upload
                                maxCount={1} // Limit the number of files to 1
                            >
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </Form.Item>


                        {/* reCAPTCHA */}
                        <Form.Item>
                            <div style={{
                                transform: 'scale(1.3)',
                                WebkitTransform: 'scale(1.3)',
                                transformOrigin: '0 0',
                                WebkitTransformOrigin: '0 0',
                                width: '100%',
                            }}>
                                <ReCAPTCHA
                                    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} // Replace with your reCAPTCHA site key
                                    onChange={onReCAPTCHAChange}
                                    style={{ width: '100%' }}
                                    size="normal" // You can also try "compact" for a smaller size
                                />
                            </div>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: "10px" }} disabled={aadhaarError !== '' || !captchaValid}>
                                Next
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Col>
        </div>
    );
};

export default Aadhaar;
