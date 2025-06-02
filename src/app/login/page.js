"use client";

import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import './login.css';
import { API_URL } from '@/components/api';
import { AuthContext } from '../../../src/AuthContext' // make sure you created AuthContext
import Link from 'next/link';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const router = useRouter();
    const { setIsLoggedIn, setUser } = useContext(AuthContext);

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (token) {
    //         router.push("/"); // Already logged in
    //     }
    // }, []);

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
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.userId);

                setIsLoggedIn(true); // update auth context
                setUser({ email: formData.email, id: data.userId }); // optional

                alert("✅ Login successful!");

                if (data.isNewUser) {
                    router.push("/register");
                } else {
                    router.push("/");
                }
            } else {
                alert(data.message || "❌ Login failed.");
            }
        } catch (error) {
            console.error(error);
            alert("❌ Something went wrong.");
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
                    <h2>LOGIN</h2>
                    <p>Sign in to continue</p>
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
                        Don’t have an account? <Link href="/register">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
