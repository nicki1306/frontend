import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Success = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {

            const decoded = jwt_decode(token);
            const userRole = decoded.role;

            localStorage.setItem('token', token);

            if (userRole === 'admin') {
                navigate('/admin');
            } else {
                navigate('/products');
            }
        } else {
            navigate('/login');
        }
    }, [navigate]);

    return <div>Loading...</div>;
};

export default Success;
