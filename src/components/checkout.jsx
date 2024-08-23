
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import axios from 'axios';

const Checkout = () => {
    const { cart, clearCart } = useContext(CartContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('credit-card');
    const [errorMessage, setErrorMessage] = useState('');

    const handleOrder = async () => {
        try {
            const order = {
                name,
                email,
                address,
                paymentMethod,
                items: cart,
            };
            await axios.post('http://localhost:8081/api/orders', order);
            clearCart();
            alert('Order placed successfully!');
        } catch (error) {
            setErrorMessage('Failed to place order. Please try again.');
        }
    };

    return (
        <div>
            <h1>Checkout</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Address</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Payment Method</label>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="credit-card">Credit Card</option>
                        <option value="paypal">PayPal</option>
                    </select>
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <button type="button" onClick={handleOrder}>Place Order</button>
            </form>
        </div>
    );
};

export default Checkout;

