"use client";

import React,{useState} from 'react';
import './register.css';
import { API_URL } from '@/components/api';
import V from '../../assets/Combined Shape.png';
import I from '../../assets/path11.png'
import S from '../../assets/path13.png';
import A from '../../assets/polygon9.png';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegister = async () => {
    if (!formData.agreed) return alert("Please agree to the terms and conditions.");
    if (formData.password !== formData.confirmPassword)
      return alert("Passwords do not match.");

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful!");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <div className="register-left">
          <div className="circle circle1"></div>
          <div className="circle circle2"></div>
          <img src={V} alt="V" className="logo" />
          <img src={I} alt="I" className="logo" />
          <img src={S} alt="S" className="logo" />
          <img src={A} alt="A" className="logo" />
        </div>
        <div className="register-right">
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="agreed"
              checked={formData.agreed}
              onChange={handleChange}
            />
            I agree to the Terms and Conditions
          </label>
          <button className="primary-btn" onClick={handleRegister}>
            Sign Up
          </button>
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