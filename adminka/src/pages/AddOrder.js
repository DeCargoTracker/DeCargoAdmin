import React, { useEffect, useState } from 'react';
import { BrowserRouter as Link, useFetcher } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { addOrder, getUsers } from '../component/fetches';
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

    const [customers, setCusomers] = useState(null)
    const [customers_managers, setCustomers_managers] = useState(null)
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedCusomerManager, setSelectedCustomerManager] = useState('')
    const [selectedManager, setSelectedManager] = useState('');
    const [selectedCurrency, setselectedCurrency] = useState('');
    const [users, setUsers] = useState()
    const [isdataReady, setIsDataReady] = useState(false)
    const [newOrder, setNewOrder] = useState({
        CRM_ID: '',
        customer_company_name: '',
        customer_company_name_employee: '',
        delivery_path: '',
        truck_number: '',
        crossing_point: '',
        manager: '',
        status: '0',
        status_message: 'Нова заявка',
        price: '',
        currency: '',
        start_date: '',
        end_date: '',
        approved: false,
        isFinished: false,
    });
    const initUsers = async () => {
        setIsDataReady(false)
        setUsers(await getUsers())
    }
    const back_to_adminPanel = () => {
        navigate('/dashboard')
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('added')
        console.log('New Order:', JSON.stringify(newOrder));
        addOrder(newOrder);
        navigate(`/dashboard`);
    };
    useEffect(() => {
        initUsers()
    }, [])
    useEffect(() => {
        if (users) {
            let i = 0;
            let j = 0;
            let list_customers = [];
            let list_cusomers_managers = [];
            let uniqueNames = new Set(); // Множество для отслеживания уникальных имен
            let uniqueManagers = new Set();
            users.forEach(element => {
                if (!uniqueNames.has(element.company_name)) {
                    i += 1;
                    list_customers.push({ id: i, name: element.company_name });
                    uniqueNames.add(element.company_name);
                }
                if (!uniqueManagers.has(element.name)) {
                    j += 1;
                    list_cusomers_managers.push({ id: j, name: element.name, company_name: element.company_name });
                    uniqueManagers.add(element.name);
                }
            });

            console.log('List of unique customers company name');
            console.log(list_customers);
            console.log(`List of customers managers`)
            console.log(list_cusomers_managers)
            setCustomers_managers(list_cusomers_managers)
            setCusomers(list_customers);
        }
    }, [users]);

    useEffect(() => {
        if (customers && customers_managers) {
            setIsDataReady(true)
        } else {
            setIsDataReady(false)
        }
    }, [customers, customers_managers])

    return (
        <>
            {isdataReady ? <div className="add-order">
                <h1>Add New Order</h1>
                <form onSubmit={handleSubmit} style={{ minWidth: '94%' }}>
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
                        <select
                            id="customer"
                            value={selectedCustomer}
                            onChange={(e) => [setNewOrder({ ...newOrder, customer_company_name: e.target.value }), setSelectedCustomer(e.target.value)]}
                        >
                            <option value="">--  --</option>
                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.name}>
                                    {customer.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Відповідальна особа від замовника:
                        <select
                            id="customer_manager"
                            value={selectedCusomerManager}
                            onChange={(e) => [setNewOrder({ ...newOrder, customer_company_name_employee: e.target.value }), setSelectedCustomerManager(e.target.value)]}
                        >
                            <option value="">--  --</option>
                            {customers_managers
                                .filter(x => x.company_name === selectedCustomer)
                                .map(customer => (
                                    <option key={customer.id} value={customer.name}>
                                        {customer.name}
                                    </option>
                                ))}

                        </select>
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
            </div> : <h1>Loading data</h1>}
        </>
    );
};

export default AddOrder;