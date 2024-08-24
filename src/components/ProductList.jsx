import React, { useContext, useEffect, useState } from 'react';
import axios from '../axios';
import { CartContext } from '../context/CartContext';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/products', {
                    withCredentials: true
                });
                if (Array.isArray(response.data)) {
                    console.log(response.data);
                    setProducts(response.data);
                } else {
                    console.error('Expected an array but got:', response.data);
                    setError('Unexpected response format');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Error fetching products');
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Products</h2>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <ul>
                    {products.length > 0 ? (
                        products.map(product => (
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
                        ))
                    ) : (
                        <p>No products available.</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default ProductList;
