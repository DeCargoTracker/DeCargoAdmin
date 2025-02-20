import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SHA256 from 'crypto-js/sha256';
const API_URL = process.env.REACT_APP_SERVER_URL;

const Login = () => {
    const [phone, setPhone] = useState('');
    const [pass, setPass] = useState('');
    const [isWarning, setIsWarning] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
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
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, hashedPass }),
                credentials: 'include', // Отправляем куки
            });
            console.log(`response  ${response}`)
            console.log(`response.ok  ${response.ok}`)
            if (response.ok) {
                console.log('navigate to dashboard')
                setIsAuthenticated(true)

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
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard', { replace: true });
        }
    },[isAuthenticated])
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
