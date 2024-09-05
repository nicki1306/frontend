import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const Cart = () => {
    const { cartItems, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();
    
    const handleCheckout = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/login');
            return;
        }
        try {
            console.log("Checkout process started");

            // Enviar la solicitud de checkout al backend
            const response = await axios.post(`http://localhost:8081/api/checkout/${userId}`, {
                products: cartItems
            });

            if (response.status === 200) {
                navigate('/checkout');
            } else {
                console.error("Checkout failed:", response.data);
            }
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Carrito</h2>
            {cartItems.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item._id} className="mb-4">
                            <h3 className="text-xl">{item.toy_name}</h3>
                            <p>Cantidad: {item.quantity}</p>
                            <button 
                                onClick={() => removeFromCart(item._id)}
                                className="bg-red-500 text-white py-1 px-2 rounded"
                            >
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {cartItems.length > 0 && (
                <button
                    onClick={handleCheckout}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Ir a pagar
                </button>
            )}
        </div>
    );
};

export default Cart;
