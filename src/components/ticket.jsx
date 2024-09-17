import { useLocation } from "react-router-dom";

const Ticket = () => {
    const location = useLocation();
    const { order } = location.state || {};

    if (!order) {
        return <div>No se encontró la información del ticket.</div>;
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-4xl font-bold mb-8 text-center text-teal-600">
                Ticket de Compra
            </h1>
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Orden #{order._id}
                </h2>
                <div className="border-t border-b py-4 mb-6">
                    <p className="text-lg text-gray-700 mb-2">
                        Total:
                        <span className="font-semibold text-gray-900">
                            {" "}
                            ${order.total ? order.total.toFixed(2) : 'N/A'}
                        </span>
                    </p>
                    <p className="text-lg text-gray-700 mb-2">
                        Método de Pago:
                        <span className="font-semibold text-gray-900">
                            {" "}
                            {order.paymentMethod}
                        </span>
                    </p>
                </div>

                <div className="ticket-section">
                    <h2>Productos Comprados</h2>
                    <ul>
                        {order.items.map((item, index) => (
                            <li key={index} className="flex items-center space-x-4 mb-4">
                                {item.productId && item.productId.image ? (
                                    <img
                                        src={item.productId.image}
                                        alt={item.productId.toy_name || 'Producto'}
                                        className="w-16 h-16 object-cover mb-2"
                                    />
                                ) : (
                                    <img
                                        src="/path/to/default-image.jpg" 
                                        alt="Imagen no disponible"
                                        className="w-16 h-16 object-cover mb-2"
                                    />
                                )}
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {item.productId && item.productId.toy_name
                                            ? item.productId.toy_name
                                            : "Producto sin nombre"}
                                    </h3>
                                    <p>Cantidad: {item.quantity}</p>
                                    <p>
                                        Precio: $
                                        {item.productId && item.productId.price
                                            ? item.productId.price.toFixed(2)
                                            : "N/A"}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Datos de la Empresa
                    </h3>
                    <p className="text-gray-700">Toy Store Inc.</p>
                    <p className="text-gray-700">
                        Dirección: Calle Falsa 123, Ciudad, País
                    </p>
                    <p className="text-gray-700">Teléfono: +123 456 789</p>
                    <p className="text-gray-700">Email: contacto@toystore.com</p>
                </div>

                <div className="mt-6 text-center">
                    <button
                        className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
                        onClick={() => window.print()}
                    >
                        Imprimir Ticket
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Ticket;
