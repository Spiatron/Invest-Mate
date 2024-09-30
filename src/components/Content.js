import React from 'react';
import { Layout, Breadcrumb, theme } from 'antd';

const { Content } = Layout;

const AppContent = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content
      style={{
        padding: 0,
        height: '100vh', // Full viewport height
      }}
    >
      <Breadcrumb
        style={{
          margin: 0,
        }}
      >
        {/* Breadcrumb items can be added here */}
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: '100%', // Ensure the content fills the height
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        Content
      </div>
    </Content>
  );
};

export default AppContent;
