import React, { useState } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import '../styles/AdminPanel.css'
import { useNavigate } from 'react-router-dom';
import { addOrder } from '../component/fetches';
const AddOrder = () => {
    const navigate = useNavigate();
    const managers = [
        { id: 1, name: 'Олександр' },
        { id: 2, name: 'Лева' },
        { id: 4, name: 'Анастасія' },
    ];
    const currency_list = [
        { id: 1, name: 'UAH' },
        { id: 2, name: 'EUR' },
        { id: 3, name: 'USD' },
    ];
    const customers = [
        { id: 1, name: 'Шпіц' },
        { id: 2, name: 'DECARGO GROUP Sp. z o.o' },
        { id: 3, name: 'TransExpress' },
    ];
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedManager, setSelectedManager] = useState('');
    const [selectedCurrency, setselectedCurrency] = useState('');
    const [newOrder, setNewOrder] = useState({
        CRM_ID:'',
        customer_company_name:'',
        customer_company_name_employee:'',
        delivery_path:'',
        truck_number:'',
        crossing_point:'',
        manager:'',
        status:'0',
        status_message:'Нова заявка',
        price:'',
        currency:'',
        start_date:'',
        end_date:'',
        approved:false,
        isFinished:false,
    });
    const back_to_adminPanel = () =>{
        navigate('/dashboard')
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('added')
        console.log('New Order:', JSON.stringify(newOrder));
        addOrder(newOrder);
        navigate(`/dashboard`);
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
                    Замовник
                    {/* <select
                        id="customer"
                        value={selectedCustomer}
                        onChange={(e) => [setNewOrder({ ...newOrder, customer_company_name: e.target.value }), setSelectedCustomer(e.target.value)]}
                    >
                        <option value="">-- Select Customer --</option>
                        {customers.map((customer) => (
                            <option key={customer.id} value={customer.name}>
                                {customer.name}
                            </option>
                        ))}
                    </select> */}
                    <input
                        type="text"
                        value={newOrder.customer_company_name}
                        onChange={(e) => setNewOrder({ ...newOrder, customer_company_name: e.target.value })}
                    />
                </label>
                <label>
                    Відповідальна особа від замовника:
                    <input
                        type="text"
                        value={newOrder.customer_company_name_employee}
                        onChange={(e) => setNewOrder({ ...newOrder, customer_company_name_employee: e.target.value })}
                    />
                </label>
                <label>
                    Маршрут
                    <input
                        type="text"
                        value={newOrder.delivery_path}
                        onChange={(e) => setNewOrder({ ...newOrder, delivery_path: e.target.value })}
                    />
                </label>
                <label>
                    Номера авто
                    <input
                        type="text"
                        value={newOrder.truck_number}
                        onChange={(e) => setNewOrder({ ...newOrder, truck_number: e.target.value })}
                    />
                </label>
                <label>
                    Погран перехід
                    <input
                        type="text"
                        value={newOrder.crossing_point}
                        onChange={(e) => setNewOrder({ ...newOrder, crossing_point: e.target.value })}
                    />
                </label>
                <label>
                    Менеджер:
                    <select
                        id="executor"
                        value={selectedManager}
                        onChange={(e) => [setSelectedManager(e.target.value), setNewOrder({ ...newOrder, manager: e.target.value })]}
                    >
                        <option value="">-- Оберіть менеджера --</option>
                        {managers.map((manager) => (
                            <option key={manager.id} value={manager.name}>
                                {manager.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Ціна
                    <input
                        type="text"
                        value={newOrder.price}
                        onChange={(e) => setNewOrder({ ...newOrder, price: e.target.value })}
                    />
                    <select
                        id="currency"
                        value={selectedCurrency}
                        onChange={(e) => [setselectedCurrency(e.target.value), setNewOrder({ ...newOrder, currency: e.target.value })]}
                    >
                        <option value="">-- Оберіть валюту --</option>
                        {currency_list.map((currency) => (
                            <option key={currency.id} value={currency.name}>
                                {currency.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Дата початку:
                    <input
                        type="date"
                        value={newOrder.start_date}
                        onChange={(e) => setNewOrder({ ...newOrder, start_date: e.target.value })}
                    />
                </label>
                <button type="submit">Add Order</button>
            </form>
            <button onClick={back_to_adminPanel} className="button">Back to Admin Panel</button>
        </div>
    );
};

export default AddOrder;