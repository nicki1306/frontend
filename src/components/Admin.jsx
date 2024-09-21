import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getBaseUrl } from '../Utils/deploy';

const AdminDashboard = () => {
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

    const BaseUrl = getBaseUrl();

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get(`${BaseUrl}/api/products`);
            setProducts(response.data);
        };
        fetchProducts();
    }, []);

    // Subir la imagen a Cloudinary
    const uploadImage = async () => {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', 'tu_upload_preset');

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/tu_cloud_name/image/upload', formData);
            return response.data.secure_url; 
        } catch (error) {
            console.error('Error al cargar la imagen:', error);
            return null;
        }
    };

    const handleAddProduct = async () => {
        try {
            // Subir la imagen
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
                image: imageUrl 
            };

            const response = await axios.post(`${BaseUrl}/api/products`, productData);
            setProducts([...products, response.data]);
            setNewProduct({ name: '', price: 0, category: '', stock: 0, description: '', image: null });
            setImageFile(null); 
        } catch (error) {
            console.error('Error al agregar producto:', error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`${BaseUrl}/api/products/${id}`);
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>

            <div>
                <h3>Agregar Producto</h3>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={newProduct.name}
                    onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={newProduct.price}
                    onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Categoría"
                    value={newProduct.category}
                    onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={newProduct.stock}
                    onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })}
                />
                <textarea
                    placeholder="Descripción"
                    value={newProduct.description}
                    onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                />
                <input
                    type="file"
                    onChange={e => setImageFile(e.target.files[0])}
                />
                <button onClick={handleAddProduct}>Agregar Producto</button>
            </div>

            <div>
                <h3>Productos</h3>
                <ul>
                    {products.map(product => (
                        <li key={product._id}>
                            {product.name} - ${product.price}
                            <button onClick={() => handleDeleteProduct(product._id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;

