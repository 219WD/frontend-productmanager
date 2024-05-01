import React, { useEffect } from 'react';
import { Container } from "react-bootstrap"
import { Navigate, useNavigate } from 'react-router-dom';
import "../Admin/Admin.css"
import FotoAdmin from "../../assets/admin.svg"

const AdminScreen = () => {
  const navigate = useNavigate();
  const redirectToCategories = () => {
    navigate('/admin/categorias');
  };

  const redirectToProducts = () => {
    navigate('/admin/products');
  };

  const redirectToAdminManagement = () => {
    navigate('/admin/adminManagement');
  };

  return (
    <Container>
      <div className="container-admin">
        <div className="content-admin">
          <h2>Bienvenido Administrador</h2>
          <h3>¿Que desea hacer hoy?</h3>
        <div className="accion-container">
          <div className="action">
            <h5>Agregar o modificar una Categoria</h5>
            <button className='btn transparent' onClick={redirectToCategories}>Categorias</button>
          </div>
          <div className="action">
            <h5>Agregar o modificar un Producto</h5>
            <button className='btn transparent' onClick={redirectToProducts}>Productos</button>
          </div>
          <div className="action">
            <h5>Promover o Degradar a Administradores</h5>
            <button className='btn transparent' onClick={redirectToAdminManagement}>Administrar</button>
          </div>
        </div>
        </div>
        
        <div className="imgAdmin">
          <img src={FotoAdmin} alt="" />
        </div>
      </div>
    </Container>

  )
}

export default AdminScreen