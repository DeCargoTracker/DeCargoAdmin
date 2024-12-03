import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/OrderDetails.css'
const OrderDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [order, setOrder] = useState(location.state.order);
    const [selectedStatusID, setSelectedStatusID] = useState(order.status)
    const [isSaved, setIsSaved] = useState(false);
    const id_status_list = [
        { id: 1, name: 1 },
        { id: 2, name: 2 },
        { id: 3, name: 3 },
        { id: 4, name: 4 },
        { id: 5, name: 5 }
    ];
    const handleStatusIDChange = (e) => {
        setOrder({ ...order, 'status': selectedStatusID });
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrder({ ...order, [name]: value });
    };
    const handleSave = async() => {
        console.log(order)
        try {
            await fetch('http://localhost:3011/order/upd',{
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json' // Указываем, что тело запроса — JSON
                },
                body: await JSON.stringify(order)
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
    return (
        <div className={`order-details ${isSaved ? 'saved' : ''}`}>
            <h2>Order Details</h2>
            <div className='order_inputs'>
                <div>
                    <label>CRM ID:</label>
                    <input type="text" name="CRM_ID" value={order.CRM_ID} readOnly />
                </div>
                <div>
                    <label>Customer Company Name:</label>
                    <input
                        type="text"
                        name="customer_company_name"
                        value={order.customer_company_name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Customer Company Phone:</label>
                    <input
                        type="text"
                        name="customer_phoneNumber"
                        value={order.customer_phoneNumber}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Executor company name:</label>
                    <input
                        type="text"
                        name="executor_company_name"
                        value={order.executor_company_name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Executor phone:</label>
                    <input
                        type="text"
                        name="executor_phoneNumber"
                        value={order.executor_phoneNumber}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Status ID</label>
                    <select
                        id="id_status"
                        value={selectedStatusID}
                        onChange={(e) => setSelectedStatusID(e.target.value)}
                    >
                        {id_status_list.map((status_id) => (
                            <option key={status_id.id} value={status_id.name}>
                                {status_id.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Status Message:</label>
                    <input
                        type="text"
                        name="status_message"
                        value={order.status_message}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="text"
                        name="price"
                        value={order.price}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Start Date:</label>
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
