"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "../../../src/CartContext"; // adjust path
import "./CartPage.css";
import { API_URL } from "@/components/api";
import { useAuth } from "../../../src/AuthContext";
import axios from "axios";
import Link from "next/link";

const CartPage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div style={{'margin-left': '10px'}}>
        <h3>Please login to access your cart.</h3>
        <Link href="/login"><button className="save-btn">Login</button></Link>
      </div>
    );
  }
  const { cartItems, updateCart } = useCart();
  const [donation, setDonation] = useState(0);
  const platformFee = 20;


  const increaseQuantity = (id) => {
    const updated = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQuantity = (id) => {
    const updated = cartItems.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCart(updated);
  };

  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/api/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Then update local state by removing item:
      const updated = cartItems.filter(item => item._id !== id);
      updateCart(updated);
    } catch (err) {
      console.error("Remove item error:", err);
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const uniqueCategories = [...new Set(cartItems.map((item) => item.category))];
  const isBundleDiscount = uniqueCategories.length >= 2;
  const discount = isBundleDiscount ? subtotal * 0.1 : 0;
  const total = subtotal - discount + donation + platformFee;

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/cart/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          donation,
          platformFee,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Order placed successfully!");
        updateCart([]);
        setDonation(0);
        localStorage.removeItem("cartItems");
        localStorage.setItem("orderUpdated", Date.now());
      } else {
        alert(data.message || "❌ Failed to place order");
      }
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("❌ Checkout failed due to an error");
    }
  };


  return (
    <div className="cart-page">
      {cartItems.length === 0 ? (
        <div className="empty-cart-container">
          <h2>Your cart is empty</h2>
          <p>Looks like you have not added anything to your cart. Go ahead & explore top categories.</p>
        </div>
      ) : (
        <div className="cart">
          <div className="cart-container">
            {cartItems.map((item) => (
              <div className="cart-card" key={item._id}>
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>Category: {item.category}</p>
                  <p>Price: ₹{item.price}</p>
                  <div className="quantity-control">
                    <button onClick={() => decreaseQuantity(item._id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item._id)}>+</button>
                  </div>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Price Details</h2>

            <div className="coupon-section">
              <p>Support Social Work:</p>
              <div className="donation-buttons">
                <button onClick={() => setDonation(10)}>₹10</button>
                <button onClick={() => setDonation(20)}>₹20</button>
                <button onClick={() => setDonation(30)}>₹30</button>
              </div>
            </div>

            <p>Subtotal: ₹{subtotal.toFixed(2)}</p>

            {isBundleDiscount && (
              <p className="discount">Bundle Discount: -₹{discount.toFixed(2)}</p>
            )}

            {donation > 0 && <p>Social Work Donation: ₹{donation.toFixed(2)}</p>}

            <p>Platform Fee: ₹{platformFee.toFixed(2)}</p>

            <h3>Total: ₹{total.toFixed(2)}</h3>

            <button className="checkout-btn" onClick={handleCheckout}>
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
