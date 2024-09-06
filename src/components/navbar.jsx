import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { CartContext } from '../context/CartContext.jsx';

const Navbar = () => {
    const { cartItems } = useContext(CartContext);
    const { user, logout } = useAuth(); 

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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
                                    <NavLink to="/admin/products" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Cargar Producto</NavLink>
                                    <NavLink to="/admin/users" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Eliminar Usuarios</NavLink>
                                    <NavLink to="/admin/billing" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Panel de Facturación</NavLink>
                                    <NavLink to="/admin/orders" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Panel de Pedidos</NavLink>
                                </>
                            )}
                            {/* Opciones comunes para todos los usuarios */}
                            <NavLink to="/" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</NavLink>
                            <NavLink to="/products" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Products</NavLink>
                            
                            {/* Carrito con notificación de cantidad */}
                            <NavLink to="/cart" className="relative hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                                Cart
                                {totalItems > 0 && (
                                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-sm">
                                        {totalItems}
                                    </span>
                                )}
                            </NavLink>
                            {/* Opciones según si el usuario está autenticado */}
                            {user ? (
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
