import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { getBaseUrl } from "../Utils/deploy";

const Home = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [onSaleProducts, setOnSaleProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [error, setError] = useState(null);

    const BaseUrl = getBaseUrl();

    // Obtener productos destacados
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    `${BaseUrl}/api/products/category/destacados`
                );
                if (Array.isArray(response.data)) {
                    const featuredProducts = response.data.filter(
                        (product) => product.category === "destacados"
                    );
                    setProducts(featuredProducts);
                    setError(null);
                } else {
                    setProducts([]);
                    setError("Error: La respuesta de la API no es un array");
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]);
                setError("Error al obtener los productos");
            }
        };
        fetchProducts();
    }, []);

    // Obtener productos en oferta
    useEffect(() => {
        const fetchOnSaleProducts = async () => {
            try {
                const response = await axios.get(
                    `${BaseUrl}/api/products/category/ofertas`
                );
                if (Array.isArray(response.data)) {
                    setOnSaleProducts(response.data);
                } else {
                    setOnSaleProducts([]);
                    setError("Error al obtener los productos en oferta");
                }
            } catch (error) {
                console.error("Error fetching on-sale products:", error);
                setError("Error al obtener los productos en oferta");
            }
        };
        fetchOnSaleProducts();
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product, 1);
        Swal.fire({
            title: "¡Producto añadido!",
            text: `${product.toy_name} ha sido agregado al carrito`,
            icon: "success",
            confirmButtonText: "Aceptar",
        });
    };

    const handleViewMore = (product) => {
        navigate(`/products/${product._id}`);
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % onSaleProducts.length);
    };

    const prevSlide = () => {
        setCurrentIndex(
            (prevIndex) =>
                (prevIndex - 1 + onSaleProducts.length) % onSaleProducts.length
        );
    };

    useEffect(() => {
        if (onSaleProducts.length === 0) return;

        const intervalId = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [onSaleProducts]);

    return (
        <div>
            {/* Banner con imagen de fondo */}
            <div className="relative bg-gray-900">
                <div
                    className="h-80 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://source.unsplash.com/1600x900/?toys,kids')",
                    }}
                >
                    <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
                        <div className="text-center text-white">
                            <h1 className="text-5xl font-bold mb-4">
                                ¡Bienvenido a nuestra Tienda de Juguetes!
                            </h1>
                            <p className="text-lg mb-6">
                                Encuentra los mejores juguetes para todas las edades.
                            </p>
                            <Link
                                to="/products"
                                className="inline-block px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                            >
                                Explorar Productos
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Carrusel de productos en oferta */}
            <section className="container mx-auto py-2 bg-gradient-to-r from-blue-900 to-cyan-300 rounded-lg shadow-lg relative">
                <h2 className="text-2xl font-bold mb-4 text-center text-white">
                    Ofertas del mes
                </h2>

                {error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : (
                    <div className="relative w-full max-w-4xl mx-auto">
                        <div className="overflow-hidden rounded-lg shadow-lg">
                            <div
                                className="flex transition-transform duration-500 ease-out"
                                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                            >
                                {onSaleProducts.map((product) => (
                                    <div
                                        key={product._id}
                                        className="w-full h-auto flex-shrink-0 p-4 bg-white rounded-lg shadow-lg"
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.toy_name}
                                            className="w-full h-48 object-cover rounded mb-2"
                                        />
                                        <h3 className="text-lg font-semibold">
                                            {product.toy_name}
                                        </h3>
                                        <p className="text-gray-500 line-through">
                                            ${product.price}
                                        </p>
                                        <p className="text-green-600 text-xl font-bold">
                                            ${product.salePrice}
                                        </p>
                                        <p className="text-gray-600">
                                            Stock disponible: {product.stock}
                                        </p>
                                        <div className="mt-2">
                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                className="mr-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                            >
                                                Agregar al carrito
                                            </button>
                                            <button
                                                onClick={() => handleViewMore(product)}
                                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                            >
                                                Ver más
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {onSaleProducts.length > 1 && (
                            <>
                                <button
                                    onClick={prevSlide}
                                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 text-gray-800 hover:bg-opacity-75 transition-all duration-300"
                                    aria-label="Previous slide"
                                >
                                    <FiChevronLeft size={24} />
                                </button>

                                <button
                                    onClick={nextSlide}
                                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 text-gray-800 hover:bg-opacity-75 transition-all duration-300"
                                    aria-label="Next slide"
                                >
                                    <FiChevronRight size={24} />
                                </button>

                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                    {onSaleProducts.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentIndex(index)}
                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                                ? "bg-white scale-125"
                                                : "bg-gray-400"
                                                }`}
                                            aria-label={`Go to slide ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </section>

            {/* Productos destacados */}
            <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : products.length > 0 ? (
                    products.map((product) => (
                        <div
                            key={product._id}
                            className="border rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 bg-white w-60 mx-auto"
                        >
                            <img
                                src={product.image}
                                alt={product.toy_name}
                                className="w-full h-36 object-cover mb-3 rounded-lg"
                            />
                            <h2 className="text-lg font-semibold mb-2 text-gray-800 text-center">
                                {product.toy_name}
                            </h2>
                            <p className="text-lg font-bold text-gray-800 text-center">
                                ${product.price}
                            </p>
                            <p className="text-gray-600 text-center">
                                Stock disponible: {product.stock}
                            </p>
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300 text-sm"
                                >
                                    Agregar al carrito
                                </button>
                                <button
                                    onClick={() => handleViewMore(product)}
                                    className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 text-sm"
                                >
                                    Ver más
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">Cargando productos...</p>
                )}
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-6 mt-10">
                <div className="container mx-auto text-center">
                    <p>
                        &copy; {new Date().getFullYear()} Tienda de Juguetes. Todos los
                        derechos reservados.
                    </p>
                    <ul className="flex justify-center space-x-4 mt-4">
                        <li>
                            <a href="/about" className="hover:text-blue-400">
                                Sobre Nosotros
                            </a>
                        </li>
                        <li>
                            <a href="/privacy" className="hover:text-blue-400">
                                Política de Privacidad
                            </a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-blue-400">
                                Contáctanos
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    );
};

export default Home;
