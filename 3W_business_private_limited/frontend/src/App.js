import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Feed from './pages/Feed';
import { AuthContext } from './contexts/AuthContext';
import { Container } from '@mui/material';
import Navbar from './components/Navbar';

function App() {
  const { user } = React.useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Container maxWidth="sm" style={{ paddingTop: 16 }}>
        <Routes>
          <Route path="/" element={user ? <Feed /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
