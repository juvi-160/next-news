'use client'

import React from 'react';

const StatsCard = ({ title, count, loading = false, error = null }) => {
  return (
    <div className="bg-gradient-to-br from-amber-200 via-amber-100 to-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-sm transition-transform duration-300 hover:scale-105">
      <div className="flex flex-col items-start gap-2">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700">{title}</h2>
        {loading ? (
          <p className="text-sm text-gray-500 animate-pulse">Loading...</p>
        ) : error ? (
          <p className="text-sm text-red-500">Error: {error}</p>
        ) : (
          <p className="text-4xl font-bold text-indigo-700">{count}</p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
