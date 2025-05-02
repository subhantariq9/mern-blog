import React, { useState } from 'react';

export default function NewPost() {
  const [formData, setFormData] = useState({ title: '', body: '', author: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.body || !formData.author) {
      setMessage('All fields are required.');
      return;
    }
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, createdAt: new Date().toISOString() }),
      });
      if (response.ok) {
        setMessage('Post created successfully!');
        setFormData({ title: '', body: '', author: '' });
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'Failed to create post.');
      }
    } catch (error) {
      setMessage('An error occurred.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Create New Post</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Body</label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
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
          Add Post
        </button>
      </form>
    </div>
  );
}
