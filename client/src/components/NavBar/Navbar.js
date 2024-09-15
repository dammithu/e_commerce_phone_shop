import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null); 
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    navigate('/');
  };

  const handleProfileIconClick = (event) => {
    setAnchorEl(event.currentTarget); 
  };

  const handleMenuClose = () => {
    setAnchorEl(null); 
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const renderAuthSection = () => {
    if (user || admin) {
      const name = user ? user.name : admin.userName;
      return (
        <div className='user-info'>
          <span className='welcome-text'>
            Welcome, <span className='user-name'>{name}</span>
          </span>
          <Button
            variant="contained"
            color="error"
            className='auth-btn'
            onClick={handleLogoutClick}
          >
            Logout
          </Button>
          <AccountCircle 
            className='profile-icon'
            onClick={handleProfileIconClick}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleMenuItemClick(user ? '/userprofile' : '/adminprofile')}>
              Profile
            </MenuItem>
            {user && (
              <MenuItem onClick={() => handleMenuItemClick('/myorders')}>
                Order List
              </MenuItem>
            )}
          </Menu>
        </div>
      );
    } else {
      return (
        location.pathname !== '/login' &&
        location.pathname !== '/adminlogin' &&
        location.pathname !== '/register' && (
          <Button
            variant="contained"
            color="primary"
            className='auth-btn'
            onClick={handleLoginClick}
          >
            Login
          </Button>
        )
      );
    }
  };

  return (
    <header className='header'>
      <a href={admin ? '/adminhome' : '/'} className='logo'>PrimeMobiles</a>
      <nav className='navbar'>
        <div className='nav-links'>
          <a href={admin ? '/adminhome' : '/'} className='nav-link'>Home</a>
          <a href='/productlist' className='nav-link'>Product</a>
          <a href='/services' className='nav-link'>Services</a>
          <a href='/about' className='nav-link'>About</a>
          <a href='/contact' className='nav-link'>Contact</a>
        </div>
      </nav>
      <div className='auth-section'>
        {renderAuthSection()}
      </div>
    </header>
  );
}

export default Navbar;
