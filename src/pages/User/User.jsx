import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ForgotPasswordModal from '../ForgotPasswordModal';
import "../User/User.css"
import Users from "../../assets/users.svg"

const UserScreen = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='container-loginregister'>
      <div className="forms-container user" style={{ zIndex: "10" }}>
        <div className='signin-signup user'>
          <div className='sign-in-form'>
            <Button className='btn-solid' onClick={handleShowModal}>
              Solicitar cambio de contraseña
            </Button>
            <p className='p-user'>Una vez hecho el cambio de contraseña en su proxima sesion tendra sus nuevas credenciales.</p>
            <ForgotPasswordModal show={showModal} onHide={handleCloseModal} />
          </div>
        </div>
        <h1 className='text-center mt-3'>Bienvenido Usuario</h1>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <img src={Users} alt="" className='fotoUser' />
        </div>
      </div>
    </div>
  );
};

export default UserScreen;
