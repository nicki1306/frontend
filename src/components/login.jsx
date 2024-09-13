import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AccountCircle } from '@mui/icons-material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth(); 
    const navigate = useNavigate();
    const location = useLocation();

    const syncCartWithBackend = async (userId, token) => {
        const localCart = JSON.parse(localStorage.getItem('cart'));
        if (localCart && localCart.length > 0) {
            try {
                await axios.post(`http://localhost:8081/api/cart/sync`, { userId, products: localCart }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                localStorage.removeItem('cart');
            } catch (error) {
                console.error('Error syncing cart:', error);
            }
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault(); 
        try {
            const response = await axios.post('http://localhost:8081/api/user/login', { email, password });
            const { user, token } = response.data;
            login(user, token);
    
            await syncCartWithBackend(user._id);
    
            const from = location.state?.from?.pathname || '/checkout';
            if (from) {
                navigate(from);
            } else {

                if (user.role === 'admin') {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/user-dashboard');
                }
            }
        } catch (error) {
            setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
            console.error('Error al iniciar sesión:', error);
        }
    };
    

    const handleOAuth = (provider) => {
        window.location.href = `http://localhost:8081/api/auth/${provider}`;
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <div className="flex justify-center mb-4">
                    <AccountCircle style={{ fontSize: 80, color: 'gray' }} />
                </div>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition duration-150 ease-in-out"
                    >
                        Login
                    </button>
                </form>
                <div className="flex flex-col space-y-4 mt-6">
                    <button
                        onClick={() => handleOAuth('google')}
                        className="flex items-center justify-center w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700 transition duration-150 ease-in-out"
                    >
                        {/* Icono de Google */}
                        Login with Google
                    </button>
                    <button
                        onClick={() => handleOAuth('github')}
                        className="flex items-center justify-center w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:bg-gray-900 transition duration-150 ease-in-out"
                    >
                        {/* Icono de GitHub */}
                        Login with GitHub
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
