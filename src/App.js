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
      <ProductList />
    </div>
  );
}

export default App;
