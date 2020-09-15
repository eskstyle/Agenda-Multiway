import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, } from 'react-router-dom';

import logo from '../images/logo.png';

export const Header = () => {
    return (
        <Navbar className="header">
            <Navbar.Brand href="/" className="header-titulo">
                <img src={logo} className="logo" alt="" />
            </Navbar.Brand>
            <Nav className="justify-content-start itens">
                <Nav.Item>
                    <Nav.Link className="header-itens" href="#">AGUAÍ</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="header-itens" href="#">SÃO PAULO</Nav.Link>
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
            <Link to="/" className="header-titulo navbar-brand">
                <img src={logo} className="logo" alt="" />
            </Link>
            {/* <Navbar.Brand href="/" className="header-titulo navbar-brand">
                <img src={logo} className="logo" alt="" />
            </Navbar.Brand> */}
            <Nav className="justify-content-start itens">
                <Nav.Link className="header-itens" href="#">AGUAÍ</Nav.Link>
                <Nav.Link className="header-itens" href="#">SÃO PAULO</Nav.Link>
            </Nav>
            <NavDropdown className="dropdown-menu-header" title="OPÇÕES" id="nav-dropdown" >
                <Link to="/cadastro-setor" className="dropdown-item">Cadastrar Setor</Link>
                <Link to="/cadastro-ramal" className="dropdown-item">Cadastrar Ramal</Link>
                {/* <NavDropdown.Item href="/cadastro-setor">Cadastrar Setor</NavDropdown.Item> */}
                {/* <NavDropdown.Item href="/cadastro-ramal">Cadastrar Ramal</NavDropdown.Item> */}
                <NavDropdown.Divider />
                <Link to="/listar-setores" className="dropdown-item">Editar Setores</Link>
                <NavDropdown.Divider />
                <NavDropdown.Item href="">Sair</NavDropdown.Item>
            </NavDropdown>
        </Navbar>
    );
};
