"use client";
import Link from 'next/link';
import './globals.css'
import { useEffect, useState } from 'react';

export default function Home() {
 const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                console.log("Decoded token payload:", payload);
                setUser(payload);
            } catch (err) {
                console.error("Error decoding token:", err);
            }
        } else {
            console.log("No token found in localStorage");
        }
    }, []);
  return (
    <>
    <div className="container">
      <h1>Welcome to Visa App</h1>
      <p>Explore our visa services and manage your applications.</p>
    </div>
    
    </>
    
  );
}