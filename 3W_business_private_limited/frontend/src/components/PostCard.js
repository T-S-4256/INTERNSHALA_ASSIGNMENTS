import React, { useState, useContext } from 'react';
import { Paper, Typography, IconButton, TextField, Button, Avatar, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import API from '../api';
import { AuthContext } from '../contexts/AuthContext';

export default function PostCard({ post, onLikeUpdate, onAddComment }) {
  const { user } = useContext(AuthContext);
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [liking, setLiking] = useState(false);

  const likesCount = post.likedUsernames?.length || (post.likes?.length || 0);

  const handleLike = async () => {
    if (!user) return alert('Login to like');
    try {
      setLiking(true);
      const res = await API.post(`/posts/${post._id}/like`);
      onLikeUpdate(post._id, res.data.likesCount, res.data.likedUsernames);
    } catch (err) {
      console.error(err);
    } finally {
      setLiking(false);
    }
  };

  const submitComment = async (e) => {
    e?.preventDefault();
    if (!commentText) return;
    try {
      setSubmittingComment(true);
      const res = await API.post(`/posts/${post._id}/comment`, { text: commentText });
      onAddComment(post._id, res.data.comment);
      setCommentText('');
    } catch (err) {
      console.error(err);
      alert('Failed to comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  const imgUrl = post.imageUrl ? (process.env.REACT_APP_API_URL?.replace('/api','') || 'http://localhost:5000') + post.imageUrl : null;

  return (
    <Paper style={{ padding: 12, marginBottom: 12 }}>
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar>{post.authorName?.[0]?.toUpperCase()}</Avatar>
        <div>
          <Typography variant="subtitle1">{post.authorName}</Typography>
          <Typography variant="caption">{new Date(post.createdAt).toLocaleString()}</Typography>
        </div>
      </Box>
      <Typography style={{ marginTop: 8, marginBottom: 8 }}>{post.text}</Typography>
      {imgUrl && <img src={imgUrl} alt="post" style={{ width: '100%', borderRadius: 8, marginBottom: 8 }} />}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <div>
          <IconButton onClick={handleLike} disabled={liking}>
            <FavoriteIcon color="error" />
          </IconButton>
          <span>{likesCount}</span>
          <IconButton>
            <ChatBubbleOutlineIcon />
          </IconButton>
          <span>{post.comments?.length || 0}</span>
        </div>
        <IconButton>
          <ShareIcon />
        </IconButton>
      </Box>

      {/* show list of usernames who liked (small) */}
      {post.likedUsernames && post.likedUsernames.length > 0 && (
        <Typography variant="caption">{post.likedUsernames.slice(0,5).join(', ')}{post.likedUsernames.length>5?` and ${post.likedUsernames.length-5} others`:''}</Typography>
      )}

      {/* Comments */}
      <div style={{ marginTop: 12 }}>
        {(post.comments || []).map((c, idx) => (
          <div key={idx} style={{ padding: 6, borderBottom: '1px solid #eee' }}>
            <Typography variant="subtitle2">{c.username}</Typography>
            <Typography variant="body2">{c.text}</Typography>
          </div>
        ))}
      </div>

      <form onSubmit={submitComment} style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <TextField size="small" placeholder="Write a comment..." value={commentText} onChange={e => setCommentText(e.target.value)} fullWidth />
        <Button type="submit" variant="contained" disabled={submittingComment}>{submittingComment ? '...' : 'Comment'}</Button>
      </form>
    </Paper>
  );
}
