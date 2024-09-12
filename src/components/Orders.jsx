import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; 

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const { token } = useAuth(); 

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

    return (
        <div>
            <h1>Mis Compras</h1>
            {error && <p className="text-red-500">{error}</p>}
            {orders.length > 0 ? (
                <ul>
                    {orders.map(order => (
                        <li key={order._id}>
                            Orden #{order._id}: Total - ${order.total}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No tienes compras.</p>
            )}
        </div>
    );
};

export default MyOrders;
