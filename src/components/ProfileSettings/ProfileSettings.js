import React, { useState } from 'react';
import { Row, Col } from 'antd';
import ProfilePicture from './ProfilePicture';
import NameAndEmail from './NameAndEmail';
import PersonalInfo from './PersonalInfo';
import BankDetails from './BankDetails';
import LocationDetails from './LocationDetails';
import PasswordChange from './PasswordChange';

const ProfileSettings = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ padding: '20px', minHeight: '100vh', height: 'auto' }}>
      <Row gutter={16} align="middle">
        <Col span={3}><ProfilePicture /></Col>
        <Col xs={24} sm={12} md={8} span={18}><NameAndEmail /></Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col xs={24} sm={12} md={8}><PersonalInfo /></Col>
        <Col xs={24} sm={12} md={8}>
          <BankDetails />
          <PasswordChange showPassword={showPassword} togglePasswordVisibility={togglePasswordVisibility} />
        </Col>
        <Col xs={24} sm={12} md={8}><LocationDetails /></Col>
      </Row>
    </div>
  );
};

export default ProfileSettings;
