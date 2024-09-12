import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { CartContext } from '../context/CartContext.jsx';
import { Menu, Search as SearchIcon } from '@mui/icons-material';
import Swal from 'sweetalert2';

const Navbar = () => {
    const { cartItems } = useContext(CartContext);
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false); // Menú cerrado al iniciar
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const handleToggleMenu = () => {
        setIsOpen(!isOpen); // Cambia el estado de isOpen al hacer clic en el botón
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${searchTerm}`);
        }
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${product.toy_name} ha sido añadido al carrito`,
            showConfirmButton: false,
            timer: 1500
        });
    };

    const handleLogout = () => {
        logout();
        setIsOpen(false); // Cierra el menú al cerrar sesión
        navigate('/');
    };

    const handleMenuOption = (path) => {
        setIsOpen(false); // Cierra el menú al seleccionar una opción
        navigate(path);
    };

    return (
        <nav className="bg-gray-800 text-white">
            <div className="container mx-auto flex justify-between items-center h-16">
                <div className="flex items-center space-x-4">
                    {/* Logo a la izquierda */}
                    <Link to="/" className="text-2xl font-bold text-teal-400">Toy Store</Link>

                    {/* Enlace a Productos */}
                    <NavLink to="/products" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                        Products
                    </NavLink>

                    {/* Carrito con Notificación */}
                    <NavLink to="/cart" className="relative hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                        Cart
                        {totalItems > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-sm">
                                {totalItems}
                            </span>
                        )}
                    </NavLink>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search products"
                            className="rounded-full py-2 px-4 w-64 text-gray-700"
                        />
                        <button type="submit" className="absolute right-2 top-1">
                            <SearchIcon style={{ color: 'teal' }} />
                        </button>
                    </form>
                </div>

                <div className="flex items-center space-x-4">
                    {/* Register and Login a la derecha */}
                    {!user && (
                        <>
                            <NavLink to="/login" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                                Login
                            </NavLink>
                            <NavLink to="/register" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                                Register
                            </NavLink>
                        </>
                    )}

                    {/* Menú Hamburger para usuarios autenticados */}
                    {user && (
                        <>
                            <button
                                onClick={handleToggleMenu}
                                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                            >
                                <Menu />
                            </button>
                            {/* Menú hamburguesa desplazándose desde la derecha */}
                            <div
                                className={`fixed top-0 right-0 h-full bg-black text-white w-64 z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}
                            >
                                <div className="p-4">
                                    {/* Saludo al usuario */}
                                    <h2 className="text-3xl font-bold text-teal-400 mb-6">Hola, {user.name}!</h2>
                                    <ul className="space-y-4">
                                        <li>
                                            <button
                                                onClick={() => handleMenuOption('/profile')}
                                                className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md"
                                            >
                                                Mi Perfil
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => handleMenuOption('/my-orders')}
                                                className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md"
                                            >
                                                Mis Compras
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => handleMenuOption('/business')}
                                                className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md"
                                            >
                                                Abrir mi Negocio
                                            </button>
                                        </li>

                                        {user.role === 'admin' && (
                                            <>
                                                <li>
                                                    <button
                                                        onClick={() => handleMenuOption('/admin/sales')}
                                                        className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md"
                                                    >
                                                        Mis Ventas
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        onClick={() => handleMenuOption('/admin/control-panel')}
                                                        className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md"
                                                    >
                                                        Control Panel
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        onClick={() => handleMenuOption('/admin/claims')}
                                                        className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md"
                                                    >
                                                        Reclamos y Devoluciones
                                                    </button>
                                                </li>
                                            </>
                                        )}
                                        <li>
                                            <button
                                                onClick={() => handleMenuOption('/billing')}
                                                className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md"
                                            >
                                                Facturación
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 hover:bg-red-700 rounded-md text-red-500"
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
