"use client";

import axios from 'axios';

export default function ServiceCard({ service, userId, token, isDragOver, onDragStart, onDragOver, onDragLeave, onDrop }) {
  const addToCart = async () => {
    await axios.post('http://localhost:5000/api/cart', 
      { userId, serviceId: service._id, quantity: 1 },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert('Added to cart');
  };

  return (
    <div
      className={`service-card ${isDragOver ? 'drag-over' : ''}`}
      draggable="true"
      onDragStart={(e) => onDragStart(e, service._id)}
      onDragOver={(e) => onDragOver(e, service._id)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, service._id)}
    >
      <h2>{service.name}</h2>
      <p>Price: ${service.price}</p>
      <p>Category: {service.category}</p>
      <button onClick={addToCart} className="btn btn-success">Add to Cart</button>
    </div>
  );
}