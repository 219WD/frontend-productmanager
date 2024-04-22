import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Logo from "../assets/logo.png"
import "../pages/Login.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import "../pages/LoginRegister.css";
import FotoLogin from "../assets/login.svg";

const LoginScreen = ({ changeJwt }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToRegister, setRedirectToRegister] = useState(false); // Nuevo estado
  const navigate = useNavigate();

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
        navigate("/");
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

  const handleSignUpClick = () => {
    document.querySelector('.container-loginregister').classList.add('sign-up-mode');
    setRedirectToRegister(true); // Establecer el estado para redirigir
  };

  const handleSignInClick = () => {
    document.querySelector('.container-loginregister').classList.remove('sign-up-mode');
  };

  useEffect(() => {
    // Redirigir después de la animación
    if (redirectToRegister) {
      const redirectTimeout = setTimeout(() => {
        navigate('/registro'); 
      }, 1500); 
  
      return () => clearTimeout(redirectTimeout); 
    }
  }, [redirectToRegister, navigate]);

  return (
    <div className="container-loginregister">
      <div className="forms-container">
        <div className="signin-signup">
          <Form className='sign-in-form' onSubmit={(event) => event.preventDefault()}>
            <h2>Iniciar Sesion</h2>
            <div className="input-field">
              <FontAwesomeIcon className='i' icon={faUser} />
              <input
                type="text"
                placeholder='Usuario'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon className='i' icon={faLock} />
              <input
                type="password"
                placeholder='Contraseña'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className='btn-solid' onClick={handleLogin}>Iniciar Sesión</Button>
            <p className="social-text">O inicia sesión con tus redes sociales.</p>
            <div className="social-media">
              <a href='#' className="social-icon">
                <FontAwesomeIcon className='i' icon={faFacebook} />
              </a>
              <a href='#' className="social-icon">
                <FontAwesomeIcon className='i' icon={faTwitter} />
              </a>
              <a href='#' className="social-icon">
                <FontAwesomeIcon className='i' icon={faGoogle} />
              </a>
              <a href='#' className="social-icon">
                <FontAwesomeIcon className='i' icon={faLinkedin} />
              </a>
            </div>
          </Form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>No tienes una cuenta?</h3>
            <p>Registra tu cuenta y empieza a administrar tus productos.</p>
            <button className='btn transparent' id='sign-up-btn' onClick={handleSignUpClick}>Regístrate</button>
          </div>
          <img src={FotoLogin} alt="" className='image' />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>Uno de nosotros?</h3>
            <p>Inicia sesión y configura tu panel de administrador.</p>
            <button className='btn transparent' id='sign-in-btn' onClick={handleSignInClick}>Iniciar Sesión</button>
          </div>
        </div>
      </div>
    </div>
  )
}

LoginScreen.propTypes = {
  changeJwt: PropTypes.func.isRequired
}

export default LoginScreen;
