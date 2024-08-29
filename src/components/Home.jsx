import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/products', {
                    withCredentials: true
                });
                console.log(response.data);
                if (Array.isArray(response.data)) {
                    setProducts(response.data);
                } else {
                    console.error('Expected an array but got:', response.data);
                    setProducts([]);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]);
            }
        };

        fetchProducts();
    }, []);

    console.log(products);

    return (
        <div>
            <header className="text-center py-4 bg-gray-200">
                <h1 className="text-2xl font-bold">Bienvenido a la tienda de juguetes</h1>
                <p>Explora nuestros productos</p>
            </header>
            <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.length > 0 ? (
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
                            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                Ver más
                            </button>
                        </div>
                    ))
                ) : (
                    <p>Cargando productos...</p>
                )}
            </div>
        </div>
    );
}

export default Home;
