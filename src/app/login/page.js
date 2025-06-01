"use client";

import React from 'react';
import './login.css';

const LoginPage = () => {
    return (
        <div className="login-wrapper">
            <div className="login-container">
                <div className="login-left">
                    <div className="circle circle1"></div>
                    <div className="circle circle2"></div>
                    <h1>WELCOME</h1>
                    <h3>YOUR HEADLINE NAME</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed do eiusmod tempor incididunt ut labore.</p>
                </div>
                <div className="login-right">
                    <h2>LOG IN</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    <input type="text" placeholder="User Name" />
                    <input type="password" placeholder="Password" />
                    <div className="login-options">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="#">Forgot Password?</a>
                    </div>
                    <button className="primary-btn">Sign in</button>
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