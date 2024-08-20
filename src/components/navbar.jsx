import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const Navbar = () => {
    const { authToken, logout } = useContext(AuthContext);

    return (
        <nav className="bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-teal-400">Toy Store</Link>
                        <div className="ml-10 flex items-baseline space-x-4">
                            <NavLink to="/home" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</NavLink>
                            <NavLink to="/products" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Products</NavLink>
                            <NavLink to="/cart" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Cart</NavLink>
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
