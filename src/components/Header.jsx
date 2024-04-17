import React from "react"
import PropTypes from "prop-types"
import { Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import Logo from "../assets/logo.png"

function Header({ authenticated = false, isAdmin = false, changeJwt }) {
  return (
    <>
      <Navbar expand="lg" style={{background: "#d7d7d7"}}>
        <Container>
          <Link to="/" className="text-decoration-none">
            <Navbar.Brand as="span" className="text-white">
              <img src={Logo} alt="" style={{width:"50px"}}/>
              Stock Manager
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className="text-decoration-none">
                <Nav.Link as="span" className="text-white">
                  Home
                </Nav.Link>
              </Link>
              {authenticated === true && isAdmin === true && (
                <>
                  <Link to="/admin" className="text-decoration-none">
                    <Nav.Link as="span" className="text-white">
                      Admin
                    </Nav.Link>
                  </Link>
                  <Link to="/admin/categorias" className="text-decoration-none">
                    <Nav.Link as="span" className="text-white">
                      Categories
                    </Nav.Link>
                  </Link>
                  <Link to="/admin/products" className="text-decoration-none">
                    <Nav.Link as="span" className="text-white">
                      Productos
                    </Nav.Link>
                  </Link>
                </>



              )}
              {authenticated === true && (
                <Link to="/user" className="text-decoration-none">
                  <Nav.Link as="span" className="text-white">
                    Usuario
                  </Nav.Link>
                </Link>
              )}
              {
                authenticated === false ? (
                  <>
                  <Link to="/login" className="text-decoration-none">
                    <Nav.Link as="span" className="text-white">
                      Iniciar Sesión
                    </Nav.Link>
                  </Link>
                  <Link to="/registro" className="text-decoration-none">
                    <Nav.Link as="span" className="text-white">
                      Registro
                    </Nav.Link>
                  </Link>
                </>
                ) : (
                  <Link className="text-decoration-none" onClick={() => changeJwt("")}>
                    <Nav.Link as="span" className="text-white">
                      Cerrar Sesion
                    </Nav.Link>
                  </Link>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  changeJwt: PropTypes.func.isRequired
}


export default Header;