// frontend/src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Cart from './components/cart.js';
import Checkout from './components/checkout.js';
import Payment from './components/payment.js';
import Success from './components/success.js';
import Cancel from './components/cancel.js';
import ProductDetails from './components/ProductDetails.js';
import Login from './components/login.js';
import Register from './components/Register.js';
import Orders from './components/Orders.js';
import Profile from './components/Profile.js';
import Home from './components/Home.js';
import ProductList from './components/ProductList.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Bienvenido a la tienda de juguetes</p>
      </header>
      <Router>
      <Route path="/" component={Home} />
        <Route path="/" exact component={ProductList} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/payment" component={Payment} />
        <Route path="/success" component={Success} />
        <Route path="/cancel" component={Cancel} />
        <Route path="/products/:id" component={ProductDetails} />
        <Route path="/products" component={ProductList} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/orders" component={Orders} />
        <Route path="/profile" component={Profile} />
      </Router>
      <main>
      <ProductList />
      </main>
    </div>
  );
}

export default App;
