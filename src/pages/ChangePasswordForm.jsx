import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Auth/LoginRegister.css";
import Forgot from "../assets/forgot.svg"
import API_URL from "../common/constants"


const ChangePasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams();

  const handleChangePassword = async () => {
    try {
      if (!newPassword || !confirmPassword) {
        throw new Error('Por favor, ingresa y confirma tu nueva contraseña');
      }

      if (newPassword !== confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }

      const response = await fetch(API_URL +`/auth/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al restablecer la contraseña');
      }

      Swal.fire({
        icon: 'success',
        title: 'Contraseña cambiada exitosamente',
        text: 'Se ha cambiado tu contraseña correctamente.'
      });

      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      });
    }
  };

  return (
    <div className="container-loginregister change">
      <div className="forms-container" style={{ zIndex: "10" }}>
        <div className="signin-signup">
        <Form className='sign-in-form'>
            <h2>Nueva Contraseña</h2>
            <div className="input-field">
              <FontAwesomeIcon className='i' icon={faLock} />
              <input
                type="password"
                placeholder="Ingresa tu nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon className='i' icon={faLock} />
              <input
                type="password"
                placeholder="Confirma tu nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          <Button variant="primary" className="btn-solid" onClick={handleChangePassword}>
            Cambiar Contraseña
          </Button>
        </Form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Olvidaste tu contraseña?</h3>
            <p>Registra y confirma tu nueva contraseña.</p>
          </div>
          <img src={Forgot} alt="" className='image' />
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
