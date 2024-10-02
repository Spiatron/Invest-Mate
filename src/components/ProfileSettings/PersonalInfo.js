import React from 'react';
import { Card, Divider, Typography } from 'antd';
import { PhoneOutlined, CalendarOutlined, IdcardOutlined, CreditCardOutlined } from '@ant-design/icons';
import InfoRow from './InfoRow'; // Import reusable InfoRow component

const PersonalInfo = () => (
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
        PERSONAL INFORMATION
      </Divider>
  
      {/* Mobile Number */}
      <InfoRow icon={<PhoneOutlined />} label="Mobile Number:" value="+91 4567942848" />
      {/* D.O.B */}
      <InfoRow icon={<CalendarOutlined />} label="D.O.B:" value="1990/01/01" />
      {/* Aadhaar */}
      <InfoRow icon={<IdcardOutlined />} label="Aadhaar:" value="4444 4444 4444" />
      {/* PAN */}
      <InfoRow icon={<CreditCardOutlined />} label="PAN:" value="AFZPKR190K" />
    </Card>
  );
  

export default PersonalInfo;
