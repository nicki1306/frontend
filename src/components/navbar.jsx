import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { CartContext } from '../context/CartContext.jsx';
import { Menu, Search as SearchIcon } from '@mui/icons-material';  // Asegúrate de importar el ícono correctamente
import { IconButton, Menu as MuiMenu, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';

const Navbar = () => {
    const { cartItems, addToCart } = useContext(CartContext);
    const { user, logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
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

                    {/* Menú Hamburger */}
                    {user && (
                        <>
                            <IconButton onClick={handleMenuClick}>
                                <Menu className="text-white" />
                            </IconButton>
                            <MuiMenu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                slotProps={{
                                    paper: {
                                        style: {
                                            backgroundColor: 'black',
                                            color: 'white',
                                        }
                                    }
                                }}
                            >
                                <MenuItem onClick={handleMenuClose}>Open My Business</MenuItem>
                                <MenuItem onClick={handleMenuClose}>My Purchases</MenuItem>
                                {user.role === 'admin' && (
                                    <>
                                        <MenuItem onClick={handleMenuClose}>My Sales</MenuItem>
                                        <MenuItem onClick={handleMenuClose}>Control Panel</MenuItem>
                                    </>
                                )}
                                <MenuItem onClick={handleMenuClose}>Claims and Returns</MenuItem>
                                <MenuItem onClick={handleMenuClose}>Privacy Policy</MenuItem>
                                <MenuItem onClick={() => { logout(); handleMenuClose(); }}>Logout</MenuItem>
                            </MuiMenu>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
