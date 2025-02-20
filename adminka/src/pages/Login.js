import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SHA256 from 'crypto-js/sha256';
const API_URL = process.env.REACT_APP_SERVER_URL;

const Login = () => {
    const [phone, setPhone] = useState('');
    const [pass, setPass] = useState('');
    const [isWarning, setIsWarning] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const hashPassword = (password) => {
        return SHA256(password).toString();
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!phone || !pass) {
            setIsWarning(true);
            return;
        }

        try {
            setIsLoading(true);
            setIsWarning(false);
            const hashedPass = hashPassword(pass);
            console.log(hashedPass)
            console.log(`${API_URL}`)
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, hashedPass }),
            });
            const data = await response.json()
            console.log(data.accessToken)
            console.log(data.refreshToken)
            console.log(data.user)
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('user', JSON.stringify(data.user));

            if (response.ok) {
                console.log(response.ok)
                navigate('/dashboard'); // Редирект в админку
            } else {
                setIsWarning(true);
            }
        } catch (error) {
            console.error('Ошибка входа:', error);
            setIsWarning(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Вхід</h2>
            <form onSubmit={handleSubmit}>
                <label>Логін:</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <label>Пароль:</label>
                <input
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />

                {isWarning && <p className="warning">Невірний логін або пароль</p>}

                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Завантаження...' : 'Авторизуватись'}
                </button>
            </form>
        </div>
    );
};

export default Login;