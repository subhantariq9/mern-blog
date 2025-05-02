import React, { useEffect, useState } from 'react';

export default function PostDetails() {
  const [formData, setFormData] = useState({ title: '', body: '', author: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const postId = window.location.pathname.split('/').pop();
      try {
        const response = await fetch(`/api/posts/${postId}`);
        if (!response.ok) throw new Error('Failed to fetch post');
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postId = window.location.pathname.split('/').pop();
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMessage('Post updated successfully!');
        window.location.href = '/';
      } else {
        setMessage('Failed to update post.');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      setMessage('An error occurred.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Edit Post</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>Body</label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Update Post
        </button>
      </form>
    </div>
  );
}
