import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import Cart from './components/cart.jsx';
import Checkout from './components/checkout.jsx';
import Payment from './components/payment.jsx';
import ProductDetails from './components/ProductDetails.jsx';
import Login from './components/login.jsx';
import Register from './components/Register.jsx';
import ProductList from './components/ProductList.jsx';
import Home from './components/Home.jsx';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <header className="App-header">
            <p>Bienvenido a la tienda de juguetes</p>
          </header>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

