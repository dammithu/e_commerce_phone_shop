// AdminHome.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Button, Typography, Avatar, Box, Tooltip } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './adminhome.css';

function AdminHome() {
  const navigate = useNavigate();

  useEffect(() => {
   
    const elements = document.querySelectorAll('.animated');
    elements.forEach((element) => {
      element.classList.add('start-animation');
    });

    return () => {
   
      elements.forEach((element) => {
        element.classList.remove('start-animation');
      });
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-dashboard">
      <Box className="main-content">
        <Box className="header animated fade-slide">
          <Typography variant="h3" className="dashboard-title">
            Welcome to PrimeMobiles Admin Panel
          </Typography>
          <Typography variant="body2" className="dashboard-subtitle">
            Manage the essential aspects of your online shop.
          </Typography>
          <div className="admin-info">
            <Tooltip title="Notifications">
              <NotificationsIcon className="header-icon notifications-icon animated zoom-in" />
            </Tooltip>
            <Tooltip title="Admin Profile">
              <Avatar className="admin-avatar animated zoom-in">
                <AccountCircleIcon />
              </Avatar>
            </Tooltip>
          </div>
        </Box>

        <Grid container spacing={3} className="dashboard-grid">
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="dashboard-card animated flip-card add-product-card" onClick={() => handleNavigation('/addproduct')}>
              <AddShoppingCartIcon className="dashboard-icon" />
              <Typography variant="h5" className="dashboard-text">Add New Product</Typography>
              <Button variant="contained" className="action-button">Go</Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="dashboard-card animated flip-card product-list-card" onClick={() => handleNavigation('/adminproduct')}>
              <InventoryIcon className="dashboard-icon" />
              <Typography variant="h5" className="dashboard-text">Product List</Typography>
              <Button variant="contained" className="action-button">View</Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="dashboard-card animated flip-card users-list-card" onClick={() => handleNavigation('/userlist')}>
              <PersonIcon className="dashboard-icon" />
              <Typography variant="h5" className="dashboard-text">Customers</Typography>
              <Button variant="contained" className="action-button">View</Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="dashboard-card animated flip-card orders-list-card" onClick={() => handleNavigation('/orderslist')}>
              <LocalShippingIcon className="dashboard-icon" />
              <Typography variant="h5" className="dashboard-text">Orders</Typography>
              <Button variant="contained" className="action-button">View</Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default AdminHome;
