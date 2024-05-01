import React, { useEffect, useState } from 'react';
import { Container, Table, Form, Button, Modal } from "react-bootstrap"
import API_URL from "../common/constants"
import "./Categories.css"
import MySwal, { show_alerta } from '../components/FunctionsSwal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTags } from '@fortawesome/free-solid-svg-icons';

const CategoriesScreen = ({ jwt }) => {
    const [categorias, setCategorias] = useState([])
    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [editarNombre, setEditarNombre] = useState("")
    const [editarDescripcion, setEditarDescripcion] = useState("")
    const [editarId, setEditarId] = useState("")
    const [lgShow, setLgShow] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false);

    const handleClose = () => {
        setLgShow(false);
        setShowEditModal(false); 
    }
    const handleShow = () => setLgShow(true);
    const handleShowEditModal = () => setShowEditModal(true); 

    const getAllCategories = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + jwt)

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };
        const response = await fetch(API_URL + "/categorias/findAll", requestOptions)

        if (response.status >= 400) return alert("No se pudieron obtener las categorias")

        const result = await response.json()

        setCategorias(result.data)
    }

    const createCategory = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + jwt)

        const raw = JSON.stringify({
            nombre: nombre,
            descripcion: descripcion
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };

        const response = await fetch(API_URL + "/categorias/create", requestOptions)
        const result = await response.json()
        console.log(result)
    }

    const deleteCategory = async (_id) => {
        const requestOptions = {
            method: "DELETE",
        };

        const response = await fetch(API_URL + "/categorias/deleteById/" + _id, requestOptions)
        const result = await response.json()
        console.log(result)
    }


    const updateCategory = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            nombre: editarNombre,
            descripcion: editarDescripcion
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
        };

        const response = await fetch(API_URL + "/categorias/updateById/" + editarId, requestOptions)
        const result = await response.json()
        console.log(result)

    }

    const handleChangeName = (event) => {
        setNombre(event.target.value)
    }

    const handleChangeDescription = (event) => {
        setDescripcion(event.target.value)
    }

    const handleSubmit = async () => {
        await createCategory()
        await getAllCategories()

        setNombre("");
        setDescripcion("");
        setLgShow(false);
    }

    const handleSubmitUpdate = async () => {
        await updateCategory()
        await getAllCategories()
        setEditarId("");
        setEditarNombre("");
        setEditarDescripcion("");
        setLgShow(false);
    }



    const handleDeleteCategory = async (_id) => {
        const result = await MySwal.fire({
            title: '¿Seguro de eliminar esta categoría?',
            icon: 'question',
            text: 'No se podrá dar marcha atrás',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            await deleteCategory(_id)
                .then(() => getAllCategories())
                .catch(error => console.error('Error al eliminar la categoría:', error));
        } else {
            show_alerta('La categoría NO fue eliminada', 'info');
        }
    }



    //Side Effects
    useEffect(() => {
        getAllCategories()
    }, [])

    return (
        <Container className='contenedor-categorias'>
            <h1 className='text-center'>Pagina de Categorias</h1>

            {/* FORMULARIO PARA CREAR CATEGORIA */}

            <Button
                className='btn-solid mb-3'
                onClick={handleShow}
                style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "auto" }}
            >Agregar Categoria
            </Button>
            <Modal onHide={handleClose}
                size="lg"
                show={lgShow}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Categoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='categories__create-form'>
                        <div className="input-field">
                            <label className="input-label">
                                Nombre
                            </label>
                            <FontAwesomeIcon className='i' icon={faTags} />
                            <Form.Control
                                type="text"
                                placeholder="Ingrese una Categoria"
                                value={nombre}
                                onChange={handleChangeName}
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
                                onChange={handleChangeDescription}
                            />
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

            {/* FORMULARIO PARA ACTUALIZAR CATEGORIA */}
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
                                        Nombre
                                    </label>
                                    <FontAwesomeIcon className='i' icon={faTags} />
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese una Categoria"
                                        value={editarNombre}
                                        onChange={(event) => setEditarNombre(event.target.value)}
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

            {/* TABLA DE CATEGORIAS */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categorias.map((categorias) => (
                            <tr key={categorias._id}>
                                <td data-label="Nombre">{categorias.nombre}</td>
                                <td data-label="Descripcion">{categorias.descripcion}</td>
                                <td className='buttons-actions'>
                                    <Button className='btn-solid' variant='danger' onClick={() => {
                                        handleDeleteCategory(categorias._id)
                                    }}>Eliminar</Button>
                                    <Button className='btn-solid' variant='warning' onClick={() => {
                                        setEditarId(categorias._id)
                                        setEditarNombre(categorias.nombre)
                                        setEditarDescripcion(categorias.descripcion)
                                        setShowEditModal(true);
                                    }}>Editar</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Container>
    )
}

export default CategoriesScreen