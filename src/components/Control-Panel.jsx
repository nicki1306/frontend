import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ControlPanel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/users');
                setUsers(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('Error al obtener los datos de los usuarios.');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleRoleUpdate = async (userId, newRole) => {
        try {
            await axios.put(`http://localhost:8081/api/users/${userId}`, { role: newRole });
            Swal.fire('Éxito', 'El rol del usuario ha sido actualizado.', 'success');
            setUsers(users.map(user => (user._id === userId ? { ...user, role: newRole } : user)));
        } catch (err) {
            Swal.fire('Error', 'No se pudo actualizar el rol del usuario.', 'error');
        }
    };

    const handleDeleteUser = async (userId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás revertir esto.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:8081/api/users/${userId}`);
                    setUsers(users.filter((user) => user._id !== userId));
                    Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
                } catch (err) {
                    Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
                }
            }
        });
    };

    if (loading) {
        return <p>Cargando datos...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container mx-auto my-4">
            <h1 className="text-2xl font-bold mb-4">Panel de Control del Administrador</h1>

            {/* Gestión de usuarios */}
            <div className="bg-white p-4 shadow rounded-lg mb-8">
                <h2 className="text-xl font-semibold mb-4">Gestión de Usuarios</h2>
                <table className="min-w-full bg-gray-100">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Nombre</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Rol</th>
                            <th className="px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className="border px-4 py-2">{user.name}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                                        className="p-2 border rounded"
                                    >
                                        <option value="user">Usuario</option>
                                        <option value="admin">Administrador</option>
                                        <option value="premium">Premium</option>
                                    </select>
                                </td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                                        onClick={() => handleDeleteUser(user._id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Facturación y gestión de envíos */}
            <div className="bg-white p-4 shadow rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Facturación y Gestión de Envíos</h2>
                <p>Aquí se puede integrar la lógica para gestionar la facturación y los envíos.</p>
                {/* Aquí podrías añadir funcionalidades como descargar facturas, gestionar envíos, etc. */}
            </div>
        </div>
    );
};

export default ControlPanel;
