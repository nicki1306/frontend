import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ControlPanel = () => {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: 0,
        category: '',
        stock: 0,
        description: '',
        image: null,
    });
    const [imageFile, setImageFile] = useState(null);
    const [newRole, setNewRole] = useState('');
    const [showInactiveUsers, setShowInactiveUsers] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const [usersResponse, productsResponse] = await Promise.all([
                    axios.get('http://localhost:8081/api/users'),
                    axios.get('http://localhost:8081/api/products'),
                ]);
                setUsers(usersResponse.data.data || []);
                setProducts(productsResponse.data || []);
                setLoading(false);
            } catch (err) {
                setError('Error al obtener los datos.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleShowInactiveUsers = () => {
        setShowInactiveUsers(!showInactiveUsers);
    };

    // gestion de usuarios
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

    // Subir la imagen a Cloudinary
const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'proyecto final');

    try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dfrttoykp/image/upload', formData);
        console.log('Respuesta de Cloudinary:', response.data); 
        return response.data.secure_url; 
    } catch (error) {
        console.error('Error al subir la imagen:', error.response ? error.response.data : error.message); 
        return null;
    }
};


const handleAddProduct = async () => {
    try {
        let imageUrl = '';
        if (imageFile) {
            imageUrl = await uploadImage();
            if (!imageUrl) {
                alert('Error al subir la imagen');
                return;
            }
        }

        const productData = {
            ...newProduct,
            image: imageUrl,
        };

        const response = await axios.post('http://localhost:8081/api/products', productData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        setProducts([...products, response.data]);
        setNewProduct({ name: '', price: 0, category: '', stock: 0, description: '', image: null });
        setImageFile(null);
    } catch (error) {
        console.error('Error al agregar producto:', error.response ? error.response.data : error.message);
    }
};


    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/products/${id}`);
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    };

    if (loading) {
        return <p className="text-center text-gray-500">Cargando datos...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="container mx-auto my-8 p-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Panel de Gestión</h1>

            {/* Botón para alternar la visualización de usuarios inactivos */}
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={toggleShowInactiveUsers}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    {showInactiveUsers ? 'Mostrar Todos' : 'Mostrar Inactivos'}
                </button>
            </div>

            {/* Gestión de Usuarios */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Gestión de Usuarios</h2>
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Nombre</th>
                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Email</th>
                            <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Rol</th>
                            <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users
                                .filter(user => showInactiveUsers ? !user.active : true)
                                .map((user) => (
                                    <tr className="border-t" key={user._id}>
                                        <td className="py-3 px-4 text-gray-800">{user.name}</td>
                                        <td className="py-3 px-4 text-gray-800">{user.email}</td>
                                        <td className="py-3 px-4">
                                            <select
                                                value={user.role}
                                                onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                                                className="px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 transition"
                                            >
                                                <option value="user">Usuario</option>
                                                <option value="admin">Administrador</option>
                                                <option value="premium">Premium</option>
                                            </select>
                                        </td>
                                        <td className="py-3 px-4">
                                            <button
                                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                                                onClick={() => handleDeleteUser(user._id)}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">No hay usuarios disponibles.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Gestión de Productos */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Gestión de Productos</h2>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-600">Agregar Producto</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={newProduct.name}
                            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                            className="border px-3 py-2 rounded-lg w-full"
                        />
                        <input
                            type="number"
                            placeholder="Precio"
                            value={newProduct.price}
                            onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                            className="border px-3 py-2 rounded-lg w-full"
                        />
                        <input
                            type="text"
                            placeholder="Categoría"
                            value={newProduct.category}
                            onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                            className="border px-3 py-2 rounded-lg w-full"
                        />
                        <input
                            type="number"
                            placeholder="Stock"
                            value={newProduct.stock}
                            onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })}
                            className="border px-3 py-2 rounded-lg w-full"
                        />
                    </div>
                    <textarea
                        placeholder="Descripción"
                        value={newProduct.description}
                        onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="border px-3 py-2 rounded-lg w-full mb-4"
                    />
                    <input
                        type="file"
                        onChange={e => setImageFile(e.target.files[0])}
                        className="mb-4"
                    />
                    <button
                        onClick={handleAddProduct}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                    >
                        Agregar Producto
                    </button>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-4">Lista de Productos</h3>
                    <ul className="space-y-4">
                        {products.map(product => (
                            <li key={product._id} className="bg-gray-50 p-4 rounded-lg shadow">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="font-bold text-lg">{product.name}</h4>
                                        <p className="text-gray-600">${product.price}</p>
                                    </div>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                                        onClick={() => handleDeleteProduct(product._id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;
