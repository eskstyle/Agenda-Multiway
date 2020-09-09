import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export const Header = () => {
    return (
        <Navbar className="header">
            <Navbar.Brand href="#" className="header-titulo">Ramais</Navbar.Brand>
        </Navbar>

        // <div className="header">

        // </div>
    );
};

export const HeaderAdmin = () => {
    return (
        <Navbar className="header">
            <Navbar.Brand href="#" className="header-titulo">Ramais</Navbar.Brand>
            <Nav className="justify-content-end itens">
                <Nav.Item>
                    <Nav.Link className="header-itens">Editar</Nav.Link>
                </Nav.Item>
                {/* <NavDropdown title="Setor">
                <NavDropdown.Item>Novo</NavDropdown.Item>
            </NavDropdown> */}
            </Nav>
        </Navbar>

        // <div className="header">

        // </div>
    );
};
