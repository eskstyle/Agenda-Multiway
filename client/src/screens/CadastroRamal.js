import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { HeaderAdmin } from '../components/Header';

import MaskedFormControl from 'react-bootstrap-maskedinput'

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

    validaCampos = campo => {
        console.log("Entrou");
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
                        <Form.Group controlId="formCadastroPessoa">
                            <Form.Label>Nome:</Form.Label>
                            <Form.Control type="text" placeholder="Digite o nome" name="nomePessoa" required />
                        </Form.Group>
                        <Form.Group controlId="formCadastroRamal">
                            <Form.Label>Ramal:</Form.Label>
                            <MaskedFormControl type="text" placeholder="Digite o número do ramal" name="numeroRamal" mask='111' />
                            
                        </Form.Group>
                        <Form.Group controlId="formCadastroTelefone">
                            <Form.Label>Telefone:</Form.Label>
                            <MaskedFormControl type="text" placeholder="Digite o número do telefone" name="numeroTelefone" mask='(11) 11111-1111' />
                        </Form.Group>

                        <Form.Group controlId="formCadastroSetor" onChange={this.validaCampos.bind(this)}>
                            <Form.Label>Setor:</Form.Label>
                            <Form.Control as="select" name="idSetor" required>
                                <option value="">Selecione</option>
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