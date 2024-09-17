import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const checkTokenExpiration = (authToken) => {
        return !!authToken;
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        
        if (storedUser && storedToken) {
            if (checkTokenExpiration(storedToken)) {
                setUser(JSON.parse(storedUser));
                setToken(storedToken); 
            } else {
                logout();
            }
        }
    }, []);

    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken); 
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', authToken); 
    };

    const logout = () => {
        setUser(null);
        setToken(null); 
        localStorage.removeItem('user');
        localStorage.removeItem('token'); 
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (token && !checkTokenExpiration(token)) {
                logout(); 
                alert("Tu sesión ha expirado. Por favor, inicia sesión de nuevo.");
            }
        }, 60000); 

        return () => clearInterval(interval);
    }, [token]);

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
