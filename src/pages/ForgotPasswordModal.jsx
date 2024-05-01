import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import "./Auth/LoginRegister.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import API_URL from "../common/constants"


const ForgotPasswordModal = ({ show, onHide }) => {
  const [email, setEmail] = useState('');

  const handleForgotPasswordSubmit = async () => {
    try {
      if (!email) {
        throw new Error('Por favor, ingresa tu correo electrónico');
      }
  
      const response = await fetch(API_URL + '/auth/reset-password-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al enviar la solicitud de restablecimiento de contraseña');
      }
  
      onHide(); 
      Swal.fire({
        icon: 'success',
        title: 'Solicitud enviada',
        text: 'Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      });
    }
  };

  return (
<Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Olvidaste la contraseña?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Por favor ingresa tu email.</p>
        <Form>
          <Form.Group controlId="formUsernameOrEmail" className='w-100'>
            <Form.Label>Email</Form.Label>
            <div className="input-field"> 
              <FontAwesomeIcon className='i' icon={faEnvelope} />
              <Form.Control
                type="text"
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <div className='modalfooter'>
        <Button className='btn-solid' variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button className='btn-solid' variant="primary" onClick={handleForgotPasswordSubmit}>
          Enviar
        </Button>
      </div>
    </Modal>
  );
};

export default ForgotPasswordModal;
