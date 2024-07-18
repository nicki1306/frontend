import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.js';
import { CartProvider } from './context/CartContext.js';
import Cart from './components/cart.js';
import Checkout from './components/checkout.js';
import Payment from './components/payment.js';
import ProductDetails from './components/ProductDetails.js';
import Login from './components/login.js';
import Register from './components/Register.js';
import ProductList from './components/ProductList.js';
import Home from './components/Home.js';

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

