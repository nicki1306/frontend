import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            const userId = localStorage.getItem('userId'); // Suponiendo que guardaste el userId en el localStorage
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/cart/${userId}`);
                    setCart(response.data.products);
                } catch (error) {
                    console.error('Error fetching cart:', error);
                }
            }
        };

        fetchCart();
    }, []);

    const addToCart = async (productId, quantity) => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            try {
                const response = await axios.post(`http://localhost:8080/api/cart/${userId}`, { productId, quantity });
                setCart(response.data.products);
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        }
    };

    const removeFromCart = async (productId) => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            try {
                const response = await axios.delete(`http://localhost:8080/api/cart/${userId}/${productId}`);
                setCart(response.data.products);
            } catch (error) {
                console.error('Error removing from cart:', error);
            }
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
