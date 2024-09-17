import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, deletePost } from '../Api';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await getPosts();
    setPosts(response.data);
  };

  const handleDelete = async (id) => {
    await deletePost(id);
    fetchPosts(); // Refresh posts after deletion
  };

  return (
    <div>
      <h2>All Blog Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <Link to={`/post/${post._id}`}>{post.title}</Link>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
            <Link to={`/edit/${post._id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;