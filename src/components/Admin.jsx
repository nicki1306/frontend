import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link to="/admin/products" className="bg-blue-500 text-white p-6 rounded-lg hover:bg-blue-700">
                    Cargar Producto
                </Link>
                <Link to="/admin/users" className="bg-red-500 text-white p-6 rounded-lg hover:bg-red-700">
                    Eliminar Usuarios
                </Link>
                <Link to="/admin/billing" className="bg-green-500 text-white p-6 rounded-lg hover:bg-green-700">
                    Panel de Facturación
                </Link>
                <Link to="/admin/orders" className="bg-yellow-500 text-white p-6 rounded-lg hover:bg-yellow-700">
                    Panel de Pedidos
                </Link>
            </div>
        </div>
    );
};

export default AdminPage;
