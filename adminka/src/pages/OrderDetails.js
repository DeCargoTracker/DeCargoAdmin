import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/OrderDetails.css'
import DragDropFile from '../component/DragDropFile';
import { updOrder, uploadFile } from '../component/fetches';
const OrderDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [order, setOrder] = useState(location.state.order);
    const [selectedStatusID, setSelectedStatusID] = useState(order.status)
    const [selectedManager, setSelectedManager] = useState(order.manager);
    const [selectedCurrency, setselectedCurrency] = useState(order.currency);
    const [isSaved, setIsSaved] = useState(false);
    const [files, setFiles] = useState()
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
        const originalOrder = location.state.order;
    
        Object.keys(order).forEach((key) => {
            if (JSON.stringify(order[key]) !== JSON.stringify(originalOrder[key])) {
                updatedFields[key] = order[key];
            }
        });
    
        // Убираем ненужное обновление start_date, если изменился только end_date
        if (order.end_date !== originalOrder.end_date) {
            updatedFields.end_date = order.end_date;
        }
    
        return updatedFields;
    };
    

    const handleSave = async () => {
        const updatedFields = await getUpdatedFields();
        try {
            if (Object.keys(updatedFields).length > 0) {
                const newFields = { ...updatedFields, approved: false, CRM_ID: location.state.order.CRM_ID }
                const result = await updOrder(newFields);
                console.log('Order updated:', result);
            }
            if(files){
                if (files.length > 0) {
                    console.log(`Start load files ${JSON.stringify(files)}`)
                    const formData = new FormData();
                    formData.append("CRM_ID", `${order.CRM_ID}`); // Пример CRM_ID
                    files.forEach((file) => formData.append("file", file)); // Добавляем файлы
                    console.log(formData)
                    const response = await uploadFile(formData);
                    console.log(response)
                }
            }
            
            setIsSaved(true);
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);
        } catch (error) {
            console.log('Error in upd order', error)
            setIsSaved(false);
        }
    };
    const handleOpenDocuments = async () => {
        navigate('/documents', {state: {CRM:location.state.order.CRM_ID} });
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
                    <label>Дата закінчення:</label>
                    <input
                        type="date"
                        name="end_date"
                        value={order.end_date}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <DragDropFile onFilesSelect={setFiles} />
                </div>
            </div>
            <button onClick={handleSave}>Зберегти</button>
            <button onClick={handleOpenDocuments}>Документи</button>
            <button onClick={() => navigate('/dashboard')}>Відміна</button>
        </div>
    );
};

export default OrderDetails;
