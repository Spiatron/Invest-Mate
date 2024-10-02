import React, { useState } from 'react';
import { Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const ProfilePicture = () => {
  const [loading, setLoading] = useState(false);

  const handleUpload = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append('profilePicture', file);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value.name || value}`);
    }

    setLoading(true);
    try {
      const response = await axios.post('/uploadPIC', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        onSuccess('Ok');
        message.success('Profile picture uploaded successfully!');
      }
    } catch (error) {
      onError(error);
      message.error('Failed to upload profile picture.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ margin: '20px 0' }}>
        <div
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '10px',
            backgroundColor: '#f0f0f0',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ color: '#aaa' }}>Profile Picture</span>
        </div>

        <Upload
          customRequest={handleUpload}
          accept="image/*"
          showUploadList={false}
        >
          <Button
            icon={<UploadOutlined />}
            type="primary"
            style={{
              marginTop: '10px',
              // Prevent any blurring by ensuring no transforms or filters are applied
              transform: 'none',
              filter: 'none',
              opacity: 1,
            }}
            loading={loading}
          >
            Upload Profile Picture
          </Button>
        </Upload>
      </div>
    </div>
  );
};

export default ProfilePicture;
