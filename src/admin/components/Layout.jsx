'use client'

import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='flex'>
      <div className='w-1/5'>
        <Header />
      </div>
      <div className='w-4/5'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;