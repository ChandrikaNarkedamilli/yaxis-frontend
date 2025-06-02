"use client";
import Link from 'next/link';
import './globals.css'
import { useEffect, useState } from 'react';
import HomeSection from '@/components/HomeSection/HomeSection';

export default function Home() {
 const [user, setUser] = useState(null);

    useEffect(() => {
        // localStorage.clear();
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
      <HomeSection />
    </div>    
    </>
    
  );
}