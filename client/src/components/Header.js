import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import logo from '../images/logo.png';
import DropdownMenu from 'react-bootstrap/DropdownMenu';

export const Header = () => {
    return (
        <Navbar className="header">
            <Navbar.Brand href="/" className="header-titulo">
                <img src={logo} className="logo" alt="" />
            </Navbar.Brand>
            <Nav className="justify-content-start itens">
                <Nav.Item>
                    <Nav.Link className="header-itens" href="#">MAGUAÍ</Nav.Link>
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
            <Navbar.Brand href="/" className="header-titulo">
                <img src={logo} className="logo" alt="" />
            </Navbar.Brand>
            <Nav className="justify-content-start itens">
                    <Nav.Link className="header-itens" href="#">AGUAÍ</Nav.Link>
                    <Nav.Link className="header-itens" href="#">SÃO PAULO</Nav.Link>          
            </Nav>
                <NavDropdown className="dropdown-menu-header" title="OPÇÕES" id="nav-dropdown" >
                    <NavDropdown.Item href="/cadastro-setor">Cadastrar Setor</NavDropdown.Item>
                    <NavDropdown.Item href="/cadastro-ramal">Cadastrar Ramal</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="">Editar Setor</NavDropdown.Item>
                    <NavDropdown.Item href="">Editar Ramal</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="">Sair</NavDropdown.Item>
                </NavDropdown>
        </Navbar>
    );
};
