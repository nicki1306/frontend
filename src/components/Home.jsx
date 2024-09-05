import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/products/category/destacados', {
                    withCredentials: true
                });
                console.log(response.data);
                if (Array.isArray(response.data)) {
                    const featuredProducts = response.data.filter(product => product.category === 'destacados');
                    setProducts(featuredProducts);
                    setError(null);
                } else {
                    console.error('Expected an array but got:', response.data);
                    setProducts([]);
                    setError('Error: La respuesta de la API no es un array');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]);
                setError('Error al obtener los productos');
            }
        };

        fetchProducts();
    }, []);

    console.log(products);

    const handleViewMore = (id) => {
        navigate(`/products/${id}`);
    };

    return (
        <div>
            <header className="text-center py-4 bg-gray-200">
                <h1 className="text-2xl font-bold">Bienvenido a la tienda de juguetes</h1>
                <p>Explora nuestros productos</p>
            </header>
            <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    products.length > 0 ? (
                        products.map((product) => (
                            <div key={product._id} className="border rounded-lg shadow-lg p-4">
                                <img
                                    src={product.imageUrl} 
                                    alt={product.toy_name} 
                                    className="w-full h-48 object-cover mb-4 rounded"
                                />
                                <h2 className="text-xl font-semibold mb-2">{product.toy_name}</h2>
                                <p className="text-gray-600 mb-2">{product.description}</p>
                                <p className="text-lg font-bold">${product.price}</p>
                                <button 
                                    onClick={() => handleViewMore(product._id)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                    Ver más
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Cargando productos...</p>
                    )
                )}
            </div>
        </div>
    );
}

export default Home;
