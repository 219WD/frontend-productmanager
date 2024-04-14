import PropTypes from "prop-types";
import React, { useState } from 'react';
import { Container, Form, Button, Alert } from "react-bootstrap";
import Swal from 'sweetalert2';

const RegisterScreen = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [error, setError] = useState(null);

    const handleRegister = (event) => {
        event.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            username: username,
            password: password,
            email: email,
            nombre: nombre,
            apellido: apellido
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:8000/auth/registro", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Hubo un problema al registrar el usuario");
                }
                return response.json();
            })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: '¡Registro exitoso!',
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log("Usuario registrado exitosamente");
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message
                });
            });

            setUsername("");
            setPassword("");
            setEmail("");
            setNombre("");
            setApellido("");
    }

    return (
        <Container className="mb-5">
            <h1>Registro</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formBasicUser">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        onChange={(event) => setUsername(event.target.value)}
                        value={username}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter nombre"
                        onChange={(event) => setNombre(event.target.value)}
                        value={nombre}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicApellido">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter apellido"
                        onChange={(event) => setApellido(event.target.value)}
                        value={apellido}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Registro
                </Button>
            </Form>
        </Container>
    );
}

export default RegisterScreen;
