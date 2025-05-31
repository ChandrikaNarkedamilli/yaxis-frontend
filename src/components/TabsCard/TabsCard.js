// TabsCard.js
"use client";
import React, { useState } from "react";
import { useCart } from "../../../src/CartContext"// adjust path
import "./TabsCard.css";

const TabsCard = () => {
  const tabs = [
    "Visa Consultation",
    "Document Support",
    "Travel Insurance",
    "Priority Processing",
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const { addToCart } = useCart();

  const renderContent = () => {
    const products = visaProducts[activeTab] || [];

    return (
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h3>{product.description}</h3>
            <p className="price">{product.price}</p>
            <p className="duration">Delivery within 2–3 days</p>
            <button
              className="add-to-cart-btn"
              onClick={() => {
                addToCart(product, activeTab);
                alert(`${product.description} added to cart`);
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="card">
      <div className="tab-header">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="tab-content">{renderContent()}</div>
    </div>
  );
};

// Sample products (same as yours)
const visaProducts = {
  "Visa Consultation": [
    { id: 1, price: 99, description: "Tourist Visa Consultation" },
    { id: 2, price: 149, description: "Business Visa Consultation" },
    { id: 3, price: 199, description: "Student Visa Consultation" },
  ],
  "Document Support": [
    { id: 4, price: 59, description: "Form Filling Assistance" },
    { id: 5, price: 89, description: "Document Verification" },
  ],
  "Travel Insurance": [
    { id: 6, price: 120, description: "Basic Travel Insurance" },
    { id: 7, price: 180, description: "Comprehensive Travel Insurance" },
  ],
  "Priority Processing": [
    { id: 8, price: 70, description: "24-Hour Processing" },
    { id: 9, price: 90, description: "Same-Day Processing" },
  ],
};

export default TabsCard;
