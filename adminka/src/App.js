import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import OrderDetails from './pages/OrderDetails';
import AdminPanel from './pages/AdminPanel';
import AddOrder from './pages/AddOrder';
import Documents from './pages/Documents';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminPanel />} />
        <Route path="/add-order" element={<AddOrder />} />
        <Route path ='/order_detail' element={<OrderDetails/>}/>
        <Route path ='/documents' element={<Documents/>}/>
      </Routes>
    </Router>
  );
}

export default App;
