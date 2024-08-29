import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ product, addToCart }) => {
    return (
        <div className="bg-white p-4 rounded shadow-md">
            <img 
                src={product.imageUrl} 
                alt={`Image of ${product.name}`} 
                className="w-full h-48 object-cover rounded" 
            />
            <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="text-green-500 font-bold">${product.price}</p>
            <p>Stock: {product.stock}</p>
            <button 
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" 
                onClick={() => addToCart(product)}
                aria-label={`Add ${product.name} to cart`}
            >
                Add to Cart
            </button>
            <Link 
                to={`/products/${product._id}`} 
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded inline-block text-center"
                aria-label={`Detalle del producto ${product.name}`}
                >
                Ver Más
            </Link>
        </div>
    );
};

export default ProductItem;

