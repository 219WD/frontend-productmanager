import React, { useEffect, useState } from 'react';
import { Container, Table, Form, Button } from "react-bootstrap"
import API_URL from "../common/constants"
import MySwal, { show_alerta } from '../components/FunctionsSwal';

const ProductsScreen = ({ jwt }) => {
    // Estados
    const [productos, setProductos] = useState([])
    const [marcas, setMarcas] = useState([])
    const [marca, setMarca] = useState("")
    const [producto, setProducto] = useState("")
    const [precio, setPrecio] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [peso, setPeso] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [vencimiento, setVencimiento] = useState("")
    const [categoria, setCategoria] = useState("")
    const [editarMarca, setEditarMarca] = useState("")
    const [editarProducto, setEditarProducto] = useState("")
    const [editarPrecio, setEditarPrecio] = useState("")
    const [editarDescripcion, setEditarDescripcion] = useState("")
    const [editarPeso, setEditarPeso] = useState("")
    const [editarCantidad, setEditarCantidad] = useState("")
    const [editarVencimiento, setEditarVencimiento] = useState("")
    const [editarCategoria, setEditarCategoria] = useState("")
    const [editarId, setEditarId] = useState("")
    const [showForm, setShowForm] = useState(false)

    // Obtener todas las categorías disponibles
    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch(API_URL + "/categorias/findAll");
            const result = await response.json();
            setMarcas(result.data);
        }
        fetchCategories();
    }, []);

    // Obtener todos los productos
    const getAllProducts = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + jwt)

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };
        const response = await fetch(API_URL + "/products/findAllProduct", requestOptions)

        if (response.status >= 400) return alert("No se pudieron obtener los productos")

        const result = await response.json()

        setProductos(result.data)
    }

    // Crear un nuevo producto
    const createProduct = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + jwt)

        const raw = JSON.stringify({
            marca: marca,
            producto: producto,
            precio: precio,
            descripcion: descripcion,
            peso: peso,
            cantidad: cantidad,
            vencimiento: vencimiento,
            categoria: categoria
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };

        const response = await fetch(API_URL + "/products/createProduct", requestOptions)
        const result = await response.json()
        console.log(result)

    }

    // Eliminar un producto
    const deleteProduct = async (_id) => {
        const requestOptions = {
            method: "DELETE",
        };

        const response = await fetch(API_URL + "/products/deleteProductById/" + _id, requestOptions)
        const result = await response.json()
        console.log(result)
    }

    // Actualizar un producto
    const updateProduct = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            marca: editarMarca,
            producto: editarProducto,
            precio: editarPrecio,
            descripcion: editarDescripcion,
            peso: editarPeso,
            cantidad: editarCantidad,
            vencimiento: editarVencimiento,
            categoria: editarCategoria
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
        };

        const response = await fetch(API_URL + "/products/updateProductById/" + editarId, requestOptions)
        const result = await response.json()
        console.log(result)

    }

    
    //Formatear Fecha
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString();
        month = month.length === 1 ? '0' + month : month;
        let day = date.getDate().toString();
        day = day.length === 1 ? '0' + day : day;
        return `${year}-${month}-${day}`;
    };


    // Manejadores de cambios en el formulario
    const handleChangeMarca = (event) => {
        setMarca(event.target.value)
    }

    const handleChangeProduct = (event) => {
        setProducto(event.target.value)
    }

    const handleChangePrecio = (event) => {
        setPrecio(event.target.value)
    }

    const handleChangeDescripcion = (event) => {
        setDescripcion(event.target.value)
    }

    const handleChangePeso = (event) => {
        setPeso(event.target.value)
    }

    const handleChangeCantidad = (event) => {
        setCantidad(event.target.value)
    }

    const handleSubmit = async () => {
        await createProduct()
        await getAllProducts()

        setMarca("")
        setProducto("")
        setPrecio("")
        setDescripcion("")
        setPeso("")
        setCantidad("")
        setVencimiento("")
        setCategoria("")
        setShowForm(false);
    }

    const handleSubmitUpdate = async () => {
        await updateProduct()
        await getAllProducts()
        setEditarId("");
        setEditarMarca("");
        setEditarProducto("");
        setShowForm(false);
    }

    // Manejador para eliminar un producto
    const handleDeleteProduct = async (_id) => {
        const result = await MySwal.fire({
            title: '¿Seguro de eliminar este producto?',
            icon: 'question',
            text: 'No se podrá dar marcha atrás',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            await deleteProduct(_id)
                .then(() => getAllProducts())
                .catch(error => console.error('Error al eliminar el producto:', error));
        } else {
            show_alerta('El producto NO fue eliminado', 'info');
        }
    }

    // Llama a getAllProducts en el useEffect para obtener todos los productos al cargar la pantalla
    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <Container>
            <h1>Pagina de Productos</h1>

            {/* FORMULARIO PARA CREAR PRODUCTO */}
            <Button onClick={() => setShowForm(state => !state)}>Crear Producto</Button>
            <Form className='mb-5 categories__create-form' style={{ height: showForm ? "auto" : undefined }}>
                <Form.Group className="mb-3" controlId="formBasicMarca">
                    <Form.Label>Marca</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese una Marca"
                        value={marca}
                        onChange={handleChangeMarca}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicProducto">
                    <Form.Label>Producto</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese un Producto"
                        value={producto}
                        onChange={handleChangeProduct}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPrecio">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese un Precio"
                        value={precio}
                        onChange={handleChangePrecio}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDescripcion">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control
                        type="text"
                        as="textarea"
                        placeholder="Ingrese una descripcion"
                        value={descripcion}
                        onChange={handleChangeDescripcion}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPeso">
                    <Form.Label>Peso</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese un Peso"
                        value={peso}
                        onChange={handleChangePeso}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCantidad">
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese una Cantidad"
                        value={cantidad}
                        onChange={handleChangeCantidad}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicVencimiento">
                    <Form.Label>Vencimiento</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese la fecha de vencimiento"
                        value={vencimiento}
                        onChange={(e) => setVencimiento(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCategoria">
                    <Form.Label>Categoría</Form.Label>
                    <Form.Select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                        <option>Selecciona una Categoría</option>
                        {marcas.map((marca) => (
                            <option key={marca._id} value={marca._id}>{marca.nombre}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Button variant="success" onClick={handleSubmit}>Crear Producto</Button>
            </Form>

            {/* FORMULARIO PARA ACTUALIZAR PRODUCTO */}
            {
                editarId.length > 0 && (
                    <Form className='mb-5'>
                        <Form.Group className="mb-3" controlId="formBasicMarca">
                            <Form.Label>Marca</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese una Marca"
                                value={editarMarca}
                                onChange={(event) => setEditarMarca(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicProducto">
                            <Form.Label>Producto</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese un Producto"
                                value={editarProducto}
                                onChange={(event) => setEditarProducto(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPrecio">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese un Precio"
                                value={editarPrecio}
                                onChange={(event) => setEditarPrecio(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicDescripcion">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control
                                type="text"
                                as="textarea"
                                placeholder="Ingrese una descripcion"
                                value={editarDescripcion}
                                onChange={(event) => setEditarDescripcion(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPeso">
                            <Form.Label>Peso</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese un Peso"
                                value={editarPeso}
                                onChange={(event) => setEditarPeso(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCantidad">
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese una Cantidad"
                                value={editarCantidad}
                                onChange={(event) => setEditarCantidad(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicVencimiento">
                            <Form.Label>Vencimiento</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la fecha de vencimiento AA-MM-DD"
                                value={editarVencimiento}
                                onChange={(event) => setEditarVencimiento(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCategoria">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                                <option>Selecciona una Categoría</option>
                                {marcas.map((marca) => (
                                    <option key={marca._id} value={marca._id}>{marca.nombre}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Button variant="success" onClick={handleSubmitUpdate}>Actualizar Producto</Button>
                        <Button variant="danger" onClick={() => {
                            setEditarId("")
                            setEditarMarca("")
                            setEditarProducto("")
                            setEditarPrecio("")
                            setEditarDescripcion("")
                            setEditarPeso("")
                            setEditarCantidad("")
                            setEditarVencimiento("")
                            setEditarCategoria("")
                        }}>Cancelar</Button>
                    </Form>
                )
            }

            {/* TABLA DE PRODUCTOS */}
            <Table striped bordered hover>
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
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto._id}>
                            <td>{producto.marca}</td>
                            <td>{producto.producto}</td>
                            <td>{producto.precio}</td>
                            <td>{producto.descripcion}</td>
                            <td>{producto.peso}</td>
                            <td>{producto.cantidad}</td>
                            <td>{formatDate(producto.vencimiento)}</td> 
                            <td>{producto.categoria.nombre}</td>
                            <td>
                                <Button variant='danger' onClick={() => handleDeleteProduct(producto._id)}>Eliminar</Button>
                                <Button variant='warning' onClick={() => {
                                    setEditarId(producto._id);
                                    setEditarMarca(producto.marca);
                                    setEditarProducto(producto.producto);
                                    setEditarPrecio(producto.precio);
                                    setEditarDescripcion(producto.descripcion);
                                    setEditarPeso(producto.peso);
                                    setEditarCantidad(producto.cantidad);
                                    setEditarVencimiento(producto.vencimiento);
                                    setEditarCategoria(producto.categoria);
                                }}>Editar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default ProductsScreen;
