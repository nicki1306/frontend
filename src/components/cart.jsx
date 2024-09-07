import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, addToCart, removeFromCart, setCartItems } = useContext(CartContext);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    // Calcular el total de la compra
    useEffect(() => {
        const totalPrice = cartItems.reduce((acc, item) => {
            if (item.productId && item.productId.price) {
                return acc + (item.productId.price * item.quantity);
            }
            return acc;
        }, 0);
        setTotal(totalPrice);
    }, [cartItems]);

    // Manejar el aumento de cantidad
    const handleIncrease = (productId) => {
        const product = cartItems.find(item => item.productId?._id === productId);
        if (product) {
            addToCart(product.productId, 1);
        }
    };

    // Manejar la reducción de cantidad
    const handleDecrease = (productId, quantity) => {
        const product = cartItems.find(item => item.productId?._id === productId);
        if (product) {
            if (quantity > 1) {
                addToCart(product.productId, -1);
            } else {
                removeFromCart(productId);
            }
        }
    };

    // Manejar la eliminación del producto del carrito
    const handleRemove = (productId) => {
        removeFromCart(productId);
    };

    // Mostrar un botón para depurar y borrar los productos inválidos
    const handleRemoveInvalidProducts = () => {
        const validProducts = cartItems.filter(item => item.productId && item.productId.toy_name && item.productId.price);
        setCartItems(validProducts);
        localStorage.setItem('cart', JSON.stringify(validProducts));
        console.log('Productos inválidos eliminados');
    };

    // Ir al checkout
    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Carrito de compras</h2>
            {cartItems.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (
                <div>
                    <ul className="space-y-4">
                        {cartItems.map(item => (
                            <li key={item.productId._id} className="flex justify-between items-center border-b py-4">
                                {/* Imagen del producto */}
                                <img 
                                    src={item.productId.image || 'https://via.placeholder.com/150'}  
                                    alt={item.productId.toy_name || 'Producto sin nombre'} 
                                    className="w-24 h-24 object-cover rounded" 
                                />
                                <div className="flex-1 ml-4">
                                    {/* Detalles del producto */}
                                    <h3 className="text-xl font-semibold">{item.productId.toy_name || 'Producto sin nombre'}</h3>
                                    <p className="text-gray-600">{item.productId.description || 'Descripción no disponible'}</p>
                                    <p className="text-lg font-bold">${item.productId.price || 0}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {/* Botones para sumar o restar cantidad */}
                                    <button
                                        className="bg-gray-300 px-2 py-1 rounded"
                                        onClick={() => handleDecrease(item.productId._id, item.quantity)}
                                    >
                                        -
                                    </button>
                                    <span className="text-lg">{item.quantity}</span>
                                    <button
                                        className="bg-gray-300 px-2 py-1 rounded"
                                        onClick={() => handleIncrease(item.productId._id)}
                                    >
                                        +
                                    </button>
                                </div>
                                <div>
                                    {/* Botón para eliminar el producto */}
                                    <button
                                        className="bg-red-500 text-white py-2 px-4 rounded ml-4"
                                        onClick={() => handleRemove(item.productId._id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Botón para eliminar productos inválidos */}
                    <button 
                        onClick={handleRemoveInvalidProducts}
                        className="bg-red-500 text-white py-2 px-4 rounded mt-4"
                    >
                        Eliminar productos inválidos
                    </button>

                    {/* Total de la compra */}
                    <div className="mt-4">
                        <h3 className="text-2xl font-bold">Total: ${total.toFixed(2)}</h3>
                        <button 
                            onClick={handleCheckout} 
                            className="bg-green-500 text-white py-2 px-4 rounded mt-4"
                        >
                            Ir a pagar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
