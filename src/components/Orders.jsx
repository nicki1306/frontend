import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const { token } = useAuth(); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/orders/user-orders', {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                });
                setOrders(response.data);
            } catch (error) {
                console.error('Error al obtener las órdenes:', error);
                setError('No se pudieron obtener las órdenes. Verifica tus permisos.');
            }
        };

        fetchOrders();
    }, [token]);

    const handleViewTicket = (order) => {
        console.log(order);
        navigate('/ticket', { state: { order } });
    };


    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Mis Compras</h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {orders.length > 0 ? (
                <ul className="space-y-4">
                    {orders.map((order) => (
                        <li
                            key={order._id}
                            className="bg-white shadow-md p-6 rounded-lg flex justify-between items-center"
                        >
                            <div className="flex flex-col">
                                <span className="font-bold text-lg">Orden #{order._id}</span>
                                <span className="text-gray-600">Total: ${order.total.toFixed(2)}</span>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out"
                                    onClick={() => console.log(`Ver envío para la orden ${order._id}`)}
                                >
                                    Ver Envío
                                </button>
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out"
                                    onClick={() => handleViewTicket(order)}
                                >
                                    Ver Ticket de Compra
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-600">No tienes compras.</p>
            )}
        </div>
    );
};

export default MyOrders;