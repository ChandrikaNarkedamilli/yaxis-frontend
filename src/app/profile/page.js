"use client";

import React, { useState, useEffect } from "react";
import "./profile.css";
import axios from "axios";
import { API_URL } from "@/components/api";

const ProfilePage = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderDialogOpen, setOrderDialogOpen] = useState(false);
  const [draftData, setDraftData] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    dob: "1990-10-12",
    email: "",
    phone: "",
  });
  const [orders, setOrders] = useState([]);

  // Fetch profile and orders from backend
  const fetchProfileData = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const headers = { Authorization: `Bearer ${token}` };

    // Call profile API
    const profileRes = await axios.get(`${API_URL}/api/auth/profile`, { headers });
    console.log("Profile API response:", profileRes);

    const data = profileRes.data;

    if (!data?.user) {
      throw new Error("Invalid user data received");
    }

    const userInfo = data.user;
    setUser({ name: userInfo.username || "", email: userInfo.email || "" });
    setFormData({
      name: userInfo.username || "",
      dob: userInfo.dob || "2001-10-12",
      email: userInfo.email || "",
      phone: userInfo.phone || "(+91) 99999-99999",
    });

    // Now fetch orders separately using the userId
    const ordersRes = await axios.get(`${API_URL}/api/orders/user/${userInfo._id}`, { headers });
    console.log("Orders API response:", ordersRes);

    setOrders(ordersRes.data.orders || []); // Assuming backend returns { orders: [...] }

  } catch (error) {
    console.error("Error fetching profile or orders:", error);
  }
};

  useEffect(() => {
    fetchProfileData();
      const handleStorageChange = (event) => {
    if (event.key === "orderUpdated") {
      fetchProfileData();
    }
  };

  window.addEventListener("storage", handleStorageChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
  }, []);

  const handleEditClick = () => {
    setDraftData({ ...formData });
    setDialogOpen(true);
  };

  const handleDraftChange = (e) => {
    const { name, value } = e.target;
    setDraftData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setFormData(draftData);
    setDialogOpen(false);

    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      await axios.patch(`${API_URL}/api/auth/profile`, draftData, { headers });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="profile-page">
      <h2>My Profile</h2>

      <div className="profile-header">
        <img
          className="profile-avatar"
          src="https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg"
          alt="Profile"
        />
        <div className="profile-info">
          <h3>{formData.name}</h3>
          <p>{formData.phone}</p>
        </div>

      </div>

      <div className="profile-section">
        <div className="section-header">
          <h4>Personal Information</h4>
        </div>
        <div className="info-grid">
          <div>
            <label>Name</label>
            <p>{formData.name}</p>
          </div>
          <div>
            <label>Date of Birth</label>
            <p>{formData.dob}</p>
          </div>
          <div>
            <label>Email Address</label>
            <p>{formData.email}</p>
          </div>
          <div>
            <label>Phone Number</label>
            <p>{formData.phone}</p>
          </div>
        </div>
      </div>

      <div className="profile-section">
        <div className="section-header">
          <h4>My Orders</h4>
        </div>
        <div className="orders-table">
          <div className="order-row header">
            <div>Order ID</div>
            <div>Status</div>
          </div>
          {orders.map((order) => (
            <div className="order-row" key={order._id}>
              <div>
                <ol>
                  {order.items.map((item) => (
                    <div key={item._id}>
                        <li>{item.name}</li>
                    </div>
                  ))}
                </ol>
              </div>
              <div>Pending</div>
              <div>
                <button
                  className="view-btn"
                  onClick={() => {
                    setSelectedOrder(order);
                    setOrderDialogOpen(true);
                  }}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Dialog */}
      {isOrderDialogOpen && selectedOrder && (
  <div className="dialog-backdrop">
    <div className="dialog order-dialog">
      <h3>Visa Order Details</h3>
      <div className="dialog-content grid-layout">
        <div>
          <h4>Items</h4>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.items.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <strong>Total Price: </strong> ${selectedOrder.total.toFixed(2)}
        </div>
        <div style={{ marginTop: "1rem" }}>
          <strong>Status: </strong>
          <span className={`status-badge ${selectedOrder.status}`}>
            Pending
          </span>
        </div>
      </div>
      <div className="dialog-actions">
        <button onClick={() => setOrderDialogOpen(false)} className="view-btn">
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ProfilePage;
