'use client'

import React, { useEffect, useState } from 'react';
import Link  from 'next/link';
import axios from 'axios';

const NewsAll = () => {
  const [newsData, setNewsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all news
  const fetchNews = async () => {
    try {
      const res = await axios.get('http://localhost:3000/news'); // Adjust the API route as needed
      setNewsData(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching news:", err);
      setLoading(false);
    }
  };

  // Fetch all categories
  const fetchCategories = async () => {
  try {
    const res = await axios.get('http://localhost:3000/categories');
    setCategories(res.data.categories); // FIX HERE
  } catch (err) {
    console.error("Error fetching categories:", err);
  }
};

  // Handle deletion
  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this news item?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/news/${id}`); // Adjust the delete route
      setNewsData(newsData.filter(news => news.id !== id));
    } catch (err) {
      console.error("Error deleting news:", err);
    }
  };

  useEffect(() => {
    fetchNews();
    fetchCategories();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading news...</p>;

  return (
    <div className="p-6 mt-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All News</h1>
        <Link 
          to="/admin/addNews"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          ADD NEWS
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {newsData.length > 0 ? (
              newsData.map((news) => {
                const category = categories.find(cat => cat.id === news.categoryId); // Assuming `categoryId` is the key
                return (
                  <tr key={news.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-500">{news.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{news.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{category ? category.name : 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(news.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 flex gap-2">
                      <Link to={`/admin/news/${news.id}`} className="text-indigo-600 hover:text-indigo-900">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(news.id)} className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center px-6 py-4 text-gray-500">No news available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsAll;
