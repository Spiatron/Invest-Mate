import React, { useState } from 'react';
import { Button, Typography, Col, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import ESignComponent from './ESignComponent'; // Import the new component
import moment from 'moment'; // To handle date and time
import { CheckCircleOutlined } from '@ant-design/icons'; // Import Ant Design icon

const { Title, Text, Link } = Typography;

const LastStep = () => {
    const navigate = useNavigate();
    const [isESignVisible, setIsESignVisible] = useState(false);
    const [showCongratulatoryMessage, setShowCongratulatoryMessage] = useState(false);
    const [isESignCompleted, setIsESignCompleted] = useState(false); // State to track eSign completion

    const handleESign = () => {
        const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(`eSign process initiated at ${currentDateTime}`);
        setIsESignVisible(true); // Open eSign modal
    };

    const handleFinish = () => {
        // Show the congratulatory message
        setShowCongratulatoryMessage(true);
    };

    const handleESignClose = () => {
        setIsESignVisible(false);
    };

    const handleCloseCongratulatoryMessage = () => {
        setShowCongratulatoryMessage(false);
        navigate('/'); // Redirect after showing the congratulatory message
    };

    const handleESignComplete = () => {
        setIsESignCompleted(true); // Update the state when eSign is complete
        setIsESignVisible(false); // Close the eSign modal
    };

    // Inline styles
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px',
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

    const buttonStyle = {
        width: '100%',
        marginBottom: '20px',
        marginTop: '20px',
    };

    const secondaryTextStyle = {
        marginTop: '20px',
        marginBottom: '40px',
    };

    return (
        <div style={containerStyle}>
            <Col xs={24} sm={18} md={12} lg={8}>
                <div style={formBoxStyle}>
                    {/* Step Title */}
                    <Title level={4}>Step 7 of 7</Title>

                    {/* Main Title */}
                    <Title level={3}>Last step!</Title>

                    <Text>Digitally sign your application.</Text>

                    {/* eSign Button */}
                    <Button type="primary" style={buttonStyle} onClick={handleESign}>
                        eSign
                    </Button>

                    {/* Finish Button - enabled only if eSign is complete */}
                    <Button 
                        type="default" 
                        danger 
                        style={buttonStyle} 
                        onClick={handleFinish} 
                        disabled={!isESignCompleted} // Disable if eSign not completed
                    >
                        Finish
                    </Button>
                </div>
            </Col>

            {/* eSign Modal Component */}
            <ESignComponent
                isVisible={isESignVisible}
                onClose={handleESignClose}
                onComplete={handleESignComplete} // Pass the completion callback
            />

            {/* Congratulatory Message Modal */}
            <Modal
                visible={showCongratulatoryMessage}
                onCancel={handleCloseCongratulatoryMessage}
                footer={null}
                title={null}
                centered
                width={800}
            >
                <div style={{ textAlign: 'center' }}>
                    <CheckCircleOutlined style={{ fontSize: '50px', color: '#ff0000', marginBottom: '10px' }} />
                    <Text strong style={{ fontSize: '24px', display: 'block', marginBottom: '10px' }}>
                        Congratulations!
                    </Text>
                    <Text style={{ fontSize: '16px', lineHeight: '1.5' }}>
                        Your application is being reviewed. This could take up to 24 hours. We will email you once it is processed.
                    </Text>
                </div>
            </Modal>
        </div>
    );
};

export default LastStep;
