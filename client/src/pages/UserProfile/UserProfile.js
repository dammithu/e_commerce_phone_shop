import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import './userprofile.css';

function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser._id) {
      fetch(`${process.env.REACT_APP_BE_BASE_URI}/user/${storedUser._id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setUser(data);
          setName(data.name);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleSave = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser._id) {
      fetch(`${process.env.REACT_APP_BE_BASE_URI}/user/${storedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setUser(data);
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
      <div className="profile-header">
        <Avatar className="profile-avatar" alt={user?.name} src="/static/images/avatar/1.jpg" />
        <h2 className="profile-title">{user?.name}'s Profile</h2>
      </div>
      {user ? (
        <div className="profile-details">
          <div className="profile-field">
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!editMode}
              fullWidth
              InputProps={{
                endAdornment: (
                  <Tooltip title={editMode ? "Save Changes" : "Edit Name"}>
                    <IconButton onClick={() => setEditMode(!editMode)}>
                      {editMode ? <SaveIcon /> : <EditIcon />}
                    </IconButton>
                  </Tooltip>
                ),
              }}
            />
          </div>
          <div className="profile-field">
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!editMode}
              fullWidth
            />
          </div>
          <div className="profile-actions">
            {editMode && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                className="save-button"
              >
                Save Changes
              </Button>
            )}
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/')}
              className="back-button"
            >
              Back to Home
            </Button>
          </div>
        </div>
      ) : (
        <div>No user data available.</div>
      )}
    </div>
  );
}

export default UserProfile;
