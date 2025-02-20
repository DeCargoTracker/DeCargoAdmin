const API_URL = process.env.REACT_APP_SERVER_URL;

// Функция обновления accessToken (токен будет храниться в заголовках)
const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await fetch(`${API_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) throw new Error('Failed to refresh token');
        
        const data = await response.json();
        const newAccessToken = data.accessToken;

        // Сохраняем новый токен в локальном хранилище или где-то еще
        localStorage.setItem('accessToken', newAccessToken);
        
        return true;
    } catch (error) {
        console.log('Refresh token error:', error.message);
        return false;
    }
};

// Функция-обёртка для API-запросов с автообновлением токена
const apiRequest = async (endpoint, options = {}) => {
    const headers = options.body instanceof FormData
        ? {} // ❌ Не добавляем 'Content-Type' для FormData
        : { 'Content-Type': 'application/json' };

    // Получаем токен из хранилища
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    let response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            ...headers,
            ...options.headers,
        },
    });

    if (response.status === 403 || response.status === 401) {
        console.log('Trying to refresh token...');
        const refreshToken = localStorage.getItem('refreshToken');
        const refreshed = await refreshAccessToken(refreshToken);
        if (!refreshed) {
            console.log('Token refresh failed, logging out...');
            return { error: 'SESSION_EXPIRED' };
        }

        console.log('Retrying request with new token...');
        const newAccessToken = localStorage.getItem('accessToken');
        response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
                ...headers,
                Authorization: `Bearer ${newAccessToken}`,
            },
        });
    }

    return response.json();
};

export { apiRequest };
