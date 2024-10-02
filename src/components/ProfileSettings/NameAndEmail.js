import React from 'react';
import { Button, Input, Typography } from 'antd';
const { Title } = Typography;

const NameAndEmail = () => (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '100px' }}>
      <Title level={1} style={{ fontSize: '40px', fontWeight: 'bold' }}>
        Ahsan Hafeez
      </Title>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
        <Input
          value="ahsanhafeez@gmail.com"
          style={{ flex: 1, marginRight: '5px' }}
          readOnly
        />
        <Button type="primary">Change Email</Button>
      </div>
    </div>
  );

export default NameAndEmail;
