import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown'

import logo from '../images/logo.png';

export const Header = () => {
    return (
        <Navbar className="header">
            <Navbar.Brand href="#" className="header-titulo">
                <img src={logo} className="logo" alt="" />
            </Navbar.Brand>
            <Nav className="justify-content-start itens">
                <Nav.Item>
                    <Nav.Link className="header-itens" href="#">MULTIWAY</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="header-itens" href="#">JVM</Nav.Link>
                </Nav.Item>
            </Nav>
            <Nav className="justify-content-end itens">
                <Nav.Item>
                    <Nav.Link className="header-itens" href="#">LOGIN</Nav.Link>
                </Nav.Item>
            </Nav>
        </Navbar>
    );
};

export const HeaderAdmin = () => {
    return (
        <Navbar className="header">
            <img src={logo} className="logo" alt="" />
            <Nav className="justify-content-start itens">
                <Nav.Item>
                    <Nav.Link className="header-itens" href="#">MULTIWAY</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="header-itens" href="#">JVM</Nav.Link>
                </Nav.Item>
            </Nav>
            <Nav className="justify-content-end itens">
                <NavDropdown className="dropdown-menu-header" title="OPÇÕES" id="nav-dropdown">
                    <NavDropdown.Item href="">Editar</NavDropdown.Item>
                    <NavDropdown.Item href="">Sair</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar>
    );
};
