import React, { useState } from 'react';
import { Form, Input, Button, Typography, DatePicker, Col, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios'; // Axios to handle API requests

const { Title, Text } = Typography;

const PANStepForm = () => {
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);
  const [fileList, setFileList] = useState([]); // Store uploaded file

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
    maxWidth: '500px',
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '30px',
  };

  const buttonStyle = {
    width: '100%',
  };

  // File upload handler
  const handleFileChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
      setFileList(info.fileList); // Store the uploaded file list
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
      setFileList([]); // Clear the file list on error
    } else {
      setFileList(info.fileList); // Manually store the file on change
    }
  };

  // Check form validity for enabling the submit button
  const checkFormValidity = (changedFields, allFields) => {
    const pan = allFields.find(field => field.name[0] === 'pan')?.value;
    const dob = allFields.find(field => field.name[0] === 'dob')?.value;

    if (pan && dob) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const onFinish = async (values) => {
    const formattedDate = values.dob ? dayjs(values.dob).format('YYYY/MM/DD') : null;

    // Prepare FormData for sending all data including file
    const formData = new FormData();
    formData.append('pan', values.pan);
    formData.append('dob', formattedDate);
    formData.append('userObjectID', localStorage.getItem("userObjectID")); // Replace with actual userObjectID if available

    // Append the uploaded file
    if (fileList.length > 0) {
      formData.append('panCard-pic', fileList[0].originFileObj); // Add the file to FormData
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/user/updatePanCard`,
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
        message.success('PAN card details updated successfully!'); // Fallback success message
      }
      console.log('API response:', response);
      navigate('/segment-selection');
    } catch (error) {
      // Check if the error has a response and display the specific error message
      if (error.response && error.response.data && error.response.data.error) {
        message.error(`${error.response.data.error}`);
      } else {
        message.error('Failed to update PAN card details.');
      }
      console.error('Error updating PAN card details:', error);
    }
  };

  return (
    <div style={containerStyle}>
      <Col xs={24} sm={16} md={12} lg={8}>
        <div style={formBoxStyle}>
          <div style={headingStyle}>
            <Text>Step 2 of 7</Text>
            <Title level={3}>Let's start with your PAN</Title>
            <Text>Your name will be taken as per ITD (Income Tax Department).</Text>
          </div>

          <Form
            name="panStep"
            onFinish={onFinish}
            layout="vertical"
            onFieldsChange={checkFormValidity}
          >
            {/* PAN Field */}
            <Form.Item
              name="pan"
              label="PAN"
              rules={[
                { required: true, message: 'Please input your PAN!' },
                { pattern: /^[A-Z0-9]{10}$/, message: 'PAN must be a 10-digit alphanumeric number!' },
              ]}
            >
              <Input placeholder="Enter your PAN" />
            </Form.Item>

            {/* Date of Birth Field */}
            <Form.Item
              name="dob"
              label="D.O.B"
              rules={[{ required: true, message: 'Please input your Date of Birth!' }]}
            >
              <DatePicker format="YYYY/MM/DD" placeholder="YYYY / MM / DD" style={{ width: '100%' }} />
            </Form.Item>

            {/* File Upload Field */}
            <Form.Item
              name="panCard-pic"
              label="Upload Your PAN Card"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
            >
              <Upload
                name="panFile"
                listType="picture"
                onChange={handleFileChange}
                beforeUpload={() => false} // Prevent automatic upload
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>

            {/* Continue Button (Disabled until form is valid) */}
            <Form.Item>
              <Button type="primary" htmlType="submit" style={buttonStyle} disabled={!isFormValid}>
                Continue
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </div>
  );
};

export default PANStepForm;
