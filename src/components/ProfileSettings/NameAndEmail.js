import React, { useState } from 'react';
import { Modal, Button, Input, Form, Typography, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ChangeEmailPopup = ({ username, email }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const token = localStorage.getItem('token');
  if (!token) {
    message.error("Token not found");
    console.error("Token not found");
    return;
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    form.resetFields(); // This will reset all the fields in the form
    setIsModalVisible(false);
  };

  const handleSubmit = (values) => {
    const { newEmail } = values;
    console.log(newEmail);
    
    // API call to update email
    fetch(`${process.env.REACT_APP_API_URL}/api/v1/user/updateUserDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "token": token,
      },
      body: JSON.stringify({ newEmail: newEmail }),
    })
    .then((response) => {
      if (response.ok) {
        message.success('Email updated successfully!');
        console.log(response);
        setIsModalVisible(false);
      } else {
        return response.json().then((data) => {
          message.error(`Error: ${data.error}` || 'Error updating email.');
          console.error('Error:', data); // Logs the actual error from the response
        });
      }
    })
    .catch((error) => {
      message.error('Failed to update email.');
      console.error('Fetch error:', error); // Logs any fetch-level errors (like network issues)
    });    
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '100px' }}>
      <Title level={1} style={{ fontSize: '40px', fontWeight: 'bold', textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)' }}>
        {username ? username : "Current User"}
      </Title>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px'}}>
        <Input
          value={email ? email : "CurrentUser@gmail.com"}
          style={{ flex: 1, marginRight: '5px', maxWidth: '300px' }}
          readOnly
        />
        <Button type="primary" onClick={showModal}>Change Email</Button>
      </div>

      <Modal
        title={
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <MailOutlined style={{ fontSize: '24px', color: '#ff0000', marginRight: '10px' }} />
            <Title level={3} style={{ margin: 0, color: '#ff0000', fontWeight: 'bold', textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)' }}>
              Change Email
            </Title>
          </div>
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Old Email"
            name="oldEmail"
            initialValue={email}
          >
            <Input value={email} readOnly />
          </Form.Item>

          <Form.Item
            label="New Email"
            name="newEmail"
            rules={[
              { type: 'email', message: "Please include an '@' in your email address!" },
              { required: true, message: 'Please input your new email!' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter new email" />
          </Form.Item>

          <Form.Item
            label="Confirm Email"
            name="confirmEmail"
            dependencies={['newEmail']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your new email!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newEmail') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two emails do not match!'));
                },
              }),
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Confirm new email" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ChangeEmailPopup;
