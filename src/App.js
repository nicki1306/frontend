// frontend/src/App.js
import React from 'react';
import './App.css';
import ProductList from './components/ProductList.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Bienvenido a la tienda de juguetes</p>
      </header>
      <Router>
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
        <Route path="/order/:id" component={OrderDetails} />
        <Route path="/search" component={Search} />
        <Route path="/admin" component={Admin} />
        <Route path="/admin/products" component={AdminProducts} />
        <Route path="/admin/orders" component={AdminOrders} />
        <Route path="/admin/users" component={AdminUsers} />
        <Route path="/admin/users/:id" component={AdminUserDetails} />
        <Route path="/admin/products/:id" component={AdminProductDetails} />
        <Route path="/admin/orders/:id" component={AdminOrderDetails} />
        <Route path="/admin/orders/:id/pay" component={PayOrder} />
        <Route path="/admin/orders/:id/ship" component={ShipOrder} />
        <Route path="/admin/orders/:id/return" component={ReturnOrder} />
        <Route path="/admin/orders/:id/cancel" component={CancelOrder} />
        <Route path="/admin/users/:id/edit" component={EditUser} />
        <Route path="/admin/products/:id/edit" component={EditProduct} />
        <Route path="/admin/orders/:id/edit" component={EditOrder} />
        <Route path="/admin/users/:id/edit/password" component={EditPassword} />
        <Route path="/admin/products/:id/edit/stock" component={EditStock} />
        <Route path="/admin/products/:id/edit/price" component={EditPrice} />
        <Route path="/admin/products/:id/edit/name" component={EditName} />
        <Route path="/admin/products/:id/edit/description" component={EditDescription} />
        <Route path="/admin/products/:id/edit/category" component={EditCategory} />
        <Route path="/admin/products/:id/edit/brand" component={EditBrand} />
      </Router>
      <main>
      <ProductList />
      </main>
    </div>
  );
}

export default App;
