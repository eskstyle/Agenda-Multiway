import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import MaskedFormControl from 'react-bootstrap-maskedinput';

class CadastroRamal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            nomePessoa: '',
            numeroRamal: '',
            numeroTelefone: '',
            idSetor: ''
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

    salvarRamal = () => {
        console.log(this.state);
        fetch('/api/salvarRamal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nomePessoa: this.state.nomePessoa,
                numeroRamal: this.state.numeroRamal,
                numeroTelefone: this.state.numeroTelefone,
                idSetor: this.state.idSetor
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                response.json();
            })
            .then(() => { document.getElementsByClassName('alert-sucesso')[0].style.display = 'block' })
            .catch(() => document.getElementsByClassName('alert-erro')[0].style.display = 'block');
    };

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    };

    esconderErro = visibility => {
        console.log(visibility);
        if (visibility) {
            document.getElementsByClassName('alert-erro')[0].style.display = 'none'
        }
    };

    esconderSucesso = visibility => {
        if (visibility) {
            document.getElementsByClassName('alert-sucesso')[0].style.display = 'none'
        }
    };

    render() {

        const { data } = this.state;

        return (
            <div className="tela">
                <div className="container">
                    <div className="titulo">
                        <h2>Cadastro Ramal</h2>
                    </div>
                    <Form.Group controlId="formCadastroPessoa">
                        <Form.Label>Nome:</Form.Label>
                        <Form.Control type="text" placeholder="Digite o nome" name="nomePessoa" value={this.state.nomePessoa} onChange={this.handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formCadastroRamal">
                        <Form.Label>Ramal:</Form.Label>
                        <MaskedFormControl type="text" placeholder="Digite o número do ramal" name="numeroRamal" mask='111' value={this.state.numeroRamal} onChange={this.handleChange} />

                    </Form.Group>
                    <Form.Group controlId="formCadastroTelefone">
                        <Form.Label>Telefone:</Form.Label>
                        <MaskedFormControl type="text" placeholder="Digite o número do telefone" name="numeroTelefone" mask='(11) 11111-1111' value={this.state.numeroTelefone} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formCadastroSetor">
                        <Form.Label>Setor:</Form.Label>
                        <Form.Control as="select" name="idSetor" value={this.state.idSetor} onChange={this.handleChange} required>
                            <option value="">Selecione</option>
                            {data.map(dado => <option key={dado.id} value={dado.id}>{dado.nome}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <div className="alert-erro">
                        <Alert variant='danger' onClose={() => this.esconderErro(true)} dismissible>Alguma coisa deu errada ao salvar suas informações!</Alert>
                    </div>
                    <div className="alert-sucesso">
                        <Alert variant='success' onClose={() => this.esconderSucesso(true)} dismissible>Salvo com sucesso!</Alert>
                    </div>
                    <Button className="botoes-cor" variant="primary" type="button" onClick={this.salvarRamal}>Salvar</Button>
                </div>
            </div>
        )
    };
};

export default CadastroRamal;