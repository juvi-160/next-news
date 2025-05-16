'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link'

const LatestNews = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/news');
        const data = response.data;

        // Get the latest news per category
        const latestByCategory = Object.values(
          data.reduce((acc, item) => {
            const category = item.categoryId;
            if (!acc[category] || new Date(item.publishedAt) > new Date(acc[category].publishedAt)) {
              acc[category] = item;
            }
            return acc;
          }, {})
        );

        setNewsItems(latestByCategory);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  const goToPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? newsItems.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === newsItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto mt-5">
      <div className="relative h-64 md:h-96 overflow-hidden rounded-xl shadow-lg">
        {newsItems.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === activeIndex ? 'opacity-100 z-20' : 'opacity-0 z-10'}`}
          >
            {/* Wrap the image in a Link component to navigate to the news detail page */}
            <Link href={`/news/${item.id}`}>
              <img
                src={item.image ? `http://localhost:3000/uploads/${item.image}` : 'https://dummyimage.com/800x400/cccccc/000000&text=No+Image'}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </Link>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-4">
              <h2 className="text-white text-xl md:text-2xl font-bold">{item.title}</h2>
              <p className="text-white text-sm opacity-80 mt-1">
                {new Date(item.publishedAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {newsItems.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-3 h-3 rounded-full ${activeIndex === idx ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full z-30 hover:bg-black/60"
      >
        ‹
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full z-30 hover:bg-black/60"
      >
        ›
      </button>
    </div>
  );
};

export default LatestNews;
