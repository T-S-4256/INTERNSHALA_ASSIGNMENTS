import React, { useEffect, useState, useContext } from 'react';
import API from '../api';
import { Box, CircularProgress, Button } from '@mui/material';
import CreatePostCard from '../components/CreatePostCard';
import PostCard from '../components/PostCard';
import { AuthContext } from '../contexts/AuthContext';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);

  const fetchPosts = async (p = 1) => {
    try {
      setLoading(true);
      const res = await API.get(`/posts?page=${p}&limit=10`);
      if (p === 1) setPosts(res.data.posts);
      else setPosts(prev => [...prev, ...res.data.posts]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(1); }, []);

  const handleNewPost = (post) => {
    // add new post to top
    setPosts(prev => [post, ...prev]);
  };

  const handleLikeUpdate = (postId, likesCount, likedUsernames) => {
    setPosts(prev => prev.map(p => p._id === postId ? { ...p, likes: new Array(likesCount).fill(null).map((_,i)=> null), likedUsernames } : p));
    // we keep posts' likes as count only, UI uses likedUsernames to show names
  };

  const handleAddComment = (postId, comment) => {
    setPosts(prev => prev.map(p => p._id === postId ? { ...p, comments: [...(p.comments || []), comment] } : p));
  };

  return (
    <Box>
      <CreatePostCard onPostCreated={handleNewPost} />
      {loading && <CircularProgress />}
      {!loading && posts.length === 0 && <div>No posts yet</div>}
      {posts.map(post => (
        <PostCard
          key={post._id}
          post={post}
          onLikeUpdate={handleLikeUpdate}
          onAddComment={handleAddComment}
        />
      ))}
      <Box textAlign="center" mt={2}>
        <Button variant="outlined" onClick={() => { setPage(p=>p+1); fetchPosts(page+1); }}>Load more</Button>
      </Box>
    </Box>
  );
}
