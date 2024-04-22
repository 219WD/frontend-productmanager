import React, { useState } from 'react';

const ProductosProximosAVencer = ({ productos }) => {
    const [showAllProducts, setShowAllProducts] = useState(false);

    // Verificar si productos es un array antes de intentar iterar sobre él
    if (!Array.isArray(productos)) {
        console.error('El prop "productos" no es un array:', productos);
        return null;
    }

    // Ordenar productos por proximidad al vencimiento
    const sortedProducts = [...productos].sort((a, b) => {
        const dateA = new Date(a.vencimiento);
        const dateB = new Date(b.vencimiento);
        return dateA - dateB;
    });

    const handleShowAllProducts = () => {
        setShowAllProducts(true);
    };

    return (
        <div>
            <h2>Productos Próximos a Vencer</h2>
            <table>
                <thead>
                    <tr>
                        <th>Marca</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Descripción</th>
                        <th>Peso</th>
                        <th>Cantidad</th>
                        <th>Vencimiento</th>
                        <th>Categoría</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedProducts.map((producto, index) => (
                        (showAllProducts || index < 10) && (
                            <tr key={producto._id}>
                                <td>{producto.marca}</td>
                                <td>{producto.producto}</td>
                                <td>{producto.precio}</td>
                                <td>{producto.descripcion}</td>
                                <td>{producto.peso}</td>
                                <td>{producto.cantidad}</td>
                                <td>{producto.vencimiento}</td>
                                <td>{producto.categoria.nombre}</td>
                            </tr>
                        )
                    ))}
                </tbody>
            </table>
            {!showAllProducts && <button onClick={handleShowAllProducts}>Mostrar más</button>}
        </div>
    );
};

export default ProductosProximosAVencer;
