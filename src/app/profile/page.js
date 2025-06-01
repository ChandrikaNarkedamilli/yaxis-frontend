"use client";

import React, { useState, useEffect } from "react";
import "./profile.css";
import jwt_decode from 'jwt-decode';

const ProfilePage = () => {
	const [user, setUser] = useState({ name: '', email: '' });
	const [isDialogOpen, setDialogOpen] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [isOrderDialogOpen, setOrderDialogOpen] = useState(false);
	const [draftData, setDraftData] = useState({});
	const [formData, setFormData] = useState({
		name : "",
		dob: "1990-10-12",
		email: "",
		phone: "",
	});
	const [orders, setOrders] = useState([
		{
			id: "VISA-2024-01",
			from: "New Delhi, India",
			to: "London, UK",
			visaType: "Tourist",
			submissionDate: "2025-05-12",
			travelDate: "2025-06-10",
			status: "Approved",
			referenceId: "UKVISA000123",
		},
		{
			id: "VISA-2024-02",
			from: "Mumbai, India",
			to: "Dubai, UAE",
			visaType: "Business",
			submissionDate: "2025-05-20",
			travelDate: "2025-06-15",
			status: "Processing",
			referenceId: "DXBVISA000456",
		},
	]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const payload = JSON.parse(atob(token.split('.')[1]));
		console.log(payload);
			try {
				const decoded = jwt_decode(token);
				console.log("Decoded token:", decoded);
				setUser({ name: decoded.name, email: decoded.email });
				setFormData({
					name : decoded.name || "",
					dob: "1990-10-12",
					email: decoded.email || "",
					phone: "(+91) 99999-99999", 
				});
			} catch (err) {
				console.error("Invalid token:", err);
			}
		}
	}, []);

	const handleEditClick = () => {
		setDraftData({ ...formData });
		setDialogOpen(true);
	};

	const handleDraftChange = (e) => {
		const { name, value } = e.target;
		setDraftData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSave = () => {
		setFormData(draftData);
		setDialogOpen(false);
	};

	return (
		<div className="profile-page">
			<h2>My Profile</h2>
			<div className="profile-header">
				<img
					className="profile-avatar"
					src="https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_items_boosted&w=740"
					alt="Profile"
				/>
				<div className="profile-info">
					<h3>{formData.name}</h3>
					<p>{formData.phone}</p>
				</div>
				<button className="edit-btn" onClick={handleEditClick}>Edit ✏️</button>
			</div>
			<div className="profile-section">
				<div className="section-header">
					<h4>Personal Information</h4>
				</div>
				<div className="info-grid">
					<div><label>Name</label><p>{formData.name}</p></div>
					<div><label>Date of Birth</label><p>{formData.dob}</p></div>
					<div><label>Email Address</label><p>{formData.email}</p></div>
					<div><label>Phone Number</label><p>{formData.phone}</p></div>
				</div>
			</div>
			<div className="profile-section">
				<div className="section-header"><h4>My Orders</h4></div>
				<div className="orders-table">
					<div className="order-row header">
						<div>Order ID</div><div>From</div><div>To</div><div>Status</div><div></div>
					</div>
					{orders.map((order) => (
						<div className="order-row" key={order.id}>
							<div>{order.id}</div>
							<div>{order.from}</div>
							<div>{order.to}</div>
							<div>{order.status}</div>
							<div>
								<button
									className="view-btn"
									onClick={() => {
										setSelectedOrder(order);
										setOrderDialogOpen(true);
									}}
								>View</button>
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
							{Object.entries(selectedOrder).map(([key, val]) => (
								<div key={key} className="dialog-field">
									<label>{key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}</label>
									<p className={key === "status" ? `status-badge ${val.toLowerCase()}` : ""}>{val}</p>
								</div>
							))}
						</div>
						<div className="dialog-actions">
							<button onClick={() => setOrderDialogOpen(false)} className="view-btn">Close</button>
						</div>
					</div>
				</div>
			)}

			{/* Edit Dialog */}
			{isDialogOpen && (
				<div className="dialog-backdrop">
					<div className="dialog">
						<h3>Edit Personal Info</h3>
						<div className="dialog-content">
							<input name="name" value={draftData.name || ''} onChange={handleDraftChange} placeholder="Name" />
							<input name="dob" type="date" value={draftData.dob || ''} onChange={handleDraftChange} placeholder="Date of Birth" />
							<input name="email" value={draftData.email || ''} onChange={handleDraftChange} placeholder="Email" />
							<input name="phone" value={draftData.phone || ''} onChange={handleDraftChange} placeholder="Phone Number" />
						</div>	
						<div className="dialog-actions">
							<button onClick={handleSave} className="save-btn">Save</button>
							<button onClick={() => setDialogOpen(false)} className="cancel-btn">Cancel</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfilePage;
