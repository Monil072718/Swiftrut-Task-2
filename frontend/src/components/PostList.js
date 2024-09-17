import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BlogContext } from '../Context/BlogContext';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';// Importing icons

const PostList = () => {
  const { posts, deletePost } = useContext(BlogContext);

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
        All Blog Posts
      </h2>
      {posts.length > 0 ? (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <Link
                    to={`/post/${post._id}`}
                    className="text-2xl font-semibold text-indigo-600 hover:text-indigo-500 transition duration-200"
                  >
                    {post.title}
                  </Link>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => deletePost(post._id)}
                      className="text-red-600 hover:text-red-800 transition duration-200 focus:outline-none"
                    >
                      <TrashIcon className="w-6 h-6" /> {/* Delete Icon */}
                    </button>
                    <Link
                      to={`/edit/${post._id}`}
                      className="text-blue-600 hover:text-blue-800 transition duration-200 focus:outline-none"
                    >
                      <PencilIcon className="w-6 h-6" /> {/* Edit Icon */}
                    </Link>
                  </div>
                </div>
                <p className="mt-4 text-gray-700 line-clamp-3">{post.content}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">No blog posts available. Create your first post!</p>
      )}
    </div>
  );
};

export default PostList;
