import React from 'react';
import { Typography } from 'antd';
const { Text } = Typography;

const InfoRow = ({ icon, label, value }) => (
  <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
    <div style={{ fontSize: '24px', marginRight: '10px', color: '#ff0000' }}>{icon}</div>
    <Text strong style={{ color: '#555' }}>{label}</Text>
    <div style={{ marginLeft: '10px', fontSize: '16px', color: '#333' }}>{value}</div>
  </div>
);

export default InfoRow;
