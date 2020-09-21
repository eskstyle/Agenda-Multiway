import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

class CadastroSetor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            nomeSetor: '',
            cidadeId: ''
        }
    }

    componentDidMount() {
        fetch('/api/buscarCidades', {
            method: 'GET',
        })
            .then(result => result.json())
            .then(data => {
                this.setState({ data });
            })
            .catch(err => console.log(err));
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    };

    salvarSetor = () => {

        fetch('/api/salvarSetor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nomeSetor: this.state.nomeSetor,
                cidadeId: this.state.cidadeId
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                response.json();
            })
            .then(() => {
                document.getElementsByClassName('alert-sucesso')[0].style.display = 'block';
                this.setState({
                    nomePessoa: '',
                    numeroRamal: '',
                    numeroTelefone: '',
                    cidadeId: ''
                });
            })
            .catch(() => document.getElementsByClassName('alert-erro')[0].style.display = 'block');
    };

    esconderErro = () => {
        document.getElementsByClassName('alert-erro')[0].style.display = 'none'
    };

    esconderSucesso = () => {
        document.getElementsByClassName('alert-sucesso')[0].style.display = 'none'
    };

    render() {

        const { data } = this.state;

        return (
            <div className="tela">
                {/* <HeaderAdmin /> */}
                <div className="container">
                    <div className="titulo">
                        <h2>Cadastro Setor</h2>
                    </div>
                    <Form.Group controlId="formCadastroSetor">
                        <Form.Label>Setor:</Form.Label>
                        <Form.Control type="text" placeholder="Digite o nome do setor" name="nomeSetor" value={this.state.nomeSetor} onChange={this.handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formCadastroLocal">
                        <Form.Label>Empresa:</Form.Label>
                        <Form.Control as="select" name="cidadeId" value={this.state.cidadeId} onChange={this.handleChange.bind(this)} required>
                            <option value="">Selecione</option>
                            {data.map(dado => <option key={dado.id} value={dado.id}>{dado.nome}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <div className="alert-erro">
                        <Alert variant='danger' onClose={() => this.esconderErro()} dismissible>Alguma coisa deu errada ao salvar suas informações!</Alert>
                    </div>
                    <div className="alert-sucesso">
                        <Alert variant='success' onClose={() => this.esconderSucesso()} dismissible>Salvo com sucesso!</Alert>
                    </div>
                    <Button className="botoes-cor" variant="primary" type="button" onClick={this.salvarSetor} >Salvar</Button>
                </div>
                {/* <Footer /> */}
            </div >

        )
    }
};

export default CadastroSetor;