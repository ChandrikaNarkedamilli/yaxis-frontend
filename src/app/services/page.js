"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import ServiceCard from '../../components/ServiceCard';
import Link from 'next/link';
import TabsCard from '@/components/TabsCard/TabsCard';

export default function Services() {



  // const [services, setServices] = useState([]);
  // const [token, setToken] = useState(null);
  // const [userId, setUserId] = useState(null);
  // const [dragId, setDragId] = useState(null);
  // const [dragOverId, setDragOverId] = useState(null);

  // // useEffect(() => {
  // //   const storedToken = localStorage.getItem('token');
  // //   const storedUserId = localStorage.getItem('userId');
  // //   if (storedToken && storedUserId) {
  // //     setToken(storedToken);
  // //     setUserId(storedUserId);
  // //   }
  // // }, []);

  // // useEffect(() => {
  // //   if (token) {
  // //     axios.get('http://localhost:5000/api/services', {
  // //       headers: { Authorization: `Bearer ${token}` },
  // //     })
  // //       .then(res => setServices(res.data))
  // //       .catch(err => console.error(err));
  // //   }
  // // }, [token]);

  // const handleDragStart = (e, id) => {
  //   setDragId(id);
  //   e.dataTransfer.effectAllowed = 'move';
  // };

  // const handleDragOver = (e, id) => {
  //   e.preventDefault();
  //   e.dataTransfer.dropEffect = 'move';
  //   setDragOverId(id);
  // };

  // const handleDragLeave = () => {
  //   setDragOverId(null);
  // };

  // const handleDrop = (e, dropId) => {
  //   e.preventDefault();
  //   if (dragId === dropId) return;

  //   const draggedIndex = services.findIndex(s => s._id === dragId);
  //   const dropIndex = services.findIndex(s => s._id === dropId);
  //   const newServices = [...services];
  //   const [draggedItem] = newServices.splice(draggedIndex, 1);
  //   newServices.splice(dropIndex, 0, draggedItem);

  //   setServices(newServices);
  //   setDragId(null);
  //   setDragOverId(null);
  // };

  // // if (!token) {
  // //   return (
  // //     <div className="container">
  // //       <h1>Services</h1>
  // //       <p>Please <Link href="/login">log in</Link> to view services.</p>
  // //     </div>
  // //   );
  // // }

  return (
    <div className="container">
      <h1>Visa Services</h1>
      <div className="service-grid">
        {/* {services.map(service => (
          <ServiceCard
            key={service._id}
            service={service}
            userId={userId}
            token={token}
            isDragOver={dragOverId === service._id}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          />
        ))} */}
        <TabsCard />
      </div>
    </div>
  );
}