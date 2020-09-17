import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import logo from '../images/logo.png';
// import { __esModule } from 'react-bootstrap-maskedinput';

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

    // const mudarEmpresa = empresaId => {
    //     dispatch({ type: actionTypes.MUDAR_EMPRESA, payload: empresaId });
    // }

    return (
        <Navbar className="header">
            <Link to="/" className="header-titulo navbar-brand">
                <img src={logo} className="logo" alt="" />
            </Link>
            <Nav className="justify-content-start itens">
                <Link to="/aguai" className="header-itens nav-link">AGUAÍ</Link>
                <Link to="/sao-paulo" className="header-itens nav-link">SÃO PAULO</Link>
                {/* <Nav.Link className="header-itens" href="/1">AGUAÍ</Nav.Link>
                <Nav.Link className="header-itens" href="/2">SÃO PAULO</Nav.Link> */}
                {/* <Button className="nav-link header-itens" variant="link" onClick={() => mudarEmpresa(1)}>AGUAÍ</Button>
                <Button className="nav-link header-itens" variant="link" onClick={() => mudarEmpresa(2)}>SÃO PAULO</Button> */}
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
