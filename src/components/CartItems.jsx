import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartItems = () => {
    const { cartItems, removeFromCart, addToCart } = useContext(CartContext);

    if (cartItems.length === 0) {
        return <p>Tu carrito está vacío.</p>;
    }

    const handleIncrease = (productId) => {
        const product = cartItems.find(item => item.productId._id === productId);
    if (product) {
        addToCart(product.productId, 1);
    }
    };

    const handleDecrease = (productId, quantity) => {
        const product = cartItems.find(item => item.productId._id === productId);
    if (product) {
        if (quantity > 1) {
            addToCart(product.productId, -1);
        } else {
            removeFromCart(productId);
        }
    }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Carrito de Compras</h2>
            <ul className="space-y-4">
                {cartItems.map((item) => (
                    item.productId ? (
                        <li key={item.productId._id} className="border rounded-lg shadow-lg p-4 flex items-center justify-between">
                            <div>
                                <Link to={`/products/${item.productId._id}`}>
                                    <h3 className="text-xl font-semibold">{item.productId.toy_name || 'Producto sin nombre'}</h3>
                                </Link>
                                <p className="text-gray-600 mb-2">Precio: ${item.productId.price ? item.productId.price.toFixed(2) : 'N/A'}</p>
                                <p className="text-gray-600 mb-2">Cantidad: {item.quantity}</p>
                            </div>
                            <div className="flex items-center">
                                {/* Botones para ajustar la cantidad */}
                                <button 
                                    className="bg-gray-300 px-2 py-1 rounded" 
                                    onClick={() => handleDecrease(item.productId._id, item.quantity)}
                                >
                                    -
                                </button>
                                <span className="mx-2">{item.quantity}</span>
                                <button 
                                    className="bg-gray-300 px-2 py-1 rounded" 
                                    onClick={() => handleIncrease(item.productId._id)}
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.productId._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Eliminar
                            </button>
                        </li>
                    ) : (
                        <li key={item._id} className="text-red-500">Producto no disponible</li>
                    )
                ))}
            </ul>
        </div>
    );
};

export default CartItems;
