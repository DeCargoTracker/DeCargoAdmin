import { apiRequest } from "./apiRequest"

export const addOrder = async (newOrder) => {
    console.log('Push new order');
    const result = await apiRequest('/order/add', { method: 'POST', body: JSON.stringify(newOrder) });
    console.log(result);
};

export const getOrders = async (isArchived) => {
    if (isArchived) {
        const orders = await apiRequest('/order/admin/archive', { method: 'GET' });
        console.log(orders);
        return orders;
    }
    else {
        const orders = await apiRequest('/order/admin/active', { method: 'GET' });
        console.log(orders);
        return orders;
    }
}

export const transferToArchiveOrder = async (order) => {
    console.log(`transferToArchiveOrder order ${order.CRM_ID} ${true}`)
    const newFields = { CRM_ID: order.CRM_ID, isArchivedAdmin: true }
    try {
        const response = await apiRequest('/order/upd', { method: 'PUT', body: JSON.stringify({ newFields }) });
        console.log(`archiveOrder response ${response}`);
    } catch (error) {
        console.log('Error in transferToArchiveOrder order', error)
    }
}

export const transferToActiveOrder = async (order) => {
    console.log(`transferToActiveOrder order ${order.CRM_ID} ${false}`)
    console.log(JSON.stringify({ CRM_ID: order.CRM_ID, isArchivedAdmin: false }))
    const newFields = { CRM_ID: order.CRM_ID, isArchivedAdmin: false }
    try {
        const response = await apiRequest('/order/upd', { method: 'PUT', body: JSON.stringify({ newFields }) });
        console.log(`archiveOrder response ${response}`);
    } catch (error) {
        console.log('Error in transferToActiveOrder order', error)
    }
}

export const transferToFinishedOrder = async (order) => {
    console.log(`transferToFinishedOrder order ${order.CRM_ID} ${true}`)
    const newFields = { CRM_ID: order.CRM_ID, isFinished: true }

    try {
        const response = await apiRequest('/order/upd', { method: 'PUT', body: JSON.stringify({ newFields }) });
        console.log(`archiveOrder response ${response}`);
    } catch (error) {
        console.log('Error in transferToFinishedOrder order', error)
    }
}

export const fetchDocuments = async (CRM_ID) => {
    console.log(`fetchDocuments ${CRM_ID}`)
    try {
        const response = await apiRequest(`/file/${CRM_ID}`, { method: 'GET' });
        return response
    } catch (error) {
        console.log('Error in fetchDocuments order', error)
    }
};
export const deleteDocument = async (id) => {
    console.log(id)
    try {
        const response = await apiRequest(`/file/${id}`, { method: "DELETE" });
        return response;
    } catch (error) {
      console.error("Помилка при видаленні документа", error);
    }
  };

export const updOrder = async (newFields) => {
    console.log(newFields)
    try {
        const result = await apiRequest('/order/upd', { method: 'PUT', body: JSON.stringify({newFields}) });
        return result
    } catch (error) {
        console.error("Помилка при оновленні замовлення", error);
    }
}

export const uploadFile = async (formData) => {
    try {
        const result = await apiRequest('/file/upload', { method: 'POST', body: formData });
        return result;
    } catch (error) {
        console.error("Помилка при завантаженні файлу", error);
    }
};
