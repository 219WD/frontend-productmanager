import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faGoogle, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import "../pages/LoginRegister.css"
import FotoRegister from "../assets/register.svg"
import FotoLogin from "../assets/login.svg"
import PropTypes from "prop-types";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const LoginRegister = (changeJwt) => {
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



    const handleSignUpClick = () => {
        document.querySelector('.container-loginregister').classList.add('sign-up-mode');
    };

    const handleSignInClick = () => {
        document.querySelector('.container-loginregister').classList.remove('sign-up-mode');
    };

    return (
        <div>
            <div className="container-loginregister">
                <div className="forms-container">
                    <div className="signin-signup">
                    <Form className='sign-in-form' onSubmit={(event) => event.preventDefault()}>
                            <h2>Iniciar Sesion</h2>
                            <div className="input-field">
                                <FontAwesomeIcon className='i' icon={faUser} />
                                <input type="text" placeholder='Usuario' />
                            </div>
                            <div className="input-field">
                                <FontAwesomeIcon className='i' icon={faLock} />
                                <input type="password" placeholder='Contraseña' />
                            </div>
                            <input type="submit" value="Iniciar Sesion" className='btn-solid' />
                            <p className="social-text">O inicia sesion con tus redes sociales.</p>
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

                        <form action="" className='sign-up-form'>
                            <h2>Registro</h2>
                            <div className="input-field">
                                <FontAwesomeIcon className='i' icon={faUser} />
                                <input type="text" placeholder='Usuario' />
                            </div>

                            <div className="input-field">
                                <FontAwesomeIcon className='i' icon={faEnvelope} />
                                <input type="text" placeholder='Email' />
                            </div>
                            <div className="input-field">
                                <FontAwesomeIcon className='i' icon={faLock} />
                                <input type="password" placeholder='Contraseña' />
                            </div>
                            <input type="submit" value="Registrate" className='btn-solid' />
                            <p className="social-text">O registrate con tus redes sociales</p>
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
                        </form>
                    </div>
                </div>
                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>Nuevo aqui?</h3>
                            <p>Registra tu cuenta y empeza a administrar tus productos.</p>
                            <button className='btn transparent' id='sign-up-btn' onClick={handleSignUpClick}>Registrate</button>
                        </div>
                        <img src={FotoLogin} alt="" className='image' />
                    </div>

                    <div className="panel right-panel">
                        <div className="content">
                            <h3>Uno de nosotros?</h3>
                            <p>Inicia sesion y configura tu panel de administrador.</p>
                            <button className='btn transparent' id='sign-in-btn' onClick={handleSignInClick}>Iniciar Sesion</button>
                        </div>
                        <img src={FotoRegister} alt="" className='image' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginRegister