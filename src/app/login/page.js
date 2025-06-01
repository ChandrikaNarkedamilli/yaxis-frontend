"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './login.css';
import { API_URL } from '@/components/api'; 

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const router = useRouter(); 

    useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            console.log("Decoded token payload:", payload);
        } catch (err) {
            console.error("Error decoding token:", err);
        }
    } else {
        console.log("No token found in localStorage");
    }
}, []);

    const handleLogin = async () => {
        try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log("Full login response:", data);

        if (response.ok) {
            alert(data.success || "Login successful!");
            localStorage.setItem("token", data.token);
            console.log("Response from server:", data);
            localStorage.setItem("userId", data.userId);
            console.log("Saved token:", localStorage.getItem("token"));
            // Optionally navigate to another page
            router.push("/");
            
        } else {
            alert(data.message || "Login failed.");
        }
        } catch (error) {
        console.error(error);
        alert("Something went wrong.");
        }
    };

    return (
        <div className="login-wrapper">
        <div className="login-container">
            <div className="login-left">
            <div className="circle circle1"></div>
            <div className="circle circle2"></div>                    
            </div>
            <div className="login-right">
            <h2>LOG IN</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <div className="login-options">
                <label>
                <input type="checkbox" /> Remember me
                </label>
                <a href="#">Forgot Password?</a>
            </div>
            <button className="primary-btn" onClick={handleLogin}>Sign in</button>
            <div className="divider">Or</div>
            <button className="secondary-btn">Sign in with other</button>
            <p className="signup-text">
                Don’t have an account? <a href="#">Sign Up</a>
            </p>
            </div>
        </div>
        </div>
    );
};

export default LoginPage;
