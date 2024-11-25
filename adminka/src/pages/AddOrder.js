import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../styles/AdminPanel.css'

const AddOrder = () => {
    const customers = [
        { id: 1, name: 'DECARGO GROUP Sp. z o.o' },
    ];
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [newOrder, setNewOrder] = useState({
        CRM_ID: '',
        customer_company_name: '',
        customer_phoneNumber: '',
        executor_company_name: '',
        executor_phoneNumber: '',
        status: '0',
        status_message: 'Нова заявка',
        price: '',
        start_date: '',
        end_date: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Order added successfully!');
        console.log('New Order:', JSON.stringify(newOrder));
        addOrder()
    };
    const addOrder = async () => {
        console.log('Push new order');
        await fetch('http://localhost:3011/order/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Устанавливает тип данных
            },
            body: JSON.stringify(newOrder), // Преобразование объекта в JSON
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Response:', data);
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <div className="add-order">
            <h1>Add New Order</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    CRM_ID:
                    <input
                        type="text"
                        value={newOrder.CRM_ID}
                        onChange={(e) => setNewOrder({ ...newOrder, CRM_ID: e.target.value })}
                    />
                </label>
                <label>
                    Customer
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
                </label>
                <label>
                    Customer Phone Number:
                    <input
                        type="text"
                        value={newOrder.customer_phoneNumber}
                        onChange={(e) => setNewOrder({ ...newOrder, customer_phoneNumber: e.target.value })}
                    />
                </label>
                <label>
                    Executor Company Name:
                    <input
                        type="text"
                        value={newOrder.executor_company_name}
                        onChange={(e) => setNewOrder({ ...newOrder, executor_company_name: e.target.value })}
                    />
                </label>
                <label>
                    Executor Phone Number:
                    <input
                        type="text"
                        value={newOrder.executor_phoneNumber}
                        onChange={(e) => setNewOrder({ ...newOrder, executor_phoneNumber: e.target.value })}
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="text"
                        value={newOrder.price}
                        onChange={(e) => setNewOrder({ ...newOrder, price: e.target.value })}
                    />
                </label>
                <label>
                    Start Date:
                    <input
                        type="date"
                        value={newOrder.start_date}
                        onChange={(e) => setNewOrder({ ...newOrder, start_date: e.target.value })}
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        value={newOrder.end_date}
                        onChange={(e) => setNewOrder({ ...newOrder, end_date: e.target.value })}
                    />
                </label>
                <button type="submit">Add Order</button>
            </form>
            <Link to="/" className="button">Back to Admin Panel</Link>
        </div>
    );
};

export default AddOrder;