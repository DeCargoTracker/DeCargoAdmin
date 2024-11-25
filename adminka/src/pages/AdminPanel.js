import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../styles/AdminPanel.css'
const customers = [
  { id: 1, name: 'Шпіц' },
  { id: 2, name: 'DECARGO GROUP Sp. z o.o' },
  { id: 3, name: 'TransExpress' },
];

const AdminPanel = () => {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [orders, setOrders] = useState([]);

  return (
    <div className="admin-panel">
      <h1>Logistics Admin Panel</h1>

      <div className="customer-selection">
        <label htmlFor="customer">Select Customer:</label>
        <select
          id="customer"
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
        >
          <option value="">-- Select Customer --</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.name}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>

      <Link to="/add-order" className="button">Add New Order</Link>

      <div className="order-list">
        <h2>Order List</h2>
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              {order.customer_company_name} - {order.CRM_ID} - {order.status_message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;