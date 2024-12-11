import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/OrderList.css'

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const orderClick = (order) => {
    console.log(order)
    navigate(`/order_detail`, { state: { order } });
  }
  const getOrders = async () => {
    console.log(process.env.REACT_APP_SERVER_URL)
    setOrders(await (await fetch(`${process.env.REACT_APP_SERVER_URL}/order`)).json())
    console.log(orders)
  }
  useEffect(() => {
    getOrders()
  }, [])
  const id_status_list = [
    { id: 0, name: 'Нова заявка' },
    { id: 1, name: 'На завантаженні' },
    { id: 2, name: 'На митниці до погран переходу' },
    { id: 3, name: 'Погран перехід' },
    { id: 4, name: 'На митниці після погран переходу' },
    { id: 5, name: 'Ни вивантаженні' }
  ];
  return (
    <div className="order-list">
      <h2>Order List</h2>
      <ul className="order-cards">
        {[...orders].reverse().map((order, index) => (
          <li className="order-card" key={index} onClick={() => { orderClick(order) }}>
            <h3>{order.customer_company_name}</h3>
            <p><strong>CRM ID:</strong> {order.CRM_ID}</p>
            <p><strong>Текст статусу</strong> {order.status_message}</p>
            <p><strong>Статус</strong> {id_status_list.find(status => status.id === parseInt(order.status))?.name}</p>
            <p><strong>Approved:</strong> {order.approved ? 'Підтверджено' : 'Не підтверджено'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersList;