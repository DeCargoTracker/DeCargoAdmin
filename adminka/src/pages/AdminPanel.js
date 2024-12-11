import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/AdminPanel.css'
import OrdersList from './OrdersList';

const AdminPanel = () => {
  const go_to_page = () =>{
    console.log('navigate')
    navigate('/add-order')
  }
  const navigate = useNavigate();
  return (
    <div className="admin-panel">
      <h1>Logistics Admin Panel</h1>

      <button onClick={go_to_page} className="button">Add New Order</button>

      <OrdersList></OrdersList>
    </div>
  );
};

export default AdminPanel;