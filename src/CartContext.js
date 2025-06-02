// app/context/CartContext.js
"use client";
import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./components/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await axios.get(`${API_URL}/api/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 200) {
      setCartItems(res.data.items);
    }
  } catch (err) {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      // Optionally notify user or redirect
    } else {
      console.error("Failed to fetch cart:", err);
    }
  }
};

  useEffect(() => {
    fetchCart();
  }, []);

  const syncCartToBackend = async (updatedCart) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.post(
        `${API_URL}/api/cart/update`,
        { items: updatedCart },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Failed to sync cart:", err);
    }
  };

  const updateCart = (items) => {
    setCartItems(items);
    syncCartToBackend(items);
  };

  const addToCart = async (product, category) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${API_URL}/api/cart`,
        {
          name: product.name,
          price: product.price,
          category,
          description: product.description,
        },
        { headers: {
          Authorization: `Bearer ${token}`,
        }, 
      }
      );

      setCartItems(res.data.cart.items);
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
