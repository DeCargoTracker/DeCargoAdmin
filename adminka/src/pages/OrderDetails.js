import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/OrderDetails.css'
const OrderDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [order, setOrder] = useState(location.state.order);
    const [selectedStatusID, setSelectedStatusID] = useState(order.status)
    const [selectedManager, setSelectedManager] = useState(order.manager);
    const [selectedCurrency, setselectedCurrency] = useState(order.currency);
    const [isSaved, setIsSaved] = useState(false);
    const id_status_list = [
        { id: 0, name: 'Нова заявка' },
        { id: 1, name: 'На завантаженні' },
        { id: 2, name: 'На митниці до погран переходу' },
        { id: 3, name: 'Погран перехід' },
        { id: 4, name: 'На митниці після погран переходу' },
        { id: 5, name: 'Ни вивантаженні' }
    ];
    const managers = [
        { id: 1, name: 'Олександр' },
        { id: 2, name: 'Лева' },
        { id: 3, name: 'Стас' },
        { id: 4, name: 'Анастасія' },
    ];
    const currency_list = [
        { id: 1, name: 'UAH' },
        { id: 2, name: 'EUR' },
        { id: 3, name: 'USD' },
    ];
    const handleCurrencyrChange = (e) => {
        setOrder({ ...order, 'currency': selectedCurrency });
    }
    const handleManagerChange = (e) => {
        setOrder({ ...order, 'manager': selectedManager });
    }
    const handleStatusIDChange = (e) => {
        console.log(e)
        setOrder({ ...order, 'status': selectedStatusID });
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrder({ ...order, [name]: value });
    };
    const getUpdatedFields = () => {
        const updatedFields = {};
        Object.keys(order).forEach((key) => {
            if (order[key] !== location.state.order[key]) {
                updatedFields[key] = order[key];
            }
        });
        if (!updatedFields.customer_company_name && location.state.order.customer_company_name) {
            updatedFields.customer_company_name = location.state.order.customer_company_name;
        }
        if (order.end_date !== location.state.order.end_date) {
            updatedFields.start_date = location.state.order.start_date;
        }
        return updatedFields;
    };
    
    const handleSave = async () => {
        const updatedFields = await getUpdatedFields();
        if (Object.keys(updatedFields).length === 0) {
            console.log('Нет изменений для сохранения.');
            return;
        }
        try {
            const newFields = {...updatedFields, approved:false, CRM_ID:location.state.order.CRM_ID}
            await fetch(`${process.env.REACT_APP_SERVER_URL}/order/upd`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json' // Указываем, что тело запроса — JSON
                },
                body: await JSON.stringify(newFields)
            })
            setIsSaved(true);
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (error) {
            console.log('Error in upd order', error)
            setIsSaved(false);
        }
    };

    useEffect(() => {
        handleStatusIDChange()
    }, [selectedStatusID])
    useEffect(() => {
        handleCurrencyrChange()
    }, [selectedCurrency])
    useEffect(() => {
        handleManagerChange()
    }, [selectedManager])
    return (
        <div className={`order-details ${isSaved ? 'saved' : ''}`}>
            <h2>Order Details</h2>
            <div className='order_inputs'>
                <div>
                    <label>CRM ID:</label>
                    <input type="text" name="CRM_ID" value={order.CRM_ID} readOnly />
                </div>
                <div>
                    <label>Замовник</label>
                    <input
                        type="text"
                        name="customer_company_name"
                        value={order.customer_company_name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Відповідальна особа від замовника:</label>
                    <input
                        type="text"
                        name="customer_company_name_employee"
                        value={order.customer_company_name_employee}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Маршрут</label>
                    <input
                        type="text"
                        name="delivery_path"
                        value={order.delivery_path}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Номера авто</label>
                    <input
                        type="text"
                        name="truck_number"
                        value={order.truck_number}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Погран перехід</label>
                    <input
                        type="text"
                        name="crossing_point"
                        value={order.crossing_point}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Менеджер</label>
                    <select
                        id="manager"
                        value={selectedManager}
                        onChange={(e) => setSelectedManager(e.target.value)}
                    >
                        <option value="">-- Оберіть менеджера --</option>
                        {managers.map((manager) => (
                            <option key={manager.id} value={manager.name}>
                                {manager.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Ціна</label>
                    <input
                        type="text"
                        name="price"
                        value={order.price}
                        onChange={handleInputChange}
                    />
                    <select
                        id="currency"
                        value={selectedCurrency}
                        onChange={(e) => setselectedCurrency(e.target.value)}
                    >
                        {currency_list.map((currency) => (
                            <option key={currency.id} value={currency.name}>
                                {currency.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Статус авто</label>
                    <select
                        id="id_status"
                        value={selectedStatusID}
                        onChange={(e) => setSelectedStatusID(e.target.value)} // получаем ID
                    >
                        {id_status_list.map((status) => (
                            <option key={status.id} value={status.id}> {/* используем ID */}
                                {status.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Статус текстом</label>
                    <input
                        type="text"
                        name="status_message"
                        value={order.status_message}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Дата завантаження</label>
                    <input
                        type="date"
                        name="start_date"
                        value={order.start_date}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <input
                        type="date"
                        name="end_date"
                        value={order.end_date}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Folder link</label>
                    <input
                        type="text"
                        name="folder_link"
                        value={order.folder_link}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => navigate('/')}>Cancel</button>
        </div>
    );
};

export default OrderDetails;
