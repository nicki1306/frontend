import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('http://localhost:8080/');
            console.log(response);
            setProducts(response.data);
            try {
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Products</h2>
            <ul>
                {products.map(product => (
                    <li key={product._id} className="mb-4">
                        <h3 className="text-xl">{product.name}</h3>
                        <p>{product.description}</p>
                        <button
                            onClick={() => addToCart(product._id, 1)}
                            className="bg-blue-500 text-white py-1 px-2 rounded"
                        >
                            Add to Cart
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;

