import PropTypes from "prop-types";
import React, { useState } from 'react';
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const LoginScreen = ({ changeJwt }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username: username,
      password: password
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:8000/auth/login", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Credenciales inválidas");
        }
        return response.json();
      })
      .then((result) => {
        changeJwt(result.access_token);
        Swal.fire({
          icon: 'success',
          title: '¡Inicio de sesión exitoso!',
          showConfirmButton: false,
          timer: 1500
        });
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
  }

  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={(event) => event.preventDefault()}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
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
        <Button variant="primary" type="submit" onClick={handleLogin}>
          Iniciar Sesion
        </Button>
        <Link to="/registro" className="btn btn-primary ms-2">Registro</Link>
      </Form>
    </Container>
  )
}

LoginScreen.propTypes = {
  changeJwt: PropTypes.func.isRequired
}

export default LoginScreen;
