'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link'

const LatestBusiness = () => {
  const [businessNews, setBusinessNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BUSINESS_CATEGORY_ID = 4;
  const fallbackImage = "https://via.placeholder.com/300x200?text=No+Image";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('http://localhost:3000/news');
        const filtered = res.data
          .filter(item => item.categoryId === BUSINESS_CATEGORY_ID)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);
        setBusinessNews(filtered);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch business news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div className="text-gray-500 text-center py-10">Loading business news...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
      {businessNews.map((item, idx) => (
        <div key={idx} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <Link href={`/news/${item.id}`}>
            <img
              src={item.image ? `http://localhost:3000/uploads/${item.image}` : fallbackImage}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackImage;
              }}
              alt="News"
              className="w-full h-48 object-cover"
            />
          </Link>
          <div className="p-5 flex flex-col justify-between h-[150px]">
            <h5 className="mb-4 text-lg font-semibold text-gray-900 line-clamp-2">
              {item.title}
            </h5>
            <Link
              href={`/news/${item.id}`}
              className="mt-auto inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
            >
              Read more
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LatestBusiness;
