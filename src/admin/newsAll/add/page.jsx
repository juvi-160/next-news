'use client'

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 


const AddNews = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    publisherName: '',
    description: '',
    image: null,
    categoryId: '',
    publishedAt: new Date().toISOString().slice(0, 16),
  });

  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);

  // -------------------------------
  // API ENDPOINTS
  const BASE_URL = 'http://localhost:5000'; // Change to your actual base URL
  const getCategories = async () => {
    return await axios.get(`${BASE_URL}/categories`);
  };

  const createNews = async (data) => {
    return await axios.post(`${BASE_URL}/news`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
  };
  // -------------------------------

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        console.log("Fetched categories:", response);

        const categoryList = Array.isArray(response.data)
          ? response.data
          : response.data.categories || [];

        setCategories(categoryList);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.publisherName.trim()) newErrors.publisherName = 'Publisher name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.image) newErrors.image = 'Image is required';
    if (!formData.categoryId) newErrors.categoryId = 'Category is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const submissionData = new FormData();
      submissionData.append('title', formData.title);
      submissionData.append('publisherName', formData.publisherName);
      submissionData.append('description', formData.description);
      submissionData.append('image', formData.image);
      submissionData.append('categoryId', formData.categoryId);
      submissionData.append('publishedAt', formData.publishedAt);

      const response = await createNews(submissionData);
      console.log(response);
      navigate('/admin/news');
    } catch (err) {
      console.error('News submission failed:', err.response || err.message);
      alert('Failed to create news. Please try again.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mt-15">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New News</h1>
        <button
          onClick={() => navigate('/admin/news')}
          className="text-gray-600 hover:text-gray-800 flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to News
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <div className="grid grid-cols-1 gap-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter news title"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          {/* Publisher Name */}
          <div>
            <label htmlFor="publisherName" className="block text-sm font-medium text-gray-700 mb-1">Publisher Name *</label>
            <input
              type="text"
              id="publisherName"
              name="publisherName"
              value={formData.publisherName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.publisherName ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter publisher name"
            />
            {errors.publisherName && <p className="mt-1 text-sm text-red-600">{errors.publisherName}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className={`w-full px-3 py-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter news description"
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          {/* Image */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Image *</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.categoryId ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select a category</option>
              {Array.isArray(categories) && categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            {errors.categoryId && <p className="mt-1 text-sm text-red-600">{errors.categoryId}</p>}
          </div>

          {/* Published At */}
          <div>
            <label htmlFor="publishedAt" className="block text-sm font-medium text-gray-700 mb-1">Published Date & Time</label>
            <input
              type="datetime-local"
              id="publishedAt"
              name="publishedAt"
              value={formData.publishedAt}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors">
              Add News
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNews;
