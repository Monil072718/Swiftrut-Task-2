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
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-semibold mb-6">All Blog Posts</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <div key={post._id} className="bg-white p-6 shadow-md rounded-lg">
            <Link to={`/post/${post._id}`}>
              <h3 className="text-xl font-bold text-indigo-600 mb-2">{post.title}</h3>
            </Link>
            <p className="text-gray-600 mb-4">{post.content.substring(0, 100)}...</p>
            <div className="flex justify-between items-center">
              <button
                onClick={() => handleDelete(post._id)}
                className="text-red-500 hover:text-red-600"
              >
                Delete
              </button>
              <Link
                to={`/edit/${post._id}`}
                className="text-indigo-600 hover:text-indigo-700"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
