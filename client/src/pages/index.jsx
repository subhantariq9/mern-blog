import React, { useEffect, useState } from 'react';

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setPosts(posts.filter((post) => post._id !== id));
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Blog Posts</h1>
      <button
        style={{
          padding: '10px 20px',
          marginBottom: '20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={() => (window.location.href = '/posts/new')}
      >
        Add New Post
      </button>
      {posts.length === 0 ? (
        <div>No posts available</div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {posts.map((post) => (
            <li
              key={post._id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '5px',
                padding: '15px',
                marginBottom: '10px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <small>By {post.author}</small>
              <div style={{ marginTop: '10px' }}>
                <button
                  style={{
                    padding: '5px 10px',
                    marginRight: '10px',
                    backgroundColor: '#2196F3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                  onClick={() => (window.location.href = `/posts/${post._id}`)}
                >
                  Edit
                </button>
                <button
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                  onClick={() => deletePost(post._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
