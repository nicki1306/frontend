import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/api/auth/login', { email, password });
            console.log('Login successfully', response.data.token);
            // Guarda el token en el almacenamiento local o en el estado de la aplicación
        } catch (error) {
            console.error('Error during login:');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Login</button>
            </form>
        </div>
    );
};

export default Login;
