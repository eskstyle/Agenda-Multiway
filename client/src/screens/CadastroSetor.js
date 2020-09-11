import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { HeaderAdmin } from '../components/Header';
// import {Footer} from '../components/Footer';

class CadastroSetor extends React.Component {
    render() {
        return (
            <div className="tela">
                <HeaderAdmin />
                <div className="container">
                    <div className="titulo">
                        <h2>Cadastro Setor</h2>
                    </div>
                    <Form action="api/salvarSetor" method="POST">
                        <Form.Group controlId="formCadastroSetor">
                            <Form.Label>Nome Setor</Form.Label>
                            <Form.Control type="text" placeholder="Digite o nome do setor" name="nomeSetor" />
                        </Form.Group>
                        <Button variant="primary" type="submit" >Salvar</Button>
                    </Form>
                </div>
                {/* <Footer /> */}
            </div>
        )
    }
};

export default CadastroSetor;