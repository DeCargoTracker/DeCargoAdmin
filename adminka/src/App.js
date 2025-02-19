import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import OrderDetails from './pages/OrderDetails';
import AdminPanel from './pages/AdminPanel';
import AddOrder from './pages/AddOrder';
import Documents from './pages/Documents';
import Login from './pages/LoginPage';
import { apiRequest } from './component/apiRequest';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await apiRequest('/auth/check', { method: 'GET' });
      if (result.status === 200) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Пока идёт проверка токена - ничего не показываем (можно добавить загрузку)
  if (isAuthenticated === null) return <div>Загрузка...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={<AdminPanel />} />
        <Route path="/add-order" element={<AddOrder />} />
        <Route path='/order_detail' element={<OrderDetails />} />
        <Route path='/documents' element={<Documents />} />
      </Routes>
    </Router>
  );
}

export default App;
