import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import User from './pages/USer';
import Order from './pages/Order';
import Product from './pages/Product';
import Stats from './pages/Stats';
import ProductCategory from './pages/ProductCategory';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from './store/Slice/Login';
import Logout from './pages/Logout';
import CategoryList from './components/category/CategoryList';
import ProductIntro from './pages/ProductIntro';
import ParentCategory from './pages/ParentCategory';

function App() {
  const { user } = useSelector(state => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch(loginSuccess({ data: { user: JSON.parse(storedUser) } }));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />
        <Route 
          path="/home" 
          element={user ? <Home /> : <Navigate to="/" />} 
        />
        <Route 
          path="/users" 
          element={user ? <User /> : <Navigate to="/" />} 
        />
        <Route 
          path="/orders" 
          element={user ? <Order /> : <Navigate to="/" />} 
        />
        <Route 
          path="/products" 
          element={user ? <Product /> : <Navigate to="/" />} 
        />
     
        <Route 
          path="/categories" 
          element={user ? <ProductCategory /> : <Navigate to="/" />} 
        />
        <Route 
          path="/analytics" 
          element={user ? <Stats /> : <Navigate to="/" />} 
        />
        <Route path="/logout" element={<Logout />} />
        <Route 
          path="/product-intros" 
          element={user ? <ProductIntro /> : <Navigate to="/" />} 
        />
        <Route 
          path="/parent-categories" 
          element={user ? <ParentCategory /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;