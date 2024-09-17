import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogContext } from '../Context/BlogContext'; 
import { PencilIcon} from '@heroicons/react/outline';

const EditPost = () => {
  const { id } = useParams();
  const { posts, updatePost } = useContext(BlogContext); // Use context to get posts and updatePost function
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const postToEdit = posts.find((post) => post._id === id);
    if (postToEdit) {
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
    }
  }, [id, posts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePost({ _id: id, title, content }); // Update the post using context
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">Edit Post</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8">
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Post Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter post title"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Post Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter post content"
            rows="6"
          ></textarea>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-lg hover:bg-indigo-500 focus:ring focus:ring-indigo-400 transition duration-150 ease-in-out"
        >
          <PencilIcon className="h-5 w-5 mr-2" />
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
