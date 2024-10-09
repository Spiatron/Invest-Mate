import React from 'react';
import { Card, Divider } from 'antd';
import { GlobalOutlined, HomeOutlined, EnvironmentOutlined } from '@ant-design/icons';
import InfoRow from './InfoRow'; // Import reusable InfoRow component

const LocationDetails = ({ city = 'N/A', state = 'N/A', country = 'N/A' }) => (
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
    <InfoRow icon={<GlobalOutlined />} label="Country:" value={country} />
    <InfoRow icon={<HomeOutlined />} label="State:" value={state} />
    <InfoRow icon={<EnvironmentOutlined />} label="City:" value={city} />
  </Card>
);

export default LocationDetails;
