import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                setError(error.response?.data?.message || 'Error fetching product details');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product._id, 1); 
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!product) {
        return <p>Product not found</p>;
    }

    return (
        <div className="product-details bg-white p-4 rounded shadow-md">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <img 
                src={product.imageUrl} 
                alt={`Image of ${product.name}`} 
                className="w-full h-48 object-cover rounded mt-4" 
            />
            <p className="mt-2">{product.description}</p>
            <p className="text-green-500 font-bold mt-2">Price: ${product.price}</p>
            <button 
                onClick={handleAddToCart} 
                className={`mt-4 px-4 py-2 rounded ${product.stock > 0 ? 'bg-blue-500 text-white' : 'bg-gray-500 text-gray-300'}`} 
                disabled={product.stock <= 0}
            >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
        </div>
    );
};

export default ProductDetails;

