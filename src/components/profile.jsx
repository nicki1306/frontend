import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Profile = () => {
    const [userData, setUserData] = useState({
        name: 'Nombre del Usuario',
        email: 'usuario@ejemplo.com',
        address: 'Dirección de ejemplo',
        password: '',
        newPassword: '',
        confirmPassword: '',
        profileImage: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUserData({ ...userData, profileImage: URL.createObjectURL(file) });
        }
    };

    const handleSaveChanges = () => {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Perfil actualizado con éxito',
            showConfirmButton: false,
            timer: 1500
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Mi Perfil</h2>
            <div className="flex flex-col md:flex-row md:space-x-8">
                {/* Sección Imagen de Perfil */}
                <div className="flex flex-col items-center space-y-4">
                    <img
                        src={userData.profileImage || "https://via.placeholder.com/150"}
                        alt="Perfil"
                        className="w-40 h-40 rounded-full object-cover shadow-lg"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="mt-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>

                {/* Sección Información del Perfil */}
                <div className="flex-1 space-y-6 mt-6 md:mt-0">
                    {/* Nombre */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold mb-2">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleInputChange}
                            className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>

                    {/* Correo Electrónico */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold mb-2">Correo Electrónico</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            disabled
                            className="p-3 border rounded-lg shadow-sm bg-gray-100 cursor-not-allowed focus:outline-none"
                        />
                    </div>

                    {/* Dirección */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold mb-2">Dirección</label>
                        <input
                            type="text"
                            name="address"
                            value={userData.address}
                            onChange={handleInputChange}
                            className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>

                    {/* Cambiar Contraseña */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-semibold mb-2">Nueva Contraseña</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={userData.newPassword}
                                onChange={handleInputChange}
                                className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-semibold mb-2">Confirmar Contraseña</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={userData.confirmPassword}
                                onChange={handleInputChange}
                                className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>
                    </div>

                    {/* Botón Guardar Cambios */}
                    <button
                        onClick={handleSaveChanges}
                        className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
