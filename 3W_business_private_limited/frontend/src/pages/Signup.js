import React, { useState, useContext } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';
import API from '../api';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', { name, email, password });
      login(res.data.user, res.data.token);
      nav('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h6">Signup</Typography>
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
        <TextField label="Name" value={name} onChange={e=>setName(e.target.value)} required />
        <TextField label="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <TextField label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" type="submit">Signup</Button>
      </form>
    </Paper>
  );
}
