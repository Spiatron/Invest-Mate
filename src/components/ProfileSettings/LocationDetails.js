import React from 'react';
import { Card, Divider, Typography } from 'antd';
import { GlobalOutlined, HomeOutlined, EnvironmentOutlined } from '@ant-design/icons';
import InfoRow from './InfoRow'; // Import reusable InfoRow component

const LocationDetails = () => (
    <Card
      style={{
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
      bordered={false}
    >
      <Divider orientation="left" style={{ color: '#ff0000', fontWeight: 'bold' }}>
        LOCATION
      </Divider>
      <InfoRow icon={<GlobalOutlined />} label="Country:" value="India" />
      <InfoRow icon={<HomeOutlined />} label="State:" value="Maharashtra" />
      <InfoRow icon={<EnvironmentOutlined />} label="City:" value="Mumbai" />
    </Card>
  );
  

export default LocationDetails;
