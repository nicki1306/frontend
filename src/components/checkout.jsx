import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
    const { cartItems, clearCart } = useContext(CartContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('credit-card');
    const [errorMessage, setErrorMessage] = useState('');
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Calcular el total de la compra
    useEffect(() => {
        const calculateTotal = () => {
            const totalPrice = cartItems.reduce((acc, item) => {
                if (item.productId && item.productId.price) {
                    return acc + (item.productId.price * item.quantity);
                }
                return acc;
            }, 0);
            setTotal(totalPrice);
        };
        calculateTotal();
    }, [cartItems]);

    const handleOrder = async () => {
        if (!name || !email || !address || cartItems.length === 0) {
            setErrorMessage('Please fill in all fields and ensure your cart is not empty.');
            return;
        }

        setLoading(true);

        try {
            const order = {
                name,
                email,
                address,
                paymentMethod,
                items: cartItems.map(item => ({
                    productId: item.productId._id,
                    quantity: item.quantity
                })),
                total
            };

            await axios.post('http://localhost:8081/api/orders', order);
            clearCart();
            setOrderSuccess(true);
            setName('');
            setEmail('');
            setAddress('');
            setPaymentMethod('credit-card');
            setErrorMessage('');
        } catch (error) {
            console.error('Order placement failed:', error);
            setErrorMessage('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">Checkout</h1>
            {orderSuccess ? (
                <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded">
                    <h2 className="text-xl">Thank you for your order!</h2>
                    <p>Your order has been placed successfully.</p>
                    <button onClick={() => navigate('/')} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                        Go to Home
                    </button>
                </div>
            ) : (
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="border p-2 w-full"
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="border p-2 w-full"
                        />
                    </div>
                    <div>
                        <label>Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className="border p-2 w-full"
                        />
                    </div>
                    <div>
                        <label>Payment Method</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="border p-2 w-full"
                        >
                            <option value="credit-card">Credit Card</option>
                            <option value="paypal">PayPal</option>
                        </select>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-xl font-bold">Total: ${total.toFixed(2)}</h3>
                    </div>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    <button
                        type="button"
                        onClick={handleOrder}
                        disabled={loading}
                        className={`bg-blue-500 text-white py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Placing Order...' : 'Place Order'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default Checkout;
