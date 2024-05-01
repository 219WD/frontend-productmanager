import React, { useState, useEffect } from 'react';
import { Container, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import "./AdminManagment.css"
import API_URL from "../../common/constants"

const AdminManagement = () => {
  const [userId, setUserId] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [showOnlyAdmins, setShowOnlyAdmins] = useState(false); 

  const fetchUsers = async () => {
    try {
      const endpoint = showOnlyAdmins ? '/users' : '/allUsers'; 
      const response = await fetch(API_URL + `/admin${endpoint}`);
      if (!response.ok) {
        throw new Error('Error al traer usuarios');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error al traer usuarios:', error);
      setError('Fallo traer usuarios');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [showOnlyAdmins]); 

  const handleAdminAction = async (userId, isAdmin) => {
    try {
      const confirmed = await Swal.fire({
        title: `Confirmar ${isAdmin ? 'Degradar' : 'Promover'}`,
        text: `¿Está seguro que desea ${isAdmin ? 'degradar' : 'promover'} a este usuario ${isAdmin ? 'de' : 'a'} administrador?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: `Sí, ${isAdmin ? 'degradar' : 'promover'}`,
        cancelButtonText: 'Cancelar',
      });

      if (!confirmed.value) {
        return; 
      }

      const response = await fetch(`http://localhost:8000/admin/${isAdmin ? 'demotion' : 'promotion'}/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isAdmin: !isAdmin }),
      });
      if (!response.ok) {
        throw new Error(`Error al ${isAdmin ? 'degradar' : 'promover'} usuario ${isAdmin ? 'a' : 'de'} administrador`);
      }
      fetchUsers();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const confirmed = await Swal.fire({
        title: 'Confirma eliminar definitivamente',
        text: '¿Está seguro que desea eliminar definitivamente a este usuario?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'Cancelar',
      });

      if (!confirmed.value) {
        return; 
      }

      const response = await fetch('http://localhost:8000/admin/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isAdmin: true, id: userId }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      fetchUsers();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <div className="contenedor-admin-managment">
        <h2 className='text-center'>Manejo de Administradores</h2>
        <Button className='btn-solid' variant="primary" onClick={() => setShowOnlyAdmins(!showOnlyAdmins)}> 
          {showOnlyAdmins ? 'Mostrar Todos' : 'Mostrar Solo Administradores'}
        </Button>
        <h3>Lista de Usuarios</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Es Admin</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td data-label="Usuario">{user.username}</td>
                <td data-label="Es Admin">{user.esEmpleado ? 'Sí' : 'No'}</td>
                <td className='buttons-actions adminmanagment'>
                  <Button
                    className='btn-solid search'
                    variant="primary"
                    onClick={() => handleAdminAction(user._id, user.esEmpleado)}
                  >
                    {user.esEmpleado ? 'Degradar de Admin' : 'Promover a Admin'}
                  </Button>
                  <Button className='btn-solid search' variant="danger" onClick={() => handleDelete(user._id)}>
                    Eliminar Usuario
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default AdminManagement;
