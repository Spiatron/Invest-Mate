import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Typography, Checkbox, Row, Col, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import moment from 'moment';
import { FaPenNib } from "react-icons/fa6";

const { Text, Link } = Typography;

const ESignComponent = ({ isVisible, onClose, onComplete }) => { // Add onComplete here
    const [aadhaar, setAadhaar] = useState('');
    const [checked, setChecked] = useState(false);
    const [currentDateTime, setCurrentDateTime] = useState({
        date: '',
        time: ''
    });

    useEffect(() => {
        const now = moment();
        setCurrentDateTime({
            date: now.format('YYYY-MM-DD'),
            time: now.format('HH:mm:ss')
        });
    }, []);

    const handleAadhaarChange = (e) => {
        // Only allow digits
        const value = e.target.value.replace(/\D/g, '');
        setAadhaar(value);
    };

    const handleCheckboxChange = (e) => {
        setChecked(e.target.checked);
    };

    const handleSubmit = async () => {
        if (checked && (aadhaar.length === 12)) {
            
           // Create a plain object to hold the data
           const jsonData = {
            adhaar: aadhaar, // Aadhaar number
            userObjectID: localStorage.getItem("userObjectID") // userObjectID from localStorage
        };

        console.log('JSON Data for Aadhaar:', jsonData);
     
    
            try {
                const response = await fetch('https://9d34-2400-adc3-121-c100-d5d5-52ee-ea72-c27b.ngrok-free.app/api/v1/user/verifyAdhaarNumber', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json' // Set the content type to application/json
                    },
                    body: JSON.stringify(jsonData), // Convert the object to a JSON string
                });
                const result = await response.json();
                console.log('API response:', result);

                if (response.ok) {
                    console.log('Response:', result.message);
                    message.success(result.message);
                    onComplete();
                    onClose();
                } else {
                    console.error('Error:', result.error);
                    message.error(result.error);
                }
            } catch (error) {
                console.error('Error:', error);
                message.error('An error occurred while submitting Aadhaar. Please try again.');
            }
        } else {
            message.warning('Please enter a valid Aadhaar/VID and accept the terms.');
        }
    };
    
    

    const modalStyle = {
        padding: '20px',
        textAlign: 'left',
        backgroundColor: '#fff',
        color: '#000',
        borderRadius: '10px',
        margin: 0, // Ensure no margin
        width: '100%', // Ensure the body takes the full width
    };

    const agreementSectionStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px', // Margin after the agreement section
    };

    const agreementLogoStyle = {
        marginRight: '10px', // Margin to the right of agreement logo
        marginTop: "10px"
    };

    const agreementTextStyle = {
        fontSize: '20px',
        lineHeight: '1.8',
    };

    const infoStyle = {
        fontSize: '14px',
        marginBottom: '20px',
        lineHeight: '1.5',
        color: '#000',
    };

    const detailsRowStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '20px',
    };

    const dashedLineStyle = {
        width: '100%',
        height: '1px',
        borderTop: '1px dashed #000',
        marginBottom: '20px',
    };

    const bodyTextStyle = {
        fontSize: '14px',
        lineHeight: '1.6',
        marginBottom: '20px',
        color: '#000',
    };

    const inputStyle = {
        marginBottom: '20px',
        backgroundColor: '#f0f0f0',
        borderRadius: '5px',
        fontSize: '16px',  // Increased font size for larger input
        padding: '10px',   // Increased padding for larger input field
    };

    const buttonGroupStyle = {
        display: 'flex',
        gap: "10px"
    };

    return (
        <Modal
            visible={isVisible}
            onCancel={onClose}
            footer={null}
            title={null}
            centered
            width={800}  // Adjusted width
            bodyStyle={modalStyle}
        >
            <Row>
                <Col span={24}>
                    <div style={agreementSectionStyle}>
                        <div style={agreementLogoStyle}>
                            <Text strong><FaPenNib size={40} /></Text> {/* Placeholder for the logo */}
                        </div>
                        <div>
                            <Text style={agreementTextStyle}>
                                You are signing this document with Aadhaar e-sign.
                            </Text>
                        </div>
                    </div>

                    {/* ASP and Transaction ID on Left, Date and Time on Right */}
                    <div style={detailsRowStyle}>
                        <div>
                            <Text style={infoStyle}>
                                <b>ASP:</b> MANGAL KESHAV<br />
                                <b>Transaction ID:</b> ESIGN:2409070313131243X7B67XJH4HDRDLC7D79UEC79DG3U
                            </Text>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <Text style={infoStyle}>
                                <b>Date:</b> {currentDateTime.date} <br />
                                <b>Time:</b> {currentDateTime.time}
                            </Text>
                        </div>
                    </div>

                    {/* Dashed line */}
                    <div style={dashedLineStyle}></div>

                    {/* Authorization Text */}
                    <Text strong style={{ marginBottom: '10px', display: 'block' }}>
                        I hereby authorize CDSL Ventures Limited to:
                    </Text>

                    {/* Body Text */}
                    <div style={bodyTextStyle}>
                        <p>
                            1. Use my Aadhaar/Virtual ID details (as applicable) for the purpose of eSign of documents
                            requested using <strong>CDSL Ventures Limited</strong> eSign to authenticate my identity through the Aadhaar
                            based e-KYC services of UIDAI.
                        </p>
                        <p>
                            2. Authenticate my Aadhaar / Virtual ID through OTP or Biometric for authenticating my identity
                            through the Aadhaar Authentication system for obtaining my e-KYC through Aadhaar based e-KYC
                            services of UIDAI and use my Photo and Demographic details (Name, Gender, Date of Birth and
                            Address) for the purpose of eSign of documents requested using <strong>CDSL Ventures Limited</strong> eSign.
                        </p>
                        <p>
                            3. I understand that Security and confidentiality of personal identity data provided, for the
                            purpose of Aadhaar based authentication is ensured by <strong>CDSL Ventures Limited</strong> and the data will
                            be stored by <strong>CDSL Ventures Limited</strong> till such time as mentioned in guidelines from UIDAI from time
                            to time.
                        </p>

                        {/* Dashed line */}
                        <div style={dashedLineStyle}></div>

                        {/* Consent Checkbox */}
                        <Checkbox
                            checked={checked}
                            onChange={handleCheckboxChange}
                            style={{ marginBottom: '20px' }}
                        >
                            I have read and understood the terms. I provide consent to authenticate my Aadhaar.
                        </Checkbox>
                    </div>

                    {/* Aadhaar Number Section */}
                    <Text strong style={{ display: 'block', marginBottom: '10px' }}>
                        Aadhaar Number
                    </Text>

                    {/* Aadhaar/VID Input with Eye Icon */}
                    <Input.Password
                        placeholder="Enter your 12 digit Aadhaar number"
                        value={aadhaar}
                        onChange={handleAadhaarChange}
                        style={inputStyle}
                        maxLength={12}
                        iconRender={visible => (visible ? <EyeTwoTone twoToneColor="#ff0000" /> : <EyeInvisibleOutlined />)}
                    />

                    {/* Submit and Cancel Buttons */}
                    <div style={buttonGroupStyle}>
                        <Button
                            type="primary"
                            onClick={handleSubmit}
                            disabled={!checked || aadhaar.length !== 12} // Disable if checkbox is unchecked or Aadhaar is not 12 digits
                        >
                            Submit
                        </Button>
                        <Button
                            type="default"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                    </div>
                </Col>
            </Row>
        </Modal>
    );
};

export default ESignComponent;
