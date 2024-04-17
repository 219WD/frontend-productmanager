import PropTypes from "prop-types";
import React, { useState } from 'react';
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import Logo from "../assets/logo.png"
import "../pages/Login.css"

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
    <div className="login-container">
      <div className="login">
        <h1 className="text-center">Login</h1>
        <Form onSubmit={(event) => event.preventDefault()}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="username"
              placeholder="Ingresar usuario"
              onChange={(event) => setUsername(event.target.value)}
              value={username}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresar contraseña"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              required
            />
          </Form.Group>
          <Button className="w-50" variant="primary" type="submit" onClick={handleLogin}>
            Iniciar Sesion
          </Button>
          <Link to="/registro" className="btn btn-primary w-50" variant="outline-primary">Registro</Link>
        </Form>
      </div>
      <div className="img">
        <img src={Logo} alt="" style={{ width: "20vw" }} />
      </div>
    </div>
  )
}

LoginScreen.propTypes = {
  changeJwt: PropTypes.func.isRequired
}

export default LoginScreen;
