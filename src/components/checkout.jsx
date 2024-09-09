import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Payment from './payment.jsx';
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
    const [showPaymentForm, setShowPaymentForm] = useState(false);
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
            console.log("Total calculado:", totalPrice);
            setTotal(totalPrice);
        };
        calculateTotal();
    }, [cartItems]);

    const handleOrder = async () => {
        if (!name || !email || !address || cartItems.length === 0) {
            setErrorMessage('Please fill in all fields and ensure your cart is not empty.');
            return;
        }

        const invalidItems = cartItems.filter(item => !item.productId || !item.productId._id);
        if (invalidItems.length > 0) {
            setErrorMessage('Some products in your cart are invalid. Please try again.');
            console.error('Productos inválidos en el carrito:', invalidItems);
            return;
        }
        
        setLoading(true);

        const calculatedTotal = cartItems.reduce((acc, item) => acc + (item.productId.price * item.quantity), 0);
        
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
                total: calculatedTotal
            };

            await axios.post('http://localhost:8081/api/orders', order);
            setShowPaymentForm(true); // Mostrar el formulario de pago
            setErrorMessage('');
            setOrderSuccess(true);
        } catch (error) {
            console.error('Order placement failed:', error);
            setErrorMessage('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentSuccess = () => {
        clearCart(); // Limpiar el carrito solo después del pago exitoso
        setOrderSuccess(true); // Actualiza el estado para mostrar el mensaje
        setShowPaymentForm(false); // Ocultar el formulario de pago
    };

    if (showPaymentForm) {
        console.log("Total enviado a Payment:", total);
        return <Payment total={total} name={name} address={address} onPaymentSuccess={handlePaymentSuccess} />;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">Checkout</h1>
            {orderSuccess ? (
                <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded">
                    <h2 className="text-xl">Gracias por elegirnos!</h2>
                    <p>Su orden estara lista en 24 horas.</p>
                    <button onClick={() => navigate('/')} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                        Volver
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
                        <label>Datos para el envio</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className="border p-2 w-full"
                        />
                    </div>
                    <div>
                        <label>Medio de Pago</label>
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
                        {loading ? 'Placing Order...' : 'Ya casi es tuyo, completar pago'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default Checkout;
