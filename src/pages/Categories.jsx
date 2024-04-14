import React, { useEffect, useState } from 'react';
import { Container, Table, Form, Button } from "react-bootstrap"
import API_URL from "../common/constants"
import "./Categories.css"
import MySwal, { show_alerta } from '../components/FunctionsSwal';

const CategoriesScreen = ({ jwt }) => {
    //States
    const [categorias, setCategorias] = useState([])
    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [editarNombre, setEditarNombre] = useState("")
    const [editarDescripcion, setEditarDescripcion] = useState("")
    const [editarId, setEditarId] = useState("")
    const [showForm, setShowForm] = useState(false)


    //Functions
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

    //Handlers
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
        setShowForm(false);
    }

    const handleSubmitUpdate = async () => {
        await updateCategory()
        await getAllCategories()
        setEditarId("");
        setEditarNombre("");
        setEditarDescripcion("");
        setShowForm(false);
    }

    // const handleDeleteCategory = async (_id) => {
    //     await deleteCategory(_id)
    //     await getAllCategories()
    // }



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
        <Container>
            <h1>Pagina de Categorias</h1>

            {/* FORMULARIO PARA CREAR CATEGORIA */}

            <Button onClick={() => setShowForm(state => !state)}>Crear Categoria</Button>

            <Form className='mb-5 categories__create-form' style={{ height: showForm ? "auto" : undefined }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese una Categoria"
                        value={nombre}
                        onChange={handleChangeName}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control
                        type="text"
                        as="textarea"
                        placeholder="Ingrese una descripcion"
                        value={descripcion}
                        onChange={handleChangeDescription}
                    />
                </Form.Group>
                <Button variant="success" onClick={handleSubmit}>Crear Categoria</Button>
            </Form>

            {/* FORMULARIO PARA ACTUALIZAR CATEGORIA */}
            {
                editarId.length > 0 && (
                    <Form className='mb-5'>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese una Categoria"
                                value={editarNombre}
                                onChange={(event) => setEditarNombre(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control
                                type="text"
                                as="textarea"
                                placeholder="Ingrese una descripcion"
                                value={editarDescripcion}
                                onChange={(event) => setEditarDescripcion(event.target.value)}
                            />
                        </Form.Group>
                        <Button variant="success" onClick={handleSubmitUpdate}>Actualizar Categoria</Button>
                        <Button variant="danger" onClick={() => {
                            setEditarId("")
                            setEditarNombre("")
                            setEditarDescripcion("")
                        }}>Cancelar</Button>
                    </Form>
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
                                <td>{categorias.nombre}</td>
                                <td>{categorias.descripcion}</td>
                                <td>
                                    <Button variant='danger' onClick={() => {
                                        handleDeleteCategory(categorias._id)
                                    }}>Eliminar</Button>
                                    <Button variant='warning' onClick={() => {
                                        setEditarId(categorias._id)
                                        setEditarNombre(categorias.nombre)
                                        setEditarDescripcion(categorias.descripcion)
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