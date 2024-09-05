import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            console.log({ email, password });
            const response = await axios.post('http://localhost:8081/api/auth/login', { email, password });
            const  {user, token } = response.data;

            login(user, token);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            console.log('Token almacenado:', token);
            
            if (user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/products');
            }

        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
        }
    };

    const handleOAuth = (provider) => {
        window.location.href = `http://localhost:8081/api/auth/${provider}`;
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
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
                        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M23.24 12.27c0-.89-.07-1.75-.2-2.59H12v5.1h6.68c-2.94 2.75-7.18 4.61-12.68 4.61-8.66 0-15.7-7.04-15.7-15.7s7.04-15.7 15.7-15.7c9.05 0 16.93 7.34 16.93 16.36 0 1.1-.11 2.2-.33 3.26l-.04.24-.01.02z" fill="#4285F4"/>
                            <path d="M12 4.87c-4.63 0-8.61 3.55-8.61 8.12s3.98 8.12 8.61 8.12c4.02 0 7.54-2.85 8.68-6.68H12V9.99H8.38c-.65 1.51-2.14 2.57-3.77 2.57-2.19 0-3.98-1.78-3.98-3.98s1.78-3.98 3.98-3.98c1.14 0 2.18.45 2.97 1.19l1.98-1.98c-1.12-1.08-2.58-1.73-4.24-1.73z" fill="#34A853"/>
                            <path d="M3.87 4.59c1.41-.42 2.95-.64 4.59-.64 2.53 0 4.98.79 7.02 2.11l-1.96 1.96c-1.41-.94-3.08-1.52-4.77-1.52-3.25 0-5.88 2.63-5.88 5.88 0 3.18 2.56 5.73 5.73 5.73 1.7 0 3.28-.68 4.48-1.8l1.95 1.95c-2.2 2.09-5.11 3.41-8.46 3.41-6.14 0-11.15-4.9-11.15-10.96 0-5.87 4.63-10.79 10.38-10.96z" fill="#FBBC05"/>
                            <path d="M12 4.87c-1.83 0-3.58.49-5.11 1.39l-2.03-2.03c2.64-1.58 5.76-2.74 9.18-2.74 5.37 0 10.07 3.39 11.7 8.02h-5.56c-1.26-2.55-4.31-4.64-8.18-4.64z" fill="#EA4335"/>
                        </svg>
                        Login with Google
                    </button>
                    <button
                        onClick={() => handleOAuth('github')}
                        className="flex items-center justify-center w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:bg-gray-900 transition duration-150 ease-in-out"
                    >
                        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2.5C6.485 2.5 2 6.985 2 12.5c0 4.975 3.203 9.188 7.595 10.64.556.102.765-.235.765-.523v-2.016c-3.123.678-3.77-1.237-3.77-1.237-.508-1.291-1.24-1.635-1.24-1.635-1.014-.693.077-.679.077-.679 1.122.08 1.715 1.145 1.715 1.145 1.086 1.862 2.854 1.326 3.548 1.016.107-.785.425-1.326.77-1.63-2.686-.31-5.504-1.365-5.504-6.077 0-1.344.482-2.445 1.272-3.307-.128-.31-.553-1.553.122-3.237 0 0 1.037-.332 3.398 1.281a11.897 11.897 0 0 1 3.103-.418c1.08.005 2.161.16 3.113.466 2.357-1.609 3.366-1.282 3.366-1.282.672 1.684.27 2.927.13 3.237.782.862 1.265 1.963 1.265 3.307 0 4.709-2.825 5.76-5.52 6.072.437.372.827 1.104.827 2.229v3.299c0 .294.208.628.771.522C20.797 21.687 24 17.474 24 12.5 24 6.985 19.515 2.5 14 2.5z"/>
                        </svg>
                        Login with GitHub
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
