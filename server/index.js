import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postsRouter from './routes/posts.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/posts', postsRouter); // Changed from '/posts' to '/api/posts'

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
