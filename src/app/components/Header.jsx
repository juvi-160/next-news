'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(token !== null);
  }, []);

  return (
    <div className="flex justify-between items-center shadow-sm rounded-sm p-4">
      <div>
        <Link href="/">
          <img src="/logo.png" alt="LOGO" className="h-16 cursor-pointer" />
        </Link>
      </div>

      <div className="flex gap-4 font-bold">
        <Link href="/">HOME</Link>
        <Link href="/india">INDIA</Link>
        <Link href="/world">WORLD</Link>
        <Link href="/sports">SPORTS</Link>
        <Link href="/business">BUSINESS</Link>
      </div>

      <div className="font-bold">
        {isLoggedIn ? (
          <Link href="/admin">DASHBOARD</Link>
        ) : (
          <Link href="/login">LOGIN</Link>
        )}
      </div>
    </div>
  );
};

export default Header;
