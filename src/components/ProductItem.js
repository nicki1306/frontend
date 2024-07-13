import React from 'react';

const ProductItem = ({ product }) => {
    return (
        <div className="bg-white p-4 rounded shadow-md">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded" />
            <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="text-green-500 font-bold">${product.price}</p>
            <p>Stock: {product.stock}</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
        </div>
    );
};

export default ProductItem;
