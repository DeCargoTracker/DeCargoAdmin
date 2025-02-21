import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/OrderDetails.css';

const OrderHistory = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [order] = useState(location.state.order);
    const [historyIndex, setHistoryIndex] = useState(order.history.length - 1); // Показываем последний элемент истории
    const [highlightedFields, setHighlightedFields] = useState([]);
    const [currentUpdates, setCurrentUpdates] = useState([]);
    
    const id_status_list = [
        { id: 0, name: 'Нова заявка' },
        { id: 1, name: 'На завантаженні' },
        { id: 2, name: 'На митниці до погран переходу' },
        { id: 3, name: 'Погран перехід' },
        { id: 4, name: 'На митниці після погран переходу' },
        { id: 5, name: 'Ни вивантаженні' }
    ];

    const currentHistory = order.history[historyIndex] || null;

    useEffect(() => {
        if (currentHistory) {
            const updatedFields = currentHistory.updates.map(update => update.field);
            setCurrentUpdates(currentHistory.updates);
            setHighlightedFields(updatedFields);

            // Применяем изменения к текущим данным заказа
            currentUpdates.forEach(element => {
                if (order.hasOwnProperty(element.field)) {
                    
                    order[element.field] = element.newValue;
                }
            });
            console.log(JSON.stringify(order))
            // Снимаем подсветку через 1.5 секунды
            setTimeout(() => setHighlightedFields([]), 1500);
        }
    }, [currentHistory, currentUpdates]);

    const getFieldClass = (field) => {
        return highlightedFields.includes(field) ? 'highlight' : '';
    };

    // Логирование изменений
    useEffect(() => {
        console.log(`Current updates: ${JSON.stringify(currentUpdates)}`);
        console.log(order);
    }, [currentUpdates]);

    const handleHistoryChange = (direction) => {
        setHistoryIndex(prev => {
            let newIndex = prev + direction;
            if (newIndex < 0) newIndex = 0;
            if (newIndex >= order.history.length) newIndex = order.history.length - 1;
            return newIndex;
        });
    };

    return (
        <div className="order-details">
            <h2>Order Details</h2>
            {currentHistory && (
                <div className="order-history">
                    <h3>Історія змін</h3>
                    <p>Час оновлення: {new Date(currentHistory.updatedAt).toLocaleString()}</p>
                    <div className="history-navigation">
                        <button
                            onClick={() => handleHistoryChange(-1)}  // Перейти назад
                            disabled={historyIndex === 0}
                        >
                            Назад
                        </button>
                        <button
                            onClick={() => handleHistoryChange(1)}  // Перейти вперед
                            disabled={historyIndex === order.history.length - 1}
                        >
                            Вперед
                        </button>
                    </div>
                </div>
            )}

            {/* Детали текущего заказа */}
            <div className="order_inputs">
                <div>
                    <label>CRM ID:</label>
                    <input
                        type="text"
                        name="CRM_ID"
                        value={order.CRM_ID}
                        readOnly
                        className={getFieldClass('CRM_ID')}
                    />
                </div>
                <div>
                    <label>Замовник</label>
                    <input
                        type="text"
                        name="customer_company_name"
                        value={order.customer_company_name}
                        readOnly
                        className={getFieldClass('customer_company_name')}
                    />
                </div>
                <div>
                    <label>Відповідальна особа від замовника:</label>
                    <input
                        type="text"
                        name="customer_company_name_employee"
                        value={order.customer_company_name_employee}
                        readOnly
                        className={getFieldClass('customer_company_name_employee')}
                    />
                </div>
                <div>
                    <label>Маршрут</label>
                    <input
                        type="text"
                        name="delivery_path"
                        value={order.delivery_path}
                        readOnly
                        className={getFieldClass('delivery_path')}
                    />
                </div>
                <div>
                    <label>Номера авто</label>
                    <input
                        type="text"
                        name="truck_number"
                        value={order.truck_number}
                        readOnly
                        className={getFieldClass('truck_number')}
                    />
                </div>
                <div>
                    <label>Погран перехід</label>
                    <input
                        type="text"
                        name="crossing_point"
                        value={order.crossing_point}
                        readOnly
                        className={getFieldClass('crossing_point')}
                    />
                </div>
                <div>
                    <label>Менеджер</label>
                    <input
                        type="text"
                        name="manager"
                        value={order.manager}
                        readOnly
                        className={getFieldClass('manager')}
                    />
                </div>
                <div>
                    <label>Ціна</label>
                    <input
                        type="text"
                        name="price"
                        value={order.price}
                        readOnly
                        className={getFieldClass('price')}
                    />
                    <input
                        type="text"
                        name="currency"
                        value={order.currency}
                        readOnly
                        className={getFieldClass('currency')}
                    />
                </div>
                <div>
                    <label>Статус авто</label>
                    <input
                        type="text"
                        name="status"
                        value={id_status_list.find(status => status.id === parseInt(order.status))?.name}
                        readOnly
                        className={getFieldClass('status')}
                    />
                </div>
                <div>
                    <label>Статус текстом</label>
                    <input
                        type="text"
                        name="status_message"
                        value={order.status_message}
                        readOnly
                        className={getFieldClass('status_message')}
                    />
                </div>
                <div>
                    <label>Дата завантаження</label>
                    <input
                        type="date"
                        name="start_date"
                        value={order.start_date}
                        readOnly
                        className={getFieldClass('start_date')}
                    />
                </div>
                <div>
                    <label>Дата закінчення:</label>
                    <input
                        type="date"
                        name="end_date"
                        value={order.end_date}
                        readOnly
                        className={getFieldClass('end_date')}
                    />
                </div>
            </div>
            <button onClick={() => navigate('/dashboard')}>Повернутись</button>
        </div>
    );
};

export default OrderHistory;
