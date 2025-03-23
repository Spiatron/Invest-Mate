import React, { useState, useEffect } from 'react';
import { Layout, Menu, Drawer, Button, Avatar, Dropdown} from 'antd';
import { UserOutlined, SettingOutlined, UsergroupAddOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { TbLogout2 } from "react-icons/tb";
import { RiStockLine } from "react-icons/ri";
import { FaCoins, FaInfoCircle } from "react-icons/fa";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { GrContact } from "react-icons/gr";
import { SiGooglehome } from "react-icons/si";
//import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdOutlineManageAccounts } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import Logo from './logo';
import Swal from 'sweetalert2';

const { Header } = Layout;

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate();



  const items = [
    { key: '1', icon: <SiGooglehome />, label: <Link to="/">Home</Link> },
    isLoggedIn && { key: '2', icon: <RiStockLine size={20} />, label: <Link to="/Buy&Sell">Buy & Sell</Link> },
    { key: '3', icon: <FaCoins />, label: <Link to="/pricing">Pricing</Link> },
    { key: '4', icon: <GrContact />, label: <Link to="/support">Contact Us</Link> },
    { key: '5', icon: <FaInfoCircle />, label: <Link to="/about">About</Link> },
    // { key: '6', label: <Link to="/graph">Graph</Link> },
    //  { key: '7', label: <Link to="/liveData">test</Link> },
    //{ key: '8', label: <Link to="/adminLogin">adminLogin</Link> },
  ];

  const role = localStorage.getItem("Role"); // Fetch role from localStorage
  const userName = localStorage.getItem("Name"); // Fetch user's name from localStorage
  const SESSION_DURATION = 3594000; // 1 hour in milliseconds
  // const SESSION_DURATION = 5000;


   // Logout Handler with SweetAlert2 Notification
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('Role');

      if (!token) {
        Swal.fire({
          title: 'Oops!',
          text: 'We couldn’t find your session. Please log in again.',
          icon: 'error',
          timer: 1500,
          showConfirmButton: false,
        });
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/user/logout`, {
        method: 'GET',
        headers: { "token": token },
      });

      if (response.ok) {
        localStorage.clear();
        setIsLoggedIn(false);

        Swal.fire({
          title: 'Logged out!',
          text: 'You have been safely logged out.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });

        const destination = role === 'admin' || role === 'moderator' ? '/adminLogin' : '/login';
        setTimeout(() => navigate(destination), 1500);  // Redirect after alert closes
      } else {
        const data = await response.json();
        Swal.fire({
          title: 'Logout Failed',
          text: data.error || 'Something went wrong. Please try again.',
          icon: 'error',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'An unexpected error occurred. Please try again later.',
        icon: 'error',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  // Auto-logout logic based on session expiration
  useEffect(() => {
    const token = localStorage.getItem('token');
    const loginTimestamp = localStorage.getItem('loginTimestamp');

    if (token && loginTimestamp) {
      const currentTime = Date.now();
      const timeElapsed = currentTime - parseInt(loginTimestamp, 10);

      if (timeElapsed >= SESSION_DURATION) {
        // Session expired, perform logout
        handleLogout();
      } else {
        setIsLoggedIn(true);

        // Set a timer for the remaining session duration
        const remainingTime = SESSION_DURATION - timeElapsed;
        const logoutTimer = setTimeout(handleLogout, remainingTime);

        // Cleanup the timer when the component unmounts or logout happens
        return () => clearTimeout(logoutTimer);
      }
    }
  }, []);


  const userMenu = (
    <Menu theme="dark" mode="inline">
      {/* Conditional rendering based on the role */}
      {role === 'admin' && (
        <>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <span style={{ textTransform: 'capitalize' }}>{userName}</span>
          </Menu.Item>
          <Menu.Item key="2" icon={<MdOutlineManageAccounts size={16} />}>
            <Link to="/admin">Moderator Panel</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UsergroupAddOutlined />}>
            <Link to="/CustomerPanel">Customer Panel</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserSwitchOutlined />}>
            <Link to="/TransactionPanel">Stock Transactions</Link>
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
          <Menu.Item key="3" icon={<UserSwitchOutlined />}>
            <Link to="/TransactionPanel">Stock Transactions</Link>
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
    backgroundColor: '#f5f5f5',
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }}
>
  {/* Logo and Name (only show name on desktop) */}
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
      <Logo />
      {!isMobile && (
        <span
          style={{
            fontSize: '24px',
            marginLeft: '10px',
            fontWeight: 'bold',
            color: '#000',
            whiteSpace: 'nowrap',
            fontFamily:"Bantayog"
          }}
        >
          Invest Mate
        </span>
      )}
    </Link>
  </div>

  {/* Horizontal Menu on Desktop */}
  {!isMobile && (
    <Menu
      theme="light"
      mode="horizontal"
      items={items}
      style={{
        fontSize: '16px',
        fontWeight: '500',
        backgroundColor: 'transparent',
        borderBottom: 'none',
        flexGrow: 1,
        justifyContent: 'right', // Center align menu items horizontally
      }}
    />
  )}

  {/* Hamburger Menu (only for Mobile) */}
  {isMobile && (
    <Button
      type="text"
      icon={<BsMenuButtonWideFill style={{ fontSize: '24px', color: '#000' }} />}
      onClick={showDrawer}
      style={{ marginLeft: 'auto' }}
    />
  )}

  {/* Avatar or Login Button */}
  {isLoggedIn ? (
    <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
      <Avatar
        shape="square"
        size="large"
        icon={<UserOutlined />}
        style={{ cursor: 'pointer', backgroundColor: '#c33028' }}
      />
    </Dropdown>
  ) : (
    <Link to="/login">
      <Button type="primary" style={{ fontWeight: '500' }}>
        Get Started
      </Button>
    </Link>
  )}

  {/* Drawer for Mobile Menu */}
  <Drawer title="Menu" placement="right" onClose={closeDrawer} visible={visible}>
    <Menu mode="vertical" items={items} />
  </Drawer>
</Header>
    </>
  );
};

export default Navbar;