import React, { useState } from 'react';
import { Form, Checkbox, Button, Typography, Col } from 'antd'; // Import Col for layout
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const SegmentSelectionForm = () => {
    const navigate = useNavigate();
    const [segments, setSegments] = useState({
        equities: false,
        futures: false,
    });
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleSegmentChange = (e) => {
        const { name, checked } = e.target;
        setSegments((prev) => ({ ...prev, [name]: checked }));
    };

    const handleTermsChange = (e) => {
        setTermsAccepted(e.target.checked);
    };

    const onFinish = () => {
        console.log('Selected segments:', segments);
        console.log('Terms accepted:', termsAccepted);
        // Navigate to SegmentSelectionForm on form completion
        navigate('/aadhaar');
        // Handle form submission or transition to the next step
    };

    // Inline styles
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full height of the viewport
        backgroundColor: '#f5f5f5',
    };

    const formBoxStyle = {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '500px',
    };

    return (
        <div style={containerStyle}>
            <Col xs={24} sm={16} md={12} lg={8}>
                <div style={formBoxStyle}>
                    <Title level={2}>Step 3 of 7</Title>
                    <Title level={4}>Choose the segments:</Title>
                    <p>Buy and sell shares, mutual funds, and derivatives on NSE and BSE.</p>

                    <Form name="segmentSelection" onFinish={onFinish} layout="vertical" style={{ margin: 'auto' }}>
                        <Form.Item>
                            <Checkbox
                                name="equities"
                                checked={segments.equities}
                                onChange={handleSegmentChange}
                            >
                                Equities and Mutual Funds
                            </Checkbox>
                            <br />
                            <Checkbox
                                name="futures"
                                checked={segments.futures}
                                onChange={handleSegmentChange}
                            >
                                Futures and Options
                            </Checkbox>
                            <br />
                        </Form.Item>

                        <Title level={4}>Terms and Conditions:</Title>
                        <ul>
                            <li style={{ marginBottom: '10px' }}>I agree that I have read and understood the most important terms and conditions.</li>
                            <li style={{ marginBottom: '10px' }}>My sole country of tax residency is India. I/We have
                                understood the information requirements of this Form
                                (FATCA & CRS Instructions). I further confirm that the linked
                                bank accounts, Aadhaar, and PAN belong to me.</li>
                            <li style={{ marginBottom: '10px' }}>I authorise Mengal Keshav to operate the movement of securities
                                from my demat account for any obligation created at the
                                Exchange through my trade(s) as per the Terms &
                                Conditions of the Online Delivery Instruction.</li>
                            <li style={{ marginBottom: '10px' }}>I confirm that I have read and understood the contents of
                                the Equity Annexure Documents, Risk Disclosure, Rights and
                                Obligations, Guidance Note, Tariff Sheet, Policies and
                                Procedures, and other voluntary clauses. Learn more.</li>
                            <li style={{ marginBottom: '10px' }}>I acknowledge and consent to the standing instructions as
                                outlined.</li>
                        </ul>
                        <Form.Item>
                            <Checkbox checked={termsAccepted} onChange={handleTermsChange}>
                                I agree and consent to the above terms and conditions.
                            </Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }} disabled={!termsAccepted}>
                                Continue
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Col>
        </div>
    );
};

export default SegmentSelectionForm;
