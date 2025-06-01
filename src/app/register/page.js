"use client";

import React from 'react';
import './register.css';

const RegisterPage = () => {
    return (
        <div className="register-wrapper">
            <div className="register-container">
                <div className="register-left">
                    <div className="circle circle1"></div>
                    <div className="circle circle2"></div>
                    <h1>JOIN US</h1>
                    <h3>YOUR HEADLINE NAME</h3>
                    <p>
                        Discover the benefits of becoming a member. Get started with your free account today.
                    </p>
                </div>
                <div className="register-right">
                    <h2>Sign Up</h2>
                    <p>Create your account. It's free and only takes a minute.</p>
                    <input type="text" placeholder="Full Name" />
                    <input type="email" placeholder="Email Address" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Confirm Password" />
                    <div className='checkbox'><input type="checkbox" />
                    <label className="checkbox-label">
                        I agree to the Terms and Conditions
                    </label></div>
                    <button className="primary-btn">Sign Up</button>
                    <div className="divider">Or</div>
                    <button className="secondary-btn">Sign up with other</button>
                    <p className="signin-text">
                        Already have an account? <a href="#">Sign In</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;