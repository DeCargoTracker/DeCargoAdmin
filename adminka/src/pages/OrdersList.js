import React, { useEffect, useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
import '../styles/OrderList.css'
import { transferToArchiveOrder, getOrders, transferToActiveOrder, transferToFinishedOrder } from '../component/fetches';
import { apiRequest } from '../component/apiRequest';

const OrdersList = ({ isArchived }) => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      const result = await apiRequest('/auth/check', { method: 'GET' });
      if (result.status === 200) {
        return;
      } else {
        console.log(result.status)
      }
    };

    checkAuth();
  }, []);  const orderClick = (order) => {
    console.log(order)
    navigate(`/order_detail`, { state: { order } });
  }
  const ApiRequestGetOrders = async () => {
    const orders = await getOrders(isArchived)
    setOrders(orders)
    console.log(orders)
  }
  useEffect(() => {
    console.log(`Archived in orders list ${isArchived}`)
    ApiRequestGetOrders()
  }, [isArchived])
  const id_status_list = [
    { id: 0, name: 'Нова заявка' },
    { id: 1, name: 'На завантаженні' },
    { id: 2, name: 'На митниці до погран переходу' },
    { id: 3, name: 'Погран перехід' },
    { id: 4, name: 'На митниці після погран переходу' },
    { id: 5, name: 'Ни вивантаженні' }
  ];
  const finishOrder = async (order) => {
    await transferToFinishedOrder(order)
    await ApiRequestGetOrders()
  }
  const ApiRequesttransferToArchiveOrder = async (order) => {
    await transferToArchiveOrder(order)
    await ApiRequestGetOrders()
  }
  const UNtransferToArchiveOrder = async (order) => {
    await transferToActiveOrder(order)
    await ApiRequestGetOrders()
  }
  return (
    <div className="order-list">
      <h2>Order List</h2>
      <ul className="order-cards">
        {[...orders].reverse().map((order) => (
          <li className="order-card" key={order._id || order.CRM_ID} onClick={() => orderClick(order)}>
            <h3>{order.customer_company_name}</h3>
            <p><strong>CRM ID:</strong> {order.CRM_ID}</p>
            <p><strong>Напрямок:</strong> {order.delivery_path}</p>
            <p><strong>Текст статусу:</strong> {order.status_message}</p>
            <p><strong>Статус:</strong> {id_status_list.find(status => status.id === parseInt(order.status))?.name}</p>
            <p><strong>Approved:</strong> {order.approved ? 'Підтверджено ✅' : 'Не підтверджено ❗'}</p>
            <p><strong>Finished:</strong> {order.isFinished ? 'Завершено ✅' : 'Не завершено ❗'}</p>

            {!order.isFinished && parseInt(order.status) === 5 && order.approved && (
              <button onClick={() => finishOrder(order)} className="button">Завершити перевезення</button>
            )}

            {order.isFinished && (
              order.isArchivedAdmin ? (
                <button onClick={() => UNtransferToArchiveOrder(order)} className="button">Зробити активним</button>
              ) : (
                <button onClick={() => ApiRequesttransferToArchiveOrder(order)} className="button">Додати в архів</button>
              )
            )}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default OrdersList;