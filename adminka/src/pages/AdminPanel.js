import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../styles/AdminPanel.css'
import OrdersList from './OrdersList';

const AdminPanel = () => {
  const [selectedCustomer, setSelectedCustomer] = useState('');

  return (
    <div className="admin-panel">
      <h1>Logistics Admin Panel</h1>

      <Link to="/add-order" className="button">Add New Order</Link>

      <OrdersList></OrdersList>
    </div>
  );
};

export default AdminPanel;