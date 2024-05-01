import React, { useEffect, useState } from 'react';
import { Container, Table, Form, Button, Modal, ListGroup } from "react-bootstrap"
import API_URL from "../common/constants"
import MySwal, { show_alerta } from '../components/FunctionsSwal';
import "../pages/Products.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxes, faCalendarAlt, faDollarSign, faInfoCircle, faListAlt, faSearch, faShoppingCart, faTags, faWeight } from '@fortawesome/free-solid-svg-icons';

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
    const [lgShow, setLgShow] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [ascendingOrder, setAscendingOrder] = useState(true);

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

    // Función para obtener el nombre de la categoría a partir de su ID
    const getCategoryName = (categoryId) => {
        const category = marcas.find((marca) => marca._id === categoryId);
        return category ? category.nombre : "Categoría no encontrada";
    };

    //Search
    const filteredProducts = productos.filter((producto) => {
        return (
            producto.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
            producto.producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
            producto.vencimiento.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

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
        setLgShow(false);
    }

    const handleSubmitUpdate = async () => {
        await updateProduct()
        await getAllProducts()
        setEditarId("");
        setEditarMarca("");
        setEditarProducto("");
        setLgShow(false);
    }

    // Manejador para eliminar un producto con Swal
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

    //Button Sort para ordenar por fecha
    const handleSortByExpiry = () => {
        const sortedProductos = [...productos].sort((a, b) => {
            const dateA = new Date(a.vencimiento);
            const dateB = new Date(b.vencimiento);
            return ascendingOrder ? dateA - dateB : dateB - dateA;
        });
        setProductos(sortedProductos);
        setAscendingOrder(!ascendingOrder);
    };

    //Modal
    const handleClose = () => {
        setLgShow(false);
        setShowEditModal(false);
    }
    const handleShow = () => setLgShow(true);
    const handleShowEditModal = () => setShowEditModal(true);

    //Search
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filtrar los productos más cercanos al vencimiento
    const closestToExpiry = [...productos]
        .sort((a, b) => {
            const dateA = new Date(a.vencimiento);
            const dateB = new Date(b.vencimiento);
            return dateA - dateB;
        })
        .slice(0, 10);

    // Llama a getAllProducts en el useEffect para obtener todos los productos al cargar la pantalla
    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <Container className='contenedor-products'>
            <h1 className='text-center'>Pagina de Productos</h1>
            <ListGroup className='mb-3'>
                <ListGroup.Item variant="info">Productos más próximos al vencimiento:</ListGroup.Item>
                {closestToExpiry.map((producto) => (
                    <ListGroup.Item key={producto._id}>
                        {producto.marca} -{producto.producto} - {formatDate(producto.vencimiento)}
                    </ListGroup.Item>
                ))}
            </ListGroup>

            {/* FORMULARIO PARA CREAR PRODUCTO */}
            <Button
                className='btn-solid mb-3'
                onClick={handleShow}
                style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "auto" }}
            >Agregar Producto
            </Button>
            <Modal onHide={handleClose}
                size="lg"
                show={lgShow}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='categories__create-form'>
                        <div className="input-field">
                            <label className="input-label">
                                Marca
                            </label>
                            <FontAwesomeIcon className='i' icon={faTags} />
                            <Form.Control
                                type="text"
                                placeholder="Ingrese una Marca"
                                value={marca}
                                onChange={handleChangeMarca}
                            />
                        </div>
                        <div className="input-field">
                            <label className="input-label">
                                Producto
                            </label>
                            <FontAwesomeIcon className='i' icon={faShoppingCart} />
                            <Form.Control
                                type="text"
                                placeholder="Ingrese un Producto"
                                value={producto}
                                onChange={handleChangeProduct}
                            />
                        </div>
                        <div className="input-field">
                            <label className="input-label">
                                Precio
                            </label>
                            <FontAwesomeIcon className='i' icon={faDollarSign} />
                            <Form.Control
                                type="text"
                                placeholder="Ingrese un Precio"
                                value={precio}
                                onChange={handleChangePrecio}
                            />
                        </div>
                        <div className="input-field">
                            <label className="input-label">
                                Descripcion
                            </label>
                            <FontAwesomeIcon className='i' icon={faInfoCircle} />
                            <Form.Control
                                type="text"
                                placeholder="Ingrese una descripcion"
                                value={descripcion}
                                onChange={handleChangeDescripcion}
                            />
                        </div>
                        <div className="input-field">
                            <label className="input-label">
                                Peso
                            </label>
                            <FontAwesomeIcon className='i' icon={faWeight} />
                            <Form.Control
                                type="text"
                                placeholder="Ingrese un Peso"
                                value={peso}
                                onChange={handleChangePeso}
                            />
                        </div>
                        <div className="input-field">
                            <label className="input-label">
                                Cantidad
                            </label>
                            <FontAwesomeIcon className='i' icon={faBoxes} />
                            <Form.Control
                                type="text"
                                placeholder="Ingrese una Cantidad"
                                value={cantidad}
                                onChange={handleChangeCantidad}
                            />
                        </div>
                        <div className="input-field">
                            <label className="input-label">
                                Vencimiento
                            </label>
                            <FontAwesomeIcon className='i' icon={faCalendarAlt} />
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la fecha de vencimiento AA-MM-DD"
                                value={vencimiento}
                                onChange={(e) => setVencimiento(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <label className="input-label">
                                Categoria
                            </label>
                            <FontAwesomeIcon className='i' icon={faListAlt} />
                            <Form.Select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                                <option>Selecciona una Categoría</option>
                                {marcas.map((marca) => (
                                    <option key={marca._id} value={marca._id}>{marca.nombre}</option>
                                ))}
                            </Form.Select>
                        </div>
                    </Form>
                </Modal.Body>
                <div className='modalfooter'>
                    <Button className='btn-solid' variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button className='btn-solid search' variant="success" onClick={handleSubmit}>Crear Producto</Button>
                </div>
            </Modal>


            {/* FORMULARIO PARA ACTUALIZAR PRODUCTO */}
            {
                editarId.length > 0 && (
                    <Modal show={showEditModal} size='lg' onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Editar Producto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form className='categories__create-form'>
                                <div className="input-field">
                                    <label className="input-label">
                                        Marca
                                    </label>
                                    <FontAwesomeIcon className='i' icon={faTags} />
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese una Marca"
                                        value={editarMarca}
                                        onChange={(event) => setEditarMarca(event.target.value)}
                                    />
                                </div>
                                <div className="input-field">
                                    <label className="input-label">
                                        Producto
                                    </label>
                                    <FontAwesomeIcon className='i' icon={faShoppingCart} />
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese un Producto"
                                        value={editarProducto}
                                        onChange={(event) => setEditarProducto(event.target.value)}
                                    />
                                </div>
                                <div className="input-field">
                                    <label className="input-label">
                                        Precio
                                    </label>
                                    <FontAwesomeIcon className='i' icon={faDollarSign} />
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese un Precio"
                                        value={editarPrecio}
                                        onChange={(event) => setEditarPrecio(event.target.value)}
                                    />
                                </div>
                                <div className="input-field">
                                    <label className="input-label">
                                        Descripcion
                                    </label>
                                    <FontAwesomeIcon className='i' icon={faInfoCircle} />
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese una descripcion"
                                        value={editarDescripcion}
                                        onChange={(event) => setEditarDescripcion(event.target.value)}
                                    />
                                </div>
                                <div className="input-field">
                                    <label className="input-label">
                                        Peso
                                    </label>
                                    <FontAwesomeIcon className='i' icon={faWeight} />
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese un Peso"
                                        value={editarPeso}
                                        onChange={(event) => setEditarPeso(event.target.value)}
                                    />
                                </div>
                                <div className="input-field">
                                    <label className="input-label">
                                        Cantidad
                                    </label>
                                    <FontAwesomeIcon className='i' icon={faBoxes} />
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese una Cantidad"
                                        value={editarCantidad}
                                        onChange={(event) => setEditarCantidad(event.target.value)}
                                    />
                                </div>
                                <div className="input-field">
                                    <label className="input-label">
                                        Vencimiento
                                    </label>
                                    <FontAwesomeIcon className='i' icon={faCalendarAlt} />
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese la fecha de vencimiento AA-MM-DD"
                                        value={editarVencimiento}
                                        onChange={(event) => setEditarVencimiento(event.target.value)}
                                    />
                                </div>
                                <div className="input-field">
                                    <label className="input-label">
                                        Categoria
                                    </label>
                                    <FontAwesomeIcon className='i' icon={faListAlt} />
                                    <Form.Select value={editarCategoria} onChange={(e) => setEditarCategoria(e.target.value)}>
                                        <option>Selecciona una Categoría</option>
                                        {marcas.map((marca) => (
                                            <option key={marca._id} value={marca._id}>{marca.nombre}</option>
                                        ))}
                                    </Form.Select>
                                </div>
                            </Form>
                        </Modal.Body>
                        <div className='modalfooter'>
                            <Button className='btn-solid' variant="secondary" onClick={handleClose}>
                                Cancelar
                            </Button>
                            <Button className='btn-solid search' variant="success" onClick={handleSubmitUpdate}>Actualizar Producto</Button>
                        </div>
                    </Modal>
                )
            }

            {/* Campo de búsqueda */}
            <div className="search-container">
                <div className="input-field">
                    <label className="input-label">
                        Busqueda
                    </label>
                    <FontAwesomeIcon className='i' icon={faSearch} />
                    <Form.Control
                        type="text"
                        placeholder="Buscar producto"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <Button className='btn-solid search' onClick={handleSortByExpiry}>{ascendingOrder ? 'Próximos a Vencimiento' : 'Vencimiento más lejano'}</Button>
            </div>


            {/* TABLA DE PRODUCTOS */}
            <Table striped bordered hover responsive>
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
                    {filteredProducts.map((producto) => (
                        <tr key={producto._id}>
                            <td data-label="Marca">{producto.marca}</td>
                            <td data-label="Producto">{producto.producto}</td>
                            <td data-label="Precio">{producto.precio}</td>
                            <td data-label="Descripcion">{producto.descripcion}</td>
                            <td data-label="Peso">{producto.peso}</td>
                            <td data-label="Cantidad">{producto.cantidad}</td>
                            <td data-label="Vencimiento">{formatDate(producto.vencimiento)}</td>
                            <td data-label="Categoria">{getCategoryName(producto.categoria)}</td>
                            <td className='buttons-actions'>
                                <Button className='btn-solid' variant='danger' onClick={() => handleDeleteProduct(producto._id)}>Eliminar</Button>
                                <Button className='btn-solid' variant='warning' onClick={() => {
                                    setEditarId(producto._id);
                                    setEditarMarca(producto.marca);
                                    setEditarProducto(producto.producto);
                                    setEditarPrecio(producto.precio);
                                    setEditarDescripcion(producto.descripcion);
                                    setEditarPeso(producto.peso);
                                    setEditarCantidad(producto.cantidad);
                                    setEditarVencimiento(formatDate(producto.vencimiento));
                                    setEditarCategoria(producto.categoria);
                                    setShowEditModal(true);
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
