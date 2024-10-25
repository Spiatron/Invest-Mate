import React, { useState, useEffect } from 'react';
import { Layout, Menu, Drawer, Button, Avatar, Dropdown, message } from 'antd';
import { MenuOutlined, UserOutlined, SettingOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { TbLogout2 } from "react-icons/tb";
import { RiAdminLine } from "react-icons/ri";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom'; 
import Logo from './logo';

const { Header } = Layout;

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();


  const items = [
    { key: '1', label: <Link to="/login">Account</Link> },
    { key: '2', label: <Link to="/Buy&Sell">Buy & sell</Link> },
    { key: '3', label: <Link to="/pricing">Pricing</Link> },
    { key: '4', label: <Link to="/support">Contact Us</Link> },
    { key: '5', label: <Link to="/about">About</Link> },
    // { key: '6', label: <Link to="/graph">Graph</Link> },
    { key: '7', label: <Link to="/liveData">test</Link> },
    { key: '8', label: <Link to="/adminLogin">adminLogin</Link> },
  ];

  const role = localStorage.getItem("Role"); // Fetch role from localStorage
  const userName = localStorage.getItem("Name"); // Fetch user's name from localStorage


  // Function to handle logout
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('Role'); // Fetch role from localStorage

      if (!token) {
        message.error("Token not found");
        console.error("Token not found");
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/user/logout`, {
        method: 'GET',
        headers: { "token": token }
      });

      const data = await response.json(); // Parse the response body

      if (response.ok) {
        localStorage.clear(); // Clear the local storage on successful logout
        message.success('Logged out successfully');

        // Navigate based on the role
        if (role === 'admin' || role === 'moderator') {
          navigate("/adminLogin");  // Redirect to admin login for admin/moderator
        } else {
          navigate("/login");  // Redirect to user login
        }

        console.log(response);
      } else {
        message.error(data.error);
        console.error(data.error);
      }
    } catch (error) {
      message.error('An error occurred while logging out.');
      console.error('Logout error:', error);
    }
  };


  const userMenu = (
    <Menu theme="dark" mode="inline">
      {/* Conditional rendering based on the role */}
      {role === 'admin' && (
        <>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <span style={{ textTransform: 'capitalize' }}>{userName}</span>
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
          <Menu.Item key="5" icon={<TbLogout2 />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </>
      )}

      {role === 'moderator' && (
        <>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <span style={{ textTransform: 'capitalize' }}>{userName}</span>
          </Menu.Item>
          <Menu.Item key="2" icon={<UsergroupAddOutlined />}>
            <Link to="/CustomerPanel">Customer Panel</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<FaIndianRupeeSign />}>
            <Link to="/DematPanel">Demat Panel</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<TbLogout2 />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </>
      )}

      {role === 'user' && (
        <>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <span style={{ textTransform: 'capitalize' }}>{userName}</span>
          </Menu.Item>
          <Menu.Item key="2" icon={<SettingOutlined />}>
            <Link to="/Profile-Settings">Profile Settings</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<TbLogout2 />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </>
      )}
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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/">
            <Logo />
          </Link>
        </div>

        {!isMobile ? (
          <div style={{ flexGrow: 1, textAlign: 'right', marginRight: '20px' }}>
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
                lineHeight: '64px',
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

        <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
          <Avatar
            size="large"
            icon={<UserOutlined />}
            style={{ cursor: 'pointer', backgroundColor: '#c33028' }}
          />
        </Dropdown>

        <Drawer title="Menu" placement="right" onClose={closeDrawer} visible={visible}>
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