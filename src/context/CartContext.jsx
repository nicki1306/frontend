import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext); 
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            const userId = localStorage.getItem('userId');
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:8081/api/cart/${userId}`);
                    const validProducts = response.data.products.filter(item => item.productId && item.productId.toy_name && item.productId.price);
                    const invalidProducts = response.data.products.filter(item => !item.productId || !item.productId.toy_name || !item.productId.price);
                    if (invalidProducts.length > 0) {
                        console.warn("Productos inválidos en el carrito:", invalidProducts);
                    }
                    setCartItems(validProducts); 
                } catch (error) {
                    console.error('Error fetching cart:', error);
                }
            } else {
                const localCart = JSON.parse(localStorage.getItem('cart')) || [];
                const validProducts = localCart.filter(item => item.productId && item.productId.toy_name && item.productId.price);
                const invalidProducts = localCart.filter(item => !item.productId || !item.productId.toy_name || !item.productId.price);
                if (invalidProducts.length > 0) {
                    console.warn("Productos inválidos en el carrito:", invalidProducts);
                }
                setCartItems(validProducts); 
                localStorage.setItem('cart', JSON.stringify(validProducts)); 
            }
        };
    
        fetchCart();
    }, []);
    
    const addToCart = async (product, quantity) => {
        console.log('Producto recibido en addToCart:', product);
        const userId = localStorage.getItem('userId');
        try {
            if (userId) {
                const response = await axios.post(`http://localhost:8081/api/cart/${userId}`, { productId: product._id, quantity });
                setCartItems(response.data.products);
            } else {
                const updatedCart = [...cartItems];
                const productIndex = updatedCart.findIndex(item => item.productId._id === product._id);
    
                if (productIndex >= 0) {
                    updatedCart[productIndex].quantity += quantity;
                } else {
                    updatedCart.push({
                        productId: product,
                        quantity,
                    });
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
                const updatedCart = cartItems.filter(item => item.productId._id !== productId);
                setCartItems(updatedCart);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            }
        } catch (error) {
            console.error('Error al eliminar el producto del carrito:', error);
        }
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
