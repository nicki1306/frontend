import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Success = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            // Decodificar el token JWT para obtener el rol
            const decoded = jwt_decode(token);
            const userRole = decoded.role;

            // Guardar el token en localStorage o en un contexto global
            localStorage.setItem('token', token);

            // Redirigir según el rol del usuario
            if (userRole === 'admin') {
                navigate('/admin');
            } else {
                navigate('/products');
            }
        } else {
            // Si no hay token, redirigir al login
            navigate('/login');
        }
    }, [navigate]);

    return <div>Loading...</div>;
};

export default Success;
