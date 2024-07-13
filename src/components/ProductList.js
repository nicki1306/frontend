import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from './ProductItem.js';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('http://localhost:8080/api/products');
            setProducts(response.data);
        };

        fetchProducts();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map(product => (
                <ProductItem key={product._id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
