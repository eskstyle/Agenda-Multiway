import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import logo from '../images/logo2.png';


export const Header = () => {
    return (
        <Navbar className="header">
            <Link to="/" className="header-titulo navbar-brand">
                <img src={logo} className="logo" alt="" />
            </Link>
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
    const [expanded, setExpanded] = useState(false);

    return (
        <Navbar className="header" expanded={expanded}>
            <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} />
            <Link to="/" className="header-titulo navbar-brand">
                <img src={logo} className="logo" alt="" />
            </Link>
            <Nav className="justify-content-start itens">
                <Link to="/aguai" className="header-itens nav-link">AGUAÍ</Link>
                <Link to="/sao-paulo" className="header-itens nav-link">SÃO PAULO</Link>
            </Nav>
            <NavDropdown className="dropdown-menu-header" title="OPÇÕES" id="nav-dropdown">
                <LinkContainer to="/cadastro-setor" className="dropdown-item">
                    <NavDropdown.Item>Cadastrar Setor</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/cadastro-ramal" className="dropdown-item">
                    <NavDropdown.Item>Cadastrar Ramal</NavDropdown.Item>
                </LinkContainer>
                {/* <Link to="/cadastro-setor" className="dropdown-item" onClick={() => console.log("teste")}></Link> */}
                {/* <Link to="/cadastro-ramal" className="dropdown-item" onClick={() => setExpanded(false)}>Cadastrar Ramal</Link> */}
                <LinkContainer to="/listar-setores" className="dropdown-item">
                    <NavDropdown.Item>Editar Setores</NavDropdown.Item>
                </LinkContainer>
                {/* <Link to="/listar-setores" className="dropdown-item" onClick={() => setExpanded(false)}>Editar Setores</Link> */}
                <NavDropdown.Divider />
                <LinkContainer to="/logout" className="dropdown-item">
                    <NavDropdown.Item>Sair</NavDropdown.Item>
                </LinkContainer>
                {/* <Link to="/logout" className="dropdown-item" onClick={() => setExpanded(false)}>Sair</Link> */}
            </NavDropdown>
        </Navbar>
    );
};
