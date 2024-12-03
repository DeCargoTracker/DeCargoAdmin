import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import AddOrder from './pages/AddOrder';
import './App.css';
import OrderDetails from './pages/OrderDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminPanel />} />
        <Route path="/add-order" element={<AddOrder />} />
        <Route path ='/order_detail' element={<OrderDetails/>}/>
      </Routes>
    </Router>
  );
}

export default App;
