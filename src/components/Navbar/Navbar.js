import React, { useState, useEffect } from 'react';
import { Layout, Menu, Drawer, Button, Avatar, Dropdown } from 'antd';
import { MenuOutlined, UserOutlined, SettingOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { RiAdminLine } from "react-icons/ri";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Logo from './logo'; 

const { Header } = Layout;

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const items = [
    { key: '1', label: <Link to="/login">Account</Link> },
    { key: '2', label: <Link to="/pricing">Pricing</Link> },
    { key: '3', label: <Link to="/support">Support-Contact Us</Link> },
    { key: '4', label: <Link to="/about">About</Link> },
  ];

  const userMenu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined/>}>
        <span>User Name</span>
      </Menu.Item>
      <Menu.Item key="2" icon={<RiAdminLine />}>
        <Link to="/admin">Admin Panel</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<UsergroupAddOutlined />}>
        <Link to="/CustomerPanel">Customer Panel</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<FaIndianRupeeSign />}>
        <Link to="/DematPanel">Demat Panel</Link>
      </Menu.Item>
      <Menu.Item key="5" icon={<SettingOutlined />}>
        <Link to="/Profile-Settings">Profile Settings</Link>
      </Menu.Item>
    </Menu>
  );

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  const handleResize = () => {
    if (window.innerWidth <= 1200) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: '#fff',
          padding: '0 50px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Logo Section */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/"> {/* Link to the homepage */}
            <Logo />
          </Link>
        </div>
        
        {/* Desktop Menu */}
        {!isMobile ? (
          <div style={{ flexGrow: 1, textAlign: 'right', marginRight: '20px' }}> {/* Added margin-right for spacing */}
            <Menu
              theme="light"
              mode="horizontal"
              items={items}
              style={{
                fontSize: '16px',
                fontWeight: '500',
                backgroundColor: 'transparent',
                borderBottom: 'none',
                display: 'flex',
                lineHeight: '64px', // Align menu items vertically in the center
              }}
            />
          </div>
        ) : (
          <Button
            className="mobile-menu-icon"
            type="text"
            icon={<MenuOutlined style={{ fontSize: '24px', color: '#000' }} />}
            onClick={showDrawer}
          />
        )}

        {/* User Avatar Dropdown */}
        <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
          <Avatar
            size="large"
            icon={<UserOutlined />}
            style={{ cursor: 'pointer', backgroundColor: '#c33028' }}
          />
        </Dropdown>

        <Drawer
          title="Menu"
          placement="right"
          onClose={closeDrawer}
          visible={visible}
        >
          <Menu mode="vertical" items={items} />
        </Drawer>
      </Header>

      <div
        style={{
          width: '100%',
          height: '1px',
          backgroundColor: '#e0e0e0',
          marginTop: '0px',
        }}
      />
    </>
  );
};

export default Navbar;
