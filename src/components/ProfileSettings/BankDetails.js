import React from 'react';
import { Card, Divider, Typography } from 'antd';
import { BankOutlined, IdcardOutlined, CreditCardOutlined } from '@ant-design/icons';
import InfoRow from './InfoRow'; // Import reusable InfoRow component

const BankDetails = () => (
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
        BANK DETAILS
      </Divider>
      <InfoRow icon={<BankOutlined />} label="Bank Account Number:" value="123456789012345" />
      <InfoRow icon={<IdcardOutlined />} label="Branch MICR Code:" value="123456" />
      <InfoRow icon={<CreditCardOutlined />} label="Branch's IFSC:" value="IFSC0001234" />
    </Card>
  );
  

export default BankDetails;
