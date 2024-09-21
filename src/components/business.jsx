import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getBaseUrl } from '../Utils/deploy';

const Business = () => {
    const [businesses, setBusinesses] = useState([]);
    const [newBusiness, setNewBusiness] = useState({ name: '', products: [{ name: '', price: 0, quantity: 1 }] });
    const [editingBusiness, setEditingBusiness] = useState(null);
    const [loading, setLoading] = useState(false);

    const BaseUrl = getBaseUrl();

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/api/business`);
                setBusinesses(response.data.data);
            } catch (err) {
                console.error('Error al obtener negocios:', err);
            }
        };
        fetchBusinesses();
    }, []);

    const handleAddBusiness = async (e) => {
        e.preventDefault();
        if (!newBusiness.name) return;

        setLoading(true);
        try {
            const response = await axios.post(`${BaseUrl}/api/business`, newBusiness);
            setBusinesses([...businesses, response.data.data]);
            setNewBusiness({ name: '', products: [{ name: '', price: 0, quantity: 1 }] });
            Swal.fire('¡Negocio creado!', 'El negocio se ha creado correctamente', 'success');
        } catch (err) {
            console.error('Error al agregar negocio:', err);
            Swal.fire('Error', 'Hubo un problema al crear el negocio', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateBusiness = async (id) => {
        const updatedBusiness = businesses.find(b => b._id === id);
        setLoading(true);
        try {
            await axios.put(`${BaseUrl}/api/business/${id}`, updatedBusiness);
            setEditingBusiness(null);
            Swal.fire('¡Negocio actualizado!', 'El negocio se ha actualizado correctamente', 'success');
        } catch (err) {
            console.error('Error al actualizar negocio:', err);
            Swal.fire('Error', 'Hubo un problema al actualizar el negocio', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteBusiness = async (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${BaseUrl}/api/business/${id}`);
                    setBusinesses(businesses.filter(b => b._id !== id));
                    Swal.fire('Eliminado', 'El negocio ha sido eliminado', 'success');
                } catch (err) {
                    console.error('Error al eliminar negocio:', err);
                    Swal.fire('Error', 'Hubo un problema al eliminar el negocio', 'error');
                }
            }
        });
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Gestión de Negocios</h1>

            {/* Formulario para agregar nuevo negocio */}
            <form onSubmit={handleAddBusiness} className="mb-6">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Nombre del Negocio</label>
                    <input
                        type="text"
                        value={newBusiness.name}
                        onChange={(e) => setNewBusiness({ ...newBusiness, name: e.target.value })}
                        className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                        placeholder="Nombre del negocio"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition duration-150 ease-in-out"
                    disabled={loading}
                >
                    {loading ? 'Guardando...' : 'Agregar Negocio'}
                </button>
            </form>

            {/* Lista de negocios */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {businesses.map((business) => (
                    <div key={business._id} className="border p-4 rounded shadow">
                        {editingBusiness === business._id ? (
                            <div>
                                <input
                                    type="text"
                                    value={business.name}
                                    onChange={(e) =>
                                        setBusinesses(
                                            businesses.map((b) =>
                                                b._id === business._id ? { ...b, name: e.target.value } : b
                                            )
                                        )
                                    }
                                    className="w-full p-2 mb-2 border"
                                />
                                <button
                                    className="bg-green-600 text-white px-4 py-2 rounded"
                                    onClick={() => handleUpdateBusiness(business._id)}
                                >
                                    Guardar
                                </button>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-lg font-bold">{business.name}</h2>
                                <ul className="mb-4">
                                    {business.products.map((product, index) => (
                                        <li key={index}>
                                            {product.name} - ${product.price} - {product.quantity} unidades
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                                    onClick={() => setEditingBusiness(business._id)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="bg-red-600 text-white px-4 py-2 rounded"
                                    onClick={() => handleDeleteBusiness(business._id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Business;
