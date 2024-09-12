import React, { useContext, useEffect, useState } from 'react';
import axios from '../axios'; 
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
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
                    setProducts(response.data);
                    console.log("Productos obtenidos:", response.data)
                } else {
                    console.error('Expected an array but got:', response.data);
                    setError('Formato inesperado en la respuesta');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Error al obtener los productos');
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = async (product, quantity) => {
        console.log('producto seleccionado:', product);
        console.log('Producto a agregar en handleAddToCart:', product._id); 
        if (!product || !product._id) {
            console.error('Faltan datos del producto', product);
            return;
        }

        const success = await addToCart(product, quantity);  
        if (success) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto agregado al carrito',
                showConfirmButton: false,
                timer: 1500,
                background: '#ffe4e6',  
                color: '#000',
                customClass: {
                    popup: 'swal2-small-popup' 
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo agregar el producto al carrito'
            });
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Productos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="mb-4 bg-white rounded-lg shadow-md p-4">
                            <img
                                src={product.image || 'https://via.placeholder.com/150'}
                                alt={product.toy_name}
                                className="w-full h-48 object-cover mb-4 rounded"
                            />
                            <h3 className="text-xl font-semibold mb-2">{product.toy_name}</h3>
                            <p className="text-gray-700 mb-2">Precio: ${product.price}</p>
                            <p className="text-gray-700 mb-2">Stock: {product.stock}</p>
                            <p className="text-gray-600 mb-4">{product.description}</p>
                            <button
                                onClick={() => {
                                    console.log("Producto seleccionado:", product);
                                    handleAddToCart(product, 1)} 
                                }
                                    
                                className="bg-blue-500 text-white py-1 px-2 rounded w-full"
                            >
                                Agregar al carrito
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No hay productos disponibles</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;
