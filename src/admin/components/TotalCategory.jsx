'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatsCard from './StatsCard';

const TotalCategory = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/categories/count'); // Full backend URL
        setCount(response.data.count);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching category count:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <StatsCard 
      title="TOTAL CATEGORIES" 
      count={count} 
      loading={loading}
      error={error}
    />
  );
};

export default TotalCategory;
