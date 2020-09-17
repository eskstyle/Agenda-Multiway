import React from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import logo from '../images/logo.png';
// import { __esModule } from 'react-bootstrap-maskedinput';

import { useSelector, useDispatch } from 'react-redux';
import * as actionTypes from '../store/actionTypes';

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
    const dispatch = useDispatch();

    const mudarEmpresa = empresaId => {
        dispatch({ type: actionTypes.MUDAR_EMPRESA, payload: empresaId });
    }

    return (
        <Navbar className="header">
            <Link to="/" className="header-titulo navbar-brand">
                <img src={logo} className="logo" alt="" />
            </Link>
            <Nav className="justify-content-start itens">
                {/* <Nav.Link className="header-itens" href="#">AGUAÍ</Nav.Link>
                <Nav.Link className="header-itens" href="#">SÃO PAULO</Nav.Link> */}
                <Button className="nav-link header-itens" variant="link" onClick={mudarEmpresa.bind(this, 1)}>AGUAÍ</Button>
                <Button className="nav-link header-itens" variant="link" onClick={mudarEmpresa.bind(this, 2)}>SÃO PAULO</Button>
            </Nav>
            <NavDropdown className="dropdown-menu-header" title="OPÇÕES" id="nav-dropdown" >
                <Link to="/cadastro-setor" className="dropdown-item">Cadastrar Setor</Link>
                <Link to="/cadastro-ramal" className="dropdown-item">Cadastrar Ramal</Link>
                <NavDropdown.Divider />
                <Link to="/listar-setores" className="dropdown-item">Editar Setores</Link>
                <NavDropdown.Divider />
                <NavDropdown.Item href="">Sair</NavDropdown.Item>
            </NavDropdown>
        </Navbar>
    );
};
