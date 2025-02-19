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
      try {
        const result = await apiRequest('/auth/check', { method: 'GET' });
        setIsAuthenticated(result.status === 200);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) return <div>Загрузка...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={isAuthenticated ? <AdminPanel /> : <Navigate to="/" />} />
        <Route path="/add-order" element={isAuthenticated ? <AddOrder /> : <Navigate to="/" />} />
        <Route path="/order_detail" element={isAuthenticated ? <OrderDetails /> : <Navigate to="/" />} />
        <Route path="/documents" element={isAuthenticated ? <Documents /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* <-- добавил обработку 404 */}
      </Routes>
    </Router>
  );
}

export default App;
