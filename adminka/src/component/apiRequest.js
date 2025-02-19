const API_URL = process.env.REACT_APP_SERVER_URL;

// Функция обновления accessToken (куки хранят токены)
const refreshAccessToken = async () => {
    try {
        const response = await fetch(`${API_URL}/auth/refresh`, {
            method: 'POST',
            credentials: 'include', // Отправка куков
        });

        if (!response.ok) throw new Error('Failed to refresh token');
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

    let response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            ...headers,
            ...options.headers,
        },
        credentials: 'include', // ✅ Куки передаются
    });

    if (response.status === 403 || response.status === 401) {
        console.log('Trying to refresh token...');
        const refreshed = await refreshAccessToken();
        if (!refreshed) {
            console.log('Token refresh failed, logging out...');
            return { error: 'SESSION_EXPIRED' };
        }

        console.log('Retrying request with new token...');
        response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
                ...headers,
                ...options.headers,
            },
            credentials: 'include',
        });
    }

    return response.json();
};



export { apiRequest };
