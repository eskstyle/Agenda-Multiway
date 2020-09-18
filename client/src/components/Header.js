import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import logo from '../images/logo.png';

import { useSelector } from 'react-redux';
// import { __esModule } from 'react-bootstrap-maskedinput';

export const Header = () => {
    return (
        <Navbar className="header">
            <Navbar.Brand href="/" className="header-titulo">
                <img src={logo} className="logo" alt="" />
            </Navbar.Brand>
            <Nav className="justify-content-start itens">
            <Link to="/aguai" className="header-itens nav-link">AGUAÍ</Link>
                <Link to="/sao-paulo" className="header-itens nav-link">SÃO PAULO</Link>
            </Nav>
            <Nav className="justify-content-end">
                <Link to="/login" className="header-item-entrar">Login</Link>
            </Nav>
        </Navbar>
    );
};

export const HeaderAdmin = () => {

    const usuario = useSelector(state => state.usuario);

    return (
        <Navbar className="header">
            <Link to="/" className="header-titulo navbar-brand">
                <img src={logo} className="logo" alt="" />
            </Link>
            <Nav className="justify-content-start itens">
                <Link to="/aguai" className="header-itens nav-link">AGUAÍ</Link>
                <Link to="/sao-paulo" className="header-itens nav-link">SÃO PAULO</Link>
            </Nav>
            <NavDropdown className="dropdown-menu-header" title="OPÇÕES" id="nav-dropdown" >
                <Link to="/cadastro-setor" className="dropdown-item">Cadastrar Setor</Link>
                <Link to="/cadastro-ramal" className="dropdown-item">Cadastrar Ramal</Link>
                <NavDropdown.Divider />
                <Link to="/listar-setores" className="dropdown-item">Editar Setores</Link>
                <NavDropdown.Divider />
                <Link to="/logout" className="dropdown-item">Sair</Link>
            </NavDropdown>
        </Navbar>
    );
};
