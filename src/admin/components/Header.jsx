'use client'

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LOGO from '../assets/logo.png';
import admin from '../assets/adminlogo.jpg';

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from local storage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="flex">
      {/* Top Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <Link to="/admin" className="flex items-center ms-2">
                <img src={LOGO} className="h-8 me-3" alt="Logo" />
                <span className="text-xl font-semibold whitespace-nowrap">
                  NEWSPORTAL
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <img className="w-10 h-10 rounded-full" src={admin} alt="user" />
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform transform bg-white border-r border-gray-200 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/admin"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                🏠 <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/news"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                📰 <span className="ms-3">News</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/category"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                📂 <span className="ms-3">Categories</span>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                🌐 <span className="ms-3">To Website</span>
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                🚪 <span className="ms-3">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Header;
