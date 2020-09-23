import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import InputMask from 'react-input-mask';

class CadastroRamal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            listaCidades: [],
            listaSetores: [],
            nomePessoa: '',
            numeroRamal: '',
            numeroTelefone: '',
            setorId: '',
            cidadeId: '',
            email: '',
        }
    }

    componentDidMount() {
        fetch('/api/buscarCidades', {
            method: 'GET',
        })
            .then(result => result.json())
            .then(listaCidades => {
                this.setState({ listaCidades: listaCidades });
            })
            .catch(err => console.log(err));
    }

    salvarRamal = () => {

        fetch('/api/salvarRamal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nomePessoa: this.state.nomePessoa,
                numeroRamal: this.state.numeroRamal,
                numeroTelefone: this.state.numeroTelefone,
                setorId: this.state.setorId,
                email: this.state.email,
                acao: 1 // - salvar
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
                    setorId: '',
                    email: ''
                });
            })
            .catch(() => document.getElementsByClassName('alert-erro')[0].style.display = 'block');
    };

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });

        if (target.name === "cidadeId" && target.value > 0) {
            document.getElementsByName('setorId')[0].children[0].innerHTML = "Carregando...";
            fetch('/api/buscarSetores', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    cidadeId: target.value
                })
            })
                .then(result => result.json())
                .then(listaSetores => {
                    document.getElementsByName('setorId')[0].children[0].innerHTML = "Selecione...";
                    this.setState({ listaSetores: listaSetores });
                })
                .catch(err => console.log(err));
        }

        if (target.name === "cidadeId" && target.value <= 0) {
            this.setState({ listaSetores: [] });
        }
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

        const { listaCidades, listaSetores } = this.state;

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
                        <InputMask className="form-control" placeholder="Digite o número do ramal" mask="999" type="text" name="numeroRamal" value={this.state.numeroRamal} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formCadastroTelefone">
                        <Form.Label>Telefone:</Form.Label>
                        <InputMask className="form-control" placeholder="Digite o número do telefone" mask="(99) 99999-9999" type="text" name="numeroTelefone" value={this.state.numeroTelefone} onChange={this.handleChange} />                    </Form.Group>
                    <Form.Group controlId="formCadastroEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="text" placeholder="Digite o email" name="email" value={this.state.email} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formCadastroCidade">
                        <Form.Label>Cidade:</Form.Label>
                        <Form.Control as="select" name="cidadeId" value={this.state.cidadeId} onChange={this.handleChange} required>
                            <option value="">Selecione</option>
                            {listaCidades.map(cidade => <option key={cidade.id} value={cidade.id}>{cidade.nome}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formCadastroSetor">
                        <Form.Label>Setor:</Form.Label>
                        <Form.Control as="select" name="setorId" value={this.state.setorId} onChange={this.handleChange} required>
                            <option value="">Selecione</option>
                            {listaSetores.map(setor => <option key={setor.id} value={setor.id}>{setor.nome}</option>)}
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