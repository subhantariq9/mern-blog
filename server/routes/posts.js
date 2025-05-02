import express from 'express';
import Post from '../models/Post.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

router.post('/', async (req, res) => {
  const { title, body, author } = req.body;
  const newPost = new Post({ title, body, author });
  const savedPost = await newPost.save();
  res.status(201).json(savedPost);
});

export default router;
