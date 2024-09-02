// src/components/CartItems.js
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartItems = () => {
    const { cartItems, removeFromCart } = useContext(CartContext);

    if (cartItems.length === 0) {
        return <p>Your cart is empty.</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Shopping Cart</h2>
            <ul className="space-y-4">
                {cartItems.map((item) => (
                    <li key={item._id} className="border rounded-lg shadow-lg p-4 flex items-center justify-between">
                        <div>
                            <Link to={`/products/${item._id}`}>
                                <h3 className="text-xl font-semibold">{item.toy_name}</h3>
                            </Link>
                            <p className="text-gray-600 mb-2">Price: ${item.price}</p>
                            <p className="text-gray-600 mb-2">Quantity: {item.quantity}</p>
                        </div>
                        <button
                            onClick={() => removeFromCart(item._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CartItems;
