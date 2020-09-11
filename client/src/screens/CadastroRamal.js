import React, { Component, useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { HeaderAdmin } from '../components/Header';

class CadastroRamal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        fetch('/api/buscarSetores', {
            method: 'GET',
        })
            .then(result => result.json())
            .then(data => {
                this.setState({ data });
            })
            .catch(err => console.log(err));
    }

    render() {

        const { data } = this.state;

        return (
            <div className="tela">
                <HeaderAdmin />
                <div className="container">
                    <div className="titulo">
                        <h2>Cadastro Ramal</h2>
                    </div>
                    <Form action="api/salvarRamal" method="POST">
                        <Form.Group controlId="formCadastroRamal">
                            <Form.Label>Número ramal</Form.Label>
                            <Form.Control type="text" placeholder="Digite o número do ramal" name="numeroRamal" />
                        </Form.Group>
                        <Form.Group controlId="formCadastroPessoa">
                            <Form.Label>Número ramal</Form.Label>
                            <Form.Control type="text" placeholder="Digite o nome da pessoa do ramal" name="nomePessoa" />
                        </Form.Group>
                        <Form.Group controlId="formCadastroSetor">
                            <Form.Label>Setor</Form.Label>
                            <Form.Control as="select" name="idSetor">
                                <option value="0">Selecione</option>
                                {data.map(dado => <option key={dado.id} value={dado.id}>{dado.nome}</option>)}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit" >Salvar</Button>
                    </Form>
                </div>
            </div>
        )
    };
};

export default CadastroRamal;