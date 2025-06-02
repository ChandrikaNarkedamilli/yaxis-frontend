"use client"
import React, { useState, useEffect } from "react";
import { useCart } from "../../../src/CartContext";
import axios from "axios";
import { useAuth } from "../../../src/AuthContext";
import "./services.css";
import { API_URL } from "@/components/api";

const ServicesPage = () => {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("Visa Consultation");
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();

  const tabs = ["Visa Consultation", "Document Support", "Travel Insurance", "Priority Processing"];

  useEffect(() => {
    axios.get(`${API_URL}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Product fetch error:", err));
  }, []);

  const renderContent = () => {
    const filteredProducts = products.filter(p => p.category === activeTab);

    return (
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product._id}>
            <h3>{product.name}</h3>
            <p className="price">₹{product.price}</p>
            <p className="duration">Delivery within 2–3 days</p>
            <button
              className="add-to-cart-btn"
              onClick={() => {
                if (!isLoggedIn) {
                  alert("❌ Please login to use our services.");
                  return;
                }

                addToCart(product, activeTab);
                alert(`${product.name} added to cart`);
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
    <>
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
    </>
  );
};

export default ServicesPage;
