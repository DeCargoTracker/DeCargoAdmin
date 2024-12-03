import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/OrderList.css'

const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const getOrders = async()=>{
        setOrders(await(await fetch('http://localhost:3011/order')).json())
        console.log(orders)
    }
    const orderClick = (order)=>{
        console.log(order)
        navigate(`/order_detail`, { state: { order } });
    }
    useEffect(()=>{
        getOrders()
    },[])
    return (
        <div className="order-list">
    <h2>Order List</h2>
    <ul className="order-cards">
      {orders.map((order, index) => (
        <li className="order-card" key={index} onClick={()=>{orderClick(order)}}>
          <h3>{order.customer_company_name}</h3>
          <p><strong>CRM ID:</strong> {order.CRM_ID}</p>
          <p><strong>Status Message:</strong> {order.status_message}</p>
          <p><strong>Status ID:</strong> [{order.status}]</p>
        </li>
      ))}
    </ul>
  </div>
    );
};

export default OrdersList;