import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import ".././Auth/LoginRegister.css";
import FotoRegister from "../../assets/register.svg";
import ForgotPasswordModal from '../ForgotPasswordModal';
import API_URL from "../../common/constants"


const LoginScreen = ({ changeJwt }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToRegister, setRedirectToRegister] = useState(false); 
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
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

    fetch(API_URL + "/auth/login", requestOptions)
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
    setAnimateOut(true); 

    setTimeout(() => {
      navigate('/registro');
    });
  };

  const handleForgotPassword = () => {

    setShowForgotPasswordModal(true);
  };

  useEffect(() => {

    if (animateOut) {
      setTimeout(() => {
        setAnimateOut(true);
      }); 
    }
  }, [animateOut]);

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
            <Button variant="link" onClick={handleForgotPassword}>Olvidaste la contraseña?</Button>
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
          <img src={FotoRegister} alt="" className='image' />
        </div>
      </div>
      <ForgotPasswordModal
        show={showForgotPasswordModal}
        onHide={() => setShowForgotPasswordModal(false)}
      />
    </div>
  )
}


LoginScreen.propTypes = {
  changeJwt: PropTypes.func.isRequired
}

export default LoginScreen;
