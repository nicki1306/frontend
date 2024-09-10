import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const query = searchParams.get('query'); 

    useEffect(() => {
        if (query) {

            axios.get(`http://localhost:8081/api/products/search?query=${query}`)
                .then((response) => {
                    setProducts(response.data.products);
                })
                .catch((error) => {
                    console.error('Error fetching search results:', error);
                });
        }
    }, [query]);

    return (
        <div>
            <h1>Resultados de búsqueda para "{query}"</h1>
            {products.length > 0 ? (
                <ul>
                    {products.map((product) => (
                        <li key={product._id}>
                            {product.name} - ${product.price}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No se encontraron productos.</p>
            )}
        </div>
    );
};

export default SearchResults;
