import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, AppBar, Toolbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';

const Header = ({ onAddBook }) => {
  const { user, logout, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar
      position="static"
      sx={{
        mb: 4,
        background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
        boxShadow: 3,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: 1 }}
        >
          My Library ({user && user.email})
        </Typography>

        <Button
          color="inherit"
          startIcon={<AddIcon />}
          onClick={onAddBook}
          sx={{
            bgcolor: 'rgba(255,255,255,0.2)',
            borderRadius: 2,
            mr: 2,
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.35)',
            },
          }}
        >
          Add Book
        </Button>

        <Button
          color="inherit"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            bgcolor: 'rgba(255,255,255,0.1)',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.25)',
            },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
