import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import OrderDetails from './pages/OrderDetails';
import AdminPanel from './pages/AdminPanel';
import AddOrder from './pages/AddOrder';
import Documents from './pages/Documents';
import Login from './pages/Login';
import { checkIsTokenAlive } from './component/fetches';
function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);
  
  useEffect(()=>{
    const result = checkIsTokenAlive();
    if(result){
      setIsUserLoggedIn(true);
    }
  },[])

  return (
    <Router>
      <Routes>
        <Route path="/" element={isUserLoggedIn ? <AdminPanel/> : <Login />} />
        <Route path="/dashboard" element={<AdminPanel />} />
        <Route path="/add-order" element={<AddOrder />} />
        <Route path ='/order_detail' element={<OrderDetails/>}/>
        <Route path ='/documents' element={<Documents/>}/>
      </Routes>
    </Router>
  );
}

export default App;
