import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            const userId = localStorage.getItem('userId');
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:8081/api/cart/${userId}`);
                    setCartItems(response.data.products);
                } catch (error) {
                    console.error('Error fetching cart:', error);
                }
            } else {
                const localCart = JSON.parse(localStorage.getItem('cart')) || [];
                setCartItems(localCart);
            }
        };

        fetchCart();
    }, []);

    // Aquí estamos recibiendo solo productId y quantity, no product como objeto completo
    const addToCart = async (productId, quantity) => {
        console.log('Producto recibido en addToCart:', productId);
    
        const userId = localStorage.getItem('userId');
        try {
            if (userId) {
                const response = await axios.post(`http://localhost:8081/api/cart/${userId}`, { productId, quantity });
                setCartItems(response.data.products);
            } else {
                const updatedCart = [...cartItems];
                const productIndex = updatedCart.findIndex(item => item.productId === productId);
    
                if (productIndex >= 0) {
                    updatedCart[productIndex].quantity += quantity;
                } else {
                    updatedCart.push({ productId, quantity });
                }
    
                setCartItems(updatedCart);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            }
            return true;
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
            return false;
        }
    };
    

    const removeFromCart = async (productId) => {
        const userId = localStorage.getItem('userId');
        try {
            if (userId) {
                const response = await axios.delete(`http://localhost:8081/api/cart/${userId}/${productId}`);
                setCartItems(response.data.products);
            } else {
                const updatedCart = cartItems.filter(item => item.productId !== productId);
                setCartItems(updatedCart);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            }
        } catch (error) {
            console.error('Error al eliminar el producto del carrito:', error);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
