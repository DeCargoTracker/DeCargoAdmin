import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/AdminPanel.css'
import OrdersList from './OrdersList';

const AdminPanel = () => {
  const go_to_page = () => {
    console.log('navigate')
    navigate('/add-order')
  }
  const ShowArchive = () => {
    console.log(`Switch archived ${isArchived}`)
    setIsArchived(!isArchived)
    console.log(`To ${isArchived}`)
  }
  const [isArchived, setIsArchived] = useState(false)
  const navigate = useNavigate();
  return (
    <div className="admin-panel">
      <h1>Logistics Admin Panel</h1>

      <div className='btns'>
        <button onClick={go_to_page} className="button">Add New Order</button>
        <button onClick={ShowArchive} className="button">{isArchived ? "Архив" : "Активные"}</button>
      </div>
      <OrdersList isArchived={isArchived}></OrdersList>
    </div>
  );
};

export default AdminPanel;