'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Title from '../components/Title';
import Link  from 'next/link';

const Business = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/news');
        console.log(response.data); // should be an array
        const worldNews = response.data.filter(newsItem => newsItem.categoryId === 4);

        setNewsData(worldNews);
      } catch (err) {
        console.error(err);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);


  if (loading) return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="mt-5 mb-10 px-4 sm:px-10">
      <div className="mb-6">
        <Title title="BUSINESS NEWS" />
      </div>

      <div className="grid grid-cols-1 gap-8">
        {newsData.length > 0 ? (
          newsData.map((newsItem, index) => (
            <div key={index} className="bg-amber-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col md:flex-row gap-6 p-6">
                <div className="flex-shrink-0">
                  <img
                    src={`http://localhost:3000/uploads/${newsItem.image}` || 'https://via.placeholder.com/300x200?text=No+Image'}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                    }}
                    alt="News"
                    className="h-60 w-full object-cover md:w-80 rounded-md"
                  />

                </div>

                <div className="flex flex-col justify-center">
                  <h2 className="text-xl font-bold mb-2 text-gray-800">{newsItem.title}</h2>
                  <Link href={`/news/${newsItem.id}`} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 w-fit">
                    READ MORE
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No world news available</div>
        )}
      </div>
    </div>
  );
};

export default Business;
