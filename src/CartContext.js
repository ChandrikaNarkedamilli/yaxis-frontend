// app/context/CartContext.js
"use client";
import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("cartItems");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  // Sync to localStorage on change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, category) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      // increase quantity
      const updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([
        ...cartItems,
        { ...product, quantity: 1, category, name: product.description },
      ]);
    }
  };

  const updateCart = (items) => setCartItems(items);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
