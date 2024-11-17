import React from 'react';
import { Button, Typography, Space, Image, Grid } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const UnauthorizedPage = () => {
  const { xs } = useBreakpoint(); // Detect if the screen is extra small

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '90vh',
        backgroundColor: '#f0f2f5',
        padding: xs ? '10px' : '20px', // Smaller padding for XS screens
        color: '#333',
        marginTop: '0',
      }}
    >
      <Title
        level={1}
        style={{
          fontSize: xs ? '4rem' : '8rem', // Smaller font size for XS
          fontWeight: 'bold',
          color: '#ff0000',
          textAlign: 'center',
          margin: '0',
          padding: '0',
        }}
      >
        Oops!
      </Title>
      <Text
        style={{
          fontSize: xs ? '1.5rem' : '3rem', // Adjusted font size for XS
          fontWeight: '600',
          color: '#333',
          textAlign: 'center',
          margin: '0',
          padding: '0',
        }}
      >
        Unauthorized Access <StopOutlined />
      </Text>
      <Text
        style={{
          fontSize: xs ? '1rem' : '1.8rem', // Adjusted font size for XS
          color: '#666',
          textAlign: 'center',
          margin: xs ? '10px 0 20px' : '10px 0 40px',
        }}
      >
        You are not allowed to access this page
      </Text>

      {/* Place for SVG */}
      <div
        style={{
          width: '100%',
          maxWidth: xs ? '250px' : '400px', // Smaller max width for XS
          margin: '20px 0',
        }}
      >
        <Image
          src="/Unauthorized/Unauthorized.svg"
          alt="Unauthorized"
          style={{ width: '100%' }} // Responsive image
        />
      </div>

      <Space direction="vertical" align="center">
        <Text
          style={{
            fontSize: xs ? '1rem' : '1.5rem', // Adjusted font size for XS
            color: '#999',
            textAlign: 'center',
          }}
        >
          Try signing in with a different account
        </Text>
      </Space>

      {/* {!xs && ( */}
        <Link to="/">
        <Button
          type="primary"
          style={{
            marginTop: '20px',
            fontSize: '1rem',
            padding: '8px 16px',
          }}
        >
         Go Back
        </Button>
        </Link> 
      {/* )} */}
    </div>
  );
};

export default UnauthorizedPage;
