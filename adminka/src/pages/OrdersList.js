import React, { useEffect, useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
import '../styles/OrderList.css'

const OrdersList = ({ isArchived }) => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const orderClick = (order) => {
    console.log(order)
    navigate(`/order_detail`, { state: { order } });
  }
  const getOrders = async () => {
    if (isArchived) {
      console.log(process.env.REACT_APP_SERVER_URL)
      setOrders(await (await fetch(`${process.env.REACT_APP_SERVER_URL}/order/admin/archive`)).json())
      console.log(orders)
    }
    else {
      console.log(process.env.REACT_APP_SERVER_URL)
      setOrders(await (await fetch(`${process.env.REACT_APP_SERVER_URL}/order/admin/active`)).json())
      console.log(orders)
    }
  }
  useEffect(() => {
    console.log(`Archived in orders list ${isArchived}`)
    getOrders()
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
    console.log(`Finishing order ${order.CRM_ID} ${true}`)
    try {
      const newFields = { customer_company_name: order.customer_company_name, CRM_ID: order.CRM_ID, isFinished: true }
      await fetch(`${process.env.REACT_APP_SERVER_URL}/order/upd`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json' // Указываем, что тело запроса — JSON
        },
        body: await JSON.stringify(newFields)
      })
    } catch (error) {
      console.log('Error in upd order', error)
    }
    getOrders()
  }
  const archiveOrder = async (order) => {
    console.log(`Archiving order ${order.CRM_ID} ${true}`)
    try {
      const newFields = { customer_company_name: order.customer_company_name, CRM_ID: order.CRM_ID, isArchivedAdmin: true }
      await fetch(`${process.env.REACT_APP_SERVER_URL}/order/upd`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json' // Указываем, что тело запроса — JSON
        },
        body: await JSON.stringify(newFields)
      })
    } catch (error) {
      console.log('Error in archiveOrder order', error)
    }
    getOrders()
  }
  const UNarchiveOrder = async (order) => {
    console.log(`Archiving order ${order.CRM_ID} ${false}`)
    try {
      const newFields = { customer_company_name: order.customer_company_name, CRM_ID: order.CRM_ID, isArchivedAdmin: false }
      await fetch(`${process.env.REACT_APP_SERVER_URL}/order/upd`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json' // Указываем, что тело запроса — JSON
        },
        body: await JSON.stringify(newFields)
      })
    } catch (error) {
      console.log('Error in archiveOrder order', error)
    }
    getOrders()
  }
  return (
    <div className="order-list">
      <h2>Order List</h2>
      <ul className="order-cards">
        {[...orders].reverse().map((order, index) => (
          <>
            <li className="order-card" key={index} onClick={() => { orderClick(order) }}>
              <h3>{order.customer_company_name}</h3>
              <p><strong>CRM ID:</strong> {order.CRM_ID}</p>
              <p><strong>Напрямок:</strong> {order.delivery_path}</p>
              <p><strong>Текст статусу</strong> {order.status_message}</p>
              <p><strong>Статус</strong> {id_status_list.find(status => status.id === parseInt(order.status))?.name}</p>
              <p><strong>Approved:</strong> {order.approved ? 'Підтверджено ✅' : 'Не підтверджено ❗'}</p>
              <p><strong>Finished:</strong> {order.isFinished ? 'Завершено ✅' : 'Не завершено ❗'}</p>
            </li>
            {!order.isFinished ?
              parseInt(order.status) == 5 && order.approved ? <button onClick={() => { finishOrder(order) }} className="button">Завершити перевезення</button> : <></>
              :
              <></>
            }
            {order.isFinished ? (
              !order.isArchivedAdmin ? (
                <button onClick={() => archiveOrder(order)} className="button">Додати в архів</button>
              ) : (
                <button onClick={() => UNarchiveOrder(order)} className="button">Зробити активним</button>
              )
            ) : null}

          </>
        ))}
      </ul>
    </div>
  );
};

export default OrdersList;