import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import MaskedFormControl from 'react-bootstrap-maskedinput';

class EditarRamal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            listaSetores: [],
            listaCidades: [],
            nomePessoa: '',
            numeroRamal: '',
            numeroTelefone: '',
            setorId: '',
            cidadeId: '',
            isLoading: false
        }
    }

    async componentDidMount() {
        this.setState({ isLoading: true });

        const responseCidades = await fetch('/api/buscarCidades', {
            method: 'GET',
        });

        const listaCidades = await responseCidades.json();

        // BUSCA OS DADOS DO RAMAL ESCOLHIDO PELO ID
        const responseRamal = await fetch('/api/buscarRamal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idRamal: this.props.match.params.idRamal
            })
        })

        const dadosRamal = await responseRamal.json();

        const responseSetores = await fetch('/api/buscarSetores', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                idCidade: dadosRamal[0].cidade_id,
            })
        });

        const listaSetores = await responseSetores.json();

        this.setState({
            listaCidades: listaCidades,
            listaSetores: listaSetores,
            nomePessoa: dadosRamal[0].nome_pessoa,
            numeroRamal: dadosRamal[0].ramal,
            numeroTelefone: dadosRamal[0].telefone,
            cidadeId: dadosRamal[0].cidade_id,
            setorId: dadosRamal[0].setor_id,
        });

        this.setState({ isLoading: false });
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
                idSetor: this.state.setorId,
                idRamal: this.props.match.params.idRamal,
                acao: 2 // - atualizar
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

        if (target.name === "cidadeId" && target.value > 0) {
            fetch('/api/buscarSetores', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    idCidade: target.value
                })
            })
                .then(result => result.json())
                .then(listaSetores => {
                    this.setState({ listaSetores: listaSetores });
                })
                .catch(err => console.log(err));
        }

        if (target.name === "cidadeId" && target.value <= 0) {
            this.setState({ listaSetores: [], setorId: '' });
        }
    };

    esconderErro = visibility => {
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

        const { isLoading, listaCidades, listaSetores } = this.state;

        if (isLoading) {
            return (
                <div className="loading_container">
                    <Spinner animation="border" role="status" className="loading" variant="success">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            );
        }

        return (
            <div className="tela">
                <div className="container">
                    <div className="titulo">
                        <h2>Editar Ramal</h2>
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

export default EditarRamal;