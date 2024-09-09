import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: 0,
        category: '',
        stock: 0,
        description: '',
    });

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('http://localhost:8081/api/products');
            setProducts(response.data);
        };
        fetchProducts();
    }, []);

    const handleAddProduct = async () => {
        try {
            const response = await axios.post('http://localhost:8081/api/products', newProduct);
            setProducts([...products, response.data]);
            setNewProduct({ name: '', price: 0, category: '', stock: 0, description: '' });
        } catch (error) {
            console.error('Error al agregar producto:', error);
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

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>

            <div>
                <h3>Agregar Producto</h3>
                <input type="text" placeholder="Nombre" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
                <input type="number" placeholder="Precio" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
                <input type="text" placeholder="Categoría" value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} />
                <input type="number" placeholder="Stock" value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} />
                <textarea placeholder="Descripción" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
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

