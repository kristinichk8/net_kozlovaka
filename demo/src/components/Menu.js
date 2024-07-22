import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Menu = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ backgroundColor: '#C5E5E7' }}>
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: '#C5E5E7' }}>НАРУШЕНИЯМ.НЕТ</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/newPaper" style={{ color: '#C5E5E7' }}>Создать заявление</Nav.Link>

          </Nav>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/signup" style={{ color: '#C5E5E7' }}>Регистрация</Nav.Link>
            <Nav.Link as={Link} to="/signin" style={{ color: '#C5E5E7' }}>Вход</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;