import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import Navbar from "./components/navbar.jsx";
import AdminPage from "./components/Admin.jsx";
import Cart from "./components/cart.jsx";
import CartItems from "./components/CartItems.jsx";
import Checkout from "./components/checkout.jsx";
import Payment from "./components/payment.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import Login from "./components/login.jsx";
import Register from "./components/Register.jsx";
import ProductList from "./components/ProductList.jsx";
import Home from "./components/Home.jsx";
import SearchResults from "./components/search.jsx";
import UserProfile from "./components/profile.jsx";
import MyOrders from "./components/Orders.jsx";
import BusinessPage from "./components/business.jsx";
import SalesAdmin from "./components/salesAdmin.jsx";
import ControlPanel from "./components/Control-Panel.jsx";
import Ticket from "./components/ticket.jsx";

function App() {
  return (
    <Router> 
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <header className="app-header min-h-60">
            <p>Bienvenido a la tienda de juguetes</p>
          </header>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/cartItems" element={<CartItems />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/ticket" element={<Ticket />} />
              <Route path="/business" element={<BusinessPage />} />
              <Route path="/admin/sales" element={<SalesAdmin />} />
              <Route path="/admin/control-panel" element={<ControlPanel />} />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
