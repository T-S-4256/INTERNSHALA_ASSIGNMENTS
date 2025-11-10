const express = require('express');
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const Post = require('../models/Post');
const User = require('../models/User');

const router = express.Router();

// multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

// Create a post
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { text } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const user = await User.findById(req.user.id);
    if (!user) return res.status(400).json({ message: 'Invalid user' });

    const post = new Post({
      authorId: user._id,
      authorName: user.name,
      text: text || '',
      imageUrl
    });

    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get feed (public) - supports pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.json({ posts, page });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle like
router.post('/:postId/like', auth, async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    const userName = req.user.name;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const idx = post.likes.findIndex(id => id.toString() === userId);
    if (idx === -1) {
      post.likes.push(userId);
      post.likedUsernames.push(userName);
    } else {
      post.likes.splice(idx, 1);
      const nameIdx = post.likedUsernames.indexOf(userName);
      if (nameIdx !== -1) post.likedUsernames.splice(nameIdx, 1);
    }

    await post.save();
    res.json({ likesCount: post.likes.length, likedUsernames: post.likedUsernames });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Comment
router.post('/:postId/comment', auth, async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Comment text required' });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = {
      userId: req.user.id,
      username: req.user.name,
      text
    };

    post.comments.push(comment);
    await post.save();
    res.json({ commentsCount: post.comments.length, comment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
