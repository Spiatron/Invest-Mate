import React from 'react';
import { Input, Button } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const PasswordChange = ({ showPassword, togglePasswordVisibility }) => (
    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
      <Input
        type={showPassword ? 'text' : 'password'}
        value="786pakistan"
        style={{ flex: 1, marginRight: '5px' }}
        readOnly
      />
      <Button type="default" onClick={togglePasswordVisibility}>
        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
      </Button>
      <Button type="primary" style={{ marginLeft: '5px' }}>Change Password</Button>
    </div>
  );
  

export default PasswordChange;
