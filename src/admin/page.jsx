import React from 'react';
import NewsStats from './components/NewsStats.jsx';
import TotalCategory from './components/TotalCategory.jsx';

const Admin = () => {


  return (
    <div className='p-4 pt-20'>
      <div className='font-bold text-2xl pb-8'>
        <h1>Welcome Admin</h1>
      </div>

      <div className='grid h-56 grid-cols-2 gap-4 '>
        <TotalCategory/>
        <NewsStats category="india" title="India" />
        <NewsStats category="world" title="World" />
        <NewsStats category="sports" title="Sports" />
        <NewsStats category="business" title="Business" />

      </div>
    </div>
  );
};

export default Admin;