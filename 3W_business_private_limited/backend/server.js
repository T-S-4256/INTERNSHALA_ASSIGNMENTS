require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./Routes/auth');
const postsRoutes = require('./Routes/posts');

const app = express();

// ✅ Allowed origins (Netlify + local)
const allowedOrigins = [
  'http://localhost:3000',
  'https://incandescent-capybara-f48116.netlify.app'
];

// ✅ CORS Middleware (runs first)
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log('❌ Blocked by CORS:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// ✅ Manual fallback (guaranteed header)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://incandescent-capybara-f48116.netlify.app');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// ✅ Test route
app.get('/', (req, res) => {
  res.send('🚀 Server is running successfully with full CORS headers!');
});

// ✅ Serve images + API routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);

// ✅ MongoDB connection (without app.listen)
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error', err));

// 🚀 DO NOT call app.listen() on Vercel
module.exports = app;
