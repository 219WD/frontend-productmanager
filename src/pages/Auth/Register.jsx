import React, { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import ".././Auth/LoginRegister.css";
import FotoLogin from "../../assets/login.svg";
import API_URL from "../../common/constants"


const RegisterScreen = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [animateOut, setAnimateOut] = useState(false);
    const navigate = useNavigate();



    const handleRegister = (event) => {
        event.preventDefault();

        if (username.length < 8 || username.length > 20) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El nombre de usuario debe tener entre 8 y 20 caracteres.'
            });
            return;
        }

        const alphanumericRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
        if (!alphanumericRegex.test(password)) {
            Swal.fire({
                icon: 'error',
                title: 'Contraseña no válida',
                text: 'La contraseña debe ser alfanumérica.'
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El correo electrónico no tiene un formato válido.'
            });
            return;
        }

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            username: username,
            password: password,
            email: email
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(API_URL + "/auth/registro", requestOptions)
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
    }

    const handleSignInClick = () => {
        setAnimateOut(true);
        setTimeout(() => {
            navigate('/login');
        });
    };

    useEffect(() => {
        if (animateOut) {
            setTimeout(() => {
                setAnimateOut(false);
            });
        }
    }, [animateOut]);
    return (
        <div className="container-loginregister">
            <div className="forms-container">
                <div className="signin-signup">
                    <Form className='sign-in-form' onSubmit={(event) => event.preventDefault()}>
                        <h2>Registro</h2>
                        <div className="input-field">
                            <FontAwesomeIcon className='i' icon={faUser} />
                            <input
                                type="text"
                                placeholder='Usuario'
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <FontAwesomeIcon className='i' icon={faEnvelope} />
                            <input
                                type="email"
                                placeholder='Email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <FontAwesomeIcon className='i' icon={faLock} />
                            <input
                                type="password"
                                placeholder='Contraseña'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button className='btn-solid' onClick={handleRegister}>Registrarse</Button>
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
                        <h3>Uno de nosotros?</h3>
                        <p>Inicia sesión y configura tu panel de administrador.</p>
                        <button className='btn transparent' id='sign-in-btn' onClick={handleSignInClick}>Iniciar Sesión</button>
                    </div>
                    <img src={FotoLogin} alt="" className='image' />
                </div>
            </div>
        </div>
    );
}

export default RegisterScreen;
