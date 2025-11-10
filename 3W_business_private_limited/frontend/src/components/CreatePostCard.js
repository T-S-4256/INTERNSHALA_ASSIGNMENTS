import React, { useState, useContext } from 'react';
import { Paper, TextField, Button, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import API from '../api';
import { AuthContext } from '../contexts/AuthContext';

export default function CreatePostCard({ onPostCreated }) {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const submit = async (e) => {
    e?.preventDefault();
    if (!text && !file) return alert('Enter text or choose an image');

    try {
      setLoading(true);
      const form = new FormData();
      form.append('text', text);
      if (file) form.append('image', file);

      const res = await API.post('/posts', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      onPostCreated(res.data);
      setText('');
      setFile(null);
    } catch (err) {
      console.error(err);
      alert('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper style={{ padding: 12, marginBottom: 12 }}>
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <TextField
          multiline
          minRows={2}
          placeholder={`What's on your mind, ${user?.name || 'User'}?`}
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <input
              accept="image/*"
              id="file-input"
              type="file"
              style={{ display: 'none' }}
              onChange={e => setFile(e.target.files[0])}
            />
            <label htmlFor="file-input">
              <IconButton component="span">
                <PhotoCamera />
              </IconButton>
              {file?.name}
            </label>
          </div>
          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? 'Posting...' : 'Post'}
          </Button>
        </div>
      </form>
    </Paper>
  );
}
