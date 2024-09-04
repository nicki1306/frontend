import React, { useContext, useEffect, useState } from 'react';
import axios from '../axios';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/products', {
                    withCredentials: true
                });
                if (Array.isArray(response.data)) {
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

    const handleAddToCart = async (productId, quantity) => {
        try {
            await addToCart(productId, quantity);
            navigate('/cart');
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Productos</h2>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product._id} className="mb-4 bg-white rounded-lg shadow-md p-4">
                                <img src={product.image} alt={product.toy_name} className="w-full h-48 object-cover mb-4 rounded" />
                                <h3 className="text-xl font-semibold mb-2">{product.toy_name}</h3>
                                <p className="text-gray-700 mb-2">Precio: ${product.price}</p>
                                <p className="text-gray-700 mb-2">Stock: {product.stock}</p>
                                <p className="text-gray-600 mb-4">{product.description}</p>
                                <button
                                    onClick={() => handleAddToCart(product._id, 1)}
                                    className="bg-blue-500 text-white py-1 px-2 rounded w-full"
                                >
                                    Agregar al carrito
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No products available.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductList;
