import express from 'express';
import Post from '../models/Posts.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, body, author, createdAt } = req.body;
    const newPost = new Post({
      title,
      body,
      author,
      createdAt: createdAt ? new Date(createdAt) : undefined
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, body, author } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, body, author },
      { new: true }
    );
    if (!updatedPost) return res.status(404).json({ error: 'Post not found' });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

export default router;
