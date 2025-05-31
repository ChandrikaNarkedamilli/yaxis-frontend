"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    const storedName = localStorage.getItem('name');
    if (storedToken && storedUserId && storedName) {
      setToken(storedToken);
      setUserId(storedUserId);
      setName(storedName);
    }
  }, []);

  if (!token) {
    return (
      <div className="container">
        <h1>Profile</h1>
        <p>Please <Link href="/login">log in</Link> to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Profile</h1>
      <p>Name: {name}</p>
      <p>User ID: {userId}</p>
    </div>
  );
}