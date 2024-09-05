import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
    const { user, logout } = useAuth(); 
    const authToken = localStorage.getItem('token'); 

    return (
        <nav className="bg-gray-800 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-teal-400">Toy Store</Link>
                        <div className="ml-10 flex items-baseline space-x-4">
                            {/* Opciones del admin solo visibles si el usuario es admin */}
                            {user && user.role === 'admin' && (
                                <>
                                    <NavLink to="/admin" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Panel Administrador</NavLink>
                                    <Link to="/admin/products" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Cargar Producto</Link>
                                    <Link to="/admin/users" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Eliminar Usuarios</Link>
                                    <Link to="/admin/billing" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Panel de Facturación</Link>
                                    <Link to="/admin/orders" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Panel de Pedidos</Link>
                                </>
                            )}
                            {/* Opciones comunes para todos los usuarios */}
                            <NavLink to="/" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</NavLink>
                            <NavLink to="/products" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Products</NavLink>
                            <NavLink to="/cart" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Cart</NavLink>
                            {/* Si está autenticado, muestra opciones adicionales */}
                            {authToken ? (
                                <>
                                    <NavLink to="/checkout" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Checkout</NavLink>
                                    <NavLink to="/payment" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Payment</NavLink>
                                    <button onClick={logout} className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                                </>
                            ) : (
                                <>
                                    <NavLink to="/login" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Login</NavLink>
                                    <NavLink to="/register" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Register</NavLink>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
