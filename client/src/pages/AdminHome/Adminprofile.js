import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, IconButton, Avatar, Tooltip, Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import './adminprofile.css';

function AdminProfile() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (storedAdmin && storedAdmin.userName) {
      fetch(`http://localhost:3001/admin/${storedAdmin.userName}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setAdmin(data);
          setUserName(data.userName);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      navigate('/adminlogin');
    }
  }, [navigate]);

  const handleSave = () => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (storedAdmin && storedAdmin.userName) {
      fetch(`http://localhost:3001/admin/${storedAdmin.userName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newUserName: userName, password }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setAdmin(data);
          setEditMode(false);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="profile-container">
      <Box className="profile-header animated">
        <Avatar
          className="profile-avatar"
          alt={admin?.userName}
          src="/static/images/avatar/1.jpg"
        />
        <Typography variant="h4" className="profile-title">
          {admin?.userName}'s Profile
        </Typography>
      </Box>
      {admin ? (
        <Box className="profile-details">
          <Box className="profile-field animated">
            <TextField
              label="Username"
              variant="outlined"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              disabled={!editMode}
              fullWidth
              InputProps={{
                endAdornment: (
                  <Tooltip title="Edit Username">
                    <IconButton onClick={() => setEditMode(!editMode)}>
                      {editMode ? <SaveIcon /> : <EditIcon />}
                    </IconButton>
                  </Tooltip>
                ),
              }}
            />
          </Box>
          <Box className="profile-field animated">
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!editMode}
              fullWidth
            />
          </Box>
          {editMode && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              className="save-button animated"
            >
              Save Changes
            </Button>
          )}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/adminhome')}
            className="back-button animated"
          >
            Back to Admin Home
          </Button>
        </Box>
      ) : (
        <div>No admin data available.</div>
      )}
    </div>
  );
}

export default AdminProfile;
