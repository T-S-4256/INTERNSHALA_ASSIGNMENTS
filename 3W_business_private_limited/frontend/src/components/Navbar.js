import React from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = React.useContext(AuthContext);
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav('/login');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          Mini Social
        </Typography>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {user ? (
            <>
              <Typography variant="body1">{user.name}</Typography>
              <Avatar>{user.name?.[0]?.toUpperCase()}</Avatar>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/signup">Signup</Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
