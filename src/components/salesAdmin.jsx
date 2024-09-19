import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2'; 
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesAdmin = () => {
    const [salesData, setSalesData] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchSalesData = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/orders');

                const data = response.data?.data || [];  
                setSalesData(data);
                setLoading(false);
            } catch (err) {
                setError('Error al obtener los datos de ventas.');
                setLoading(false);
            }
        };

        fetchSalesData();
    }, []);

    // Configuración de los datos del gráfico
    const salesChartData = {
        labels: salesData.map(order => new Date(order.createdAt).toLocaleDateString()),  
        datasets: [
            {
                label: 'Ventas Totales ($)',
                data: salesData.map(order => order.total), 
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Opciones de configuración del gráfico
    const salesChartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    if (loading) {
        return <p>Cargando datos...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container mx-auto my-4">
            <h1 className="text-2xl font-bold mb-4">Panel de Ventas del Administrador</h1>

            {/* Gráfico de barras de ventas */}
            <div className="bg-white p-4 shadow rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Estadísticas de Ventas</h2>
                <Bar data={salesChartData} options={salesChartOptions} />
            </div>

            {/* Resumen de ventas */}
            <div className="mt-8 bg-white p-4 shadow rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Resumen de Ventas</h2>
                <table className="min-w-full bg-gray-100">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Fecha</th>
                            <th className="px-4 py-2">Cliente</th>
                            <th className="px-4 py-2">Productos</th>
                            <th className="px-4 py-2">Total ($)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesData.length > 0 ? (
                            salesData.map((order) => (
                                <tr key={order._id}>
                                    <td className="border px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="border px-4 py-2">{order.user?.name || 'Cliente Anónimo'}</td>  {/* Ajusta si `order.user` no existe */}
                                    <td className="border px-4 py-2">
                                        {order.items.map((item) => (
                                            <p key={item.productId}>
                                                {item.quantity} x {item.productName || item.productId} {/* Usa `productName` si existe */}
                                            </p>
                                        ))}
                                    </td>
                                    <td className="border px-4 py-2">${order.total.toFixed(2)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">No hay ventas disponibles.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalesAdmin;
