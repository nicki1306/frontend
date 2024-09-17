import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Payment from './payment.jsx';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
    const { cartItems, clearCart } = useContext(CartContext);
    const { token } = useAuth(); 
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
    const location = useLocation();

    useEffect(() => {
        if (!token) {
            navigate('/login', { state: { from: location } });
            setErrorMessage("No estás autenticado");
            return;
        }
    }, [token, navigate, location]);

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
        console.log('Datos capturados antes de enviar la orden:', {
            name,
            email,
            address,
            paymentMethod,
            cartItems,
            total,
        });

        if (!token) {
            setErrorMessage('No estás autenticado.');
            return;  
        }

        if (!name || !email || !address || cartItems.length === 0) {
            setErrorMessage('Por favor, completa todos los campos y verifica que tu carrito no esté vacío.');
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
            console.log('Datos de la orden antes de enviar:', order);
            console.log('Token que se envía en la solicitud:', token);

            await axios.post('http://localhost:8081/api/orders', order, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setShowPaymentForm(true);
            setErrorMessage('');
            setOrderSuccess(true);
        } catch (error) {
            console.error('Error al enviar la orden:', error);
            setErrorMessage('Falló la creación de la orden. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentSuccess = () => {
        clearCart();
        setOrderSuccess(true);
        setShowPaymentForm(false);
    };

    if (showPaymentForm) {
        return <Payment total={total} name={name} address={address} onPaymentSuccess={handlePaymentSuccess} />;
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Finalizar Compra</h1>
            {orderSuccess ? (
                <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded shadow-lg">
                    <h2 className="text-2xl font-bold">¡Gracias por elegirnos!</h2>
                    <p className="mt-2">Su orden estará lista en 24 horas.</p>
                    <button 
                        onClick={() => navigate('/')} 
                        className="mt-4 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out"
                    >
                        Volver al Inicio
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-lg font-medium mb-2">Nombre</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-teal-500"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium mb-2">Correo Electrónico</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-teal-500"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium mb-2">Dirección de Envío</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-teal-500"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium mb-2">Método de Pago</label>
                            <select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-teal-500"
                            >
                                <option value="credit-card">Tarjeta de Crédito</option>
                                <option value="paypal">PayPal</option>
                                <option value="mercado-pago">Mercado Pago</option>
                                <option value="transferencia">Transferencia Bancaria</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-2xl font-bold">Total: ${total.toFixed(2)}</h3>
                        </div>
                    </div>

                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Resumen de la Compra</h2>
                        <ul className="space-y-3">
                            {cartItems.map((item, index) => (
                                <li key={index} className="border-b pb-3">
                                    <img src={item.productId.image} alt={item.productId.toy_name} className="w-16 h-16 object-cover mb-2" />
                                    <h3 className="text-lg font-semibold">{item.productId.toy_name}</h3>
                                    <p>Cantidad: {item.quantity}</p>
                                    <p>Precio: ${item.productId.price.toFixed(2)}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    <button
                        type="button"
                        onClick={handleOrder}
                        disabled={loading}
                        className={`w-full bg-teal-500 text-white font-bold py-3 px-6 rounded-lg mt-6 transition duration-200 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-600'}`}
                    >
                        {loading ? 'Procesando Orden...' : 'Completar Pago'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Checkout;
