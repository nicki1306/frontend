import React from 'react';
import ProductList from './ProductList.jsx';


const ProductItem = ({ products }) => {
    return (
        <div className="bg-white p-4 rounded shadow-md">
            <img src={products.imageUrl} alt={products.name} className="w-full h-48 object-cover rounded" />
            <h2 className="mt-2 text-lg font-semibold">{products.name}</h2>
            <p>{products.description}</p>
            <p className="text-green-500 font-bold">${products.price}</p>
            <p>Stock: {products.stock}</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
        </div>
    );
};

export default ProductItem;
