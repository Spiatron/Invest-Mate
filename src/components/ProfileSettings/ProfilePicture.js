import React, { useState, useEffect } from 'react';
import { Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const ProfilePicture = () => {
  const [loading, setLoading] = useState(false);
  const [profileUrl, setProfileUrl] = useState(null);

  // Retrieve the profile picture URL from local storage on component mount
  useEffect(() => {
    const storedProfileUrl = localStorage.getItem('ProfilePic');
    console.log(storedProfileUrl);
    if (storedProfileUrl) {
      setProfileUrl(storedProfileUrl);
    }
  }, []);

  const token = localStorage.getItem('token');
  if (!token) {
    message.error("Token not found");
    console.error("Token not found");
    return;
  }

  const handleUpload = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append('profile-pic', file);

    setLoading(true);
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/user/updateUserProfilePicture`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "token": token,
            },
        });

        if (response.status === 201) {
            const imageUrl = response.data.user.profilePicURL || response.data.user?.profilePicURL;

            if (imageUrl) {
                // Clear the cached image URL from local storage
                localStorage.removeItem('ProfilePic');

                // Append a timestamp to the URL to prevent caching
                const timestamp = new Date().getTime();
                const newImageUrl = `${imageUrl}?t=${timestamp}`;

                setProfileUrl(newImageUrl); // Set the profile URL with the timestamp
                localStorage.setItem('ProfilePic', newImageUrl); // Store the new URL in local storage
                message.success('Profile picture uploaded successfully!');
            } else {
                message.error('Profile picture URL is undefined.');
                console.error('Profile picture URL is undefined.', response.data);
            }
        }
    } catch (error) {
        message.error('Failed to upload profile picture.');
        console.error(error.response.data.error);
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
            backgroundImage: profileUrl ? `url(${profileUrl})` : 'none',
            backgroundSize: 'cover', // Ensure the image fills the box
            backgroundPosition: 'center', // Center the image in the box
            backgroundRepeat: 'no-repeat', // Prevent image from repeating
          }}
        >
          {!profileUrl && <span style={{ color: '#aaa' }}>Profile Picture</span>}
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
              transform: 'none',
              filter: 'none',
              opacity: 1,
            }}
            loading={loading}
          >
            Update Profile Picture
          </Button>
        </Upload>
      </div>
    </div>
  );
};

export default ProfilePicture;
