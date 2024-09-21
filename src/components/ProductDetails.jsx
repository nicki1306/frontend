import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Swal from 'sweetalert2';
import { getBaseUrl } from '../Utils/deploy';

const ProductDetails = () => {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useContext(CartContext);

    const BaseUrl = getBaseUrl(); 

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/api/products/${id}`);
                console.log('Producto obtenido:', response.data);
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
            addToCart(product, 1); 

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${product.toy_name} ha sido añadido al carrito`,
                showConfirmButton: false,
                timer: 1500
            })

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
            <h1 className="text-2xl font-bold">{product.toy_name || 'Producto sin nombre'}</h1>
            <img 
                src={product.image || 'https://via.placeholder.com/150'} 
                alt={`Image of ${product.toy_name || 'Producto sin nombre'}`} 
                className="w-full h-48 object-cover rounded mt-4" 
            />
            <p className="mt-2">{product.description || 'Descripción no disponible'}</p>
            <p className="text-green-500 font-bold mt-2">Price: ${product.price || 0}</p>
            <button 
                onClick={handleAddToCart} 
                className="mt-4 px-4 py-2 rounded bg-blue-500 text-white"
            >
                Add to Cart
            </button>
        </div>
    );
    
};

export default ProductDetails;

