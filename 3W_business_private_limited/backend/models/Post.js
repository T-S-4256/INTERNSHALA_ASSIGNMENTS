const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  authorName: String,
  text: { type: String, default: '' },
  imageUrl: { type: String, default: '' }, // path to /uploads/...
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // store userIds
  likedUsernames: [String], // convenience to show usernames
  comments: [commentSchema]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
