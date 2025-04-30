import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import User from './pages/USer';
import Order from './pages/Order';
import Product from './pages/Product';
import Stats from './pages/Stats';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<User />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/products" element={<Product />} />
        <Route path="/analytics" element={<Stats />} />
      </Routes>
    </Router>
  );
}

export default App;