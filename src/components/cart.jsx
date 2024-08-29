import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
    const { cart, addToCart, removeFromCart } = useContext(CartContext);

    const handleAddToCart = (productId) => {
        addToCart(productId, 1);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cart.map(item => (
                        <li key={item.productId._id} className="mb-4">
                            <h3 className="text-xl">{item.productId.name}</h3>
                            <p>Quantity: {item.quantity}</p>
                            <button 
                                onClick={() => removeFromCart(item.productId._id)}
                                className="bg-red-500 text-white py-1 px-2 rounded"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <button
                onClick={handleAddToCart}
                className="bg-blue-500 text-white py-2 px-4 rounded"
            >
                Checkout
            </button>
        </div>
    );
};

export default Cart;
