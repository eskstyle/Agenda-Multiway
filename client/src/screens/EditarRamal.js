import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import InputMask from 'react-input-mask';

import { connect } from 'react-redux';

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
            email: '',
            isLoading: false
        }
    }

    //chamado após o render da tela. Recomendado pelo react para carregar dados na tela.
    //Esta no modo sync ou seja, cada chamada no fetch irá esperar (await) a busca terminar parar executar o código abaixo. 
    //o motivo de eu ter feito essa busca diferente do EditarSetor é que eu preciso que o dropdown da cidade e do setor estejam 
    //populados antes de setar os valores, caso contrário não irá funcionar de deixar selecionado.
    async componentDidMount() {
        this.setState({ isLoading: true });

        try {
            //busca no banco de dados todas as cidades para ser listado no dropdown "cidades"
            const responseCidades = await fetch('/api/buscarCidades', {
                method: 'GET',
            });

            //resultado da busca sendo convertido para json;
            const listaCidades = await responseCidades.json();

            // busca o ramal escolhido pelo id. id -> vem da tela de listar ramais via GET.
            const responseRamal = await fetch('/api/buscarRamal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': this.props.usuario.token
                },
                body: JSON.stringify({
                    ramalId: this.props.match.params.ramalId
                })
            })

            //resultado da busca sendo convertido para json.
            const dadosRamal = await responseRamal.json();

            //busca todos os setores que pertecem a cidade escolhida.
            const responseSetores = await fetch('/api/buscarSetores', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'x-access-token': this.props.usuario.token
                },
                body: JSON.stringify({
                    cidadeId: dadosRamal[0].cidade_id,
                })
            });

            //resultado da busca sendo convertido para json.
            const listaSetores = await responseSetores.json();

            //Após as 3 consultas terminarem os valores são setados para exibir em modo de edição. É preciso todas as etapas antes porque
            //na base salvamos o id do setor, precisamos dele antes pra poder listar perfeitamente.
            this.setState({
                listaCidades: listaCidades,
                listaSetores: listaSetores,
                nomePessoa: dadosRamal[0].nome_pessoa,
                numeroRamal: dadosRamal[0].ramal,
                numeroTelefone: dadosRamal[0].telefone,
                cidadeId: dadosRamal[0].cidade_id,
                setorId: dadosRamal[0].setor_id,
                email: dadosRamal[0].email
            });

            //estou deixando o código que remove o loading dentro do try pra caso der erro ele continuar no loading infinito indicando um problema.
            this.setState({ isLoading: false });
        } catch (err) {
            console.log("Erro ao buscar suas informações. " + err);
        }
    }

    salvarRamal = () => {

        fetch('/api/salvarRamal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': this.props.usuario.token
            },
            body: JSON.stringify({
                nomePessoa: this.state.nomePessoa,
                numeroRamal: this.state.numeroRamal,
                numeroTelefone: this.state.numeroTelefone,
                setorId: this.state.setorId,
                ramalId: this.props.match.params.ramalId,
                email: this.state.email,
                acao: 2 // - atualizar
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                response.json();
            })
            .then(() => document.getElementsByClassName('alert-sucesso')[0].style.display = 'block')
            .catch(() => document.getElementsByClassName('alert-erro')[0].style.display = 'block');
    };

    //Chamado a cada botão pressionado nos inputs. Ele recebe um target.name que representa o nome do input que está sendo digitado no momento.
    //E recebe também um value que é o valor que está no input.
    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });

        //utilizado para verificar se o dropdown da cidade foi alterado, caso sim, ele deverá recarregar o dropdown do setor com os setores da cidade escolhida.
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

        //caso o dropdown da cidade <= 0 ou seja estiver no selecione, o dropdown do setor não pode ter valores cadastrados, então caso for <= 0 ele limpa os dados do setor. 
        if (target.name === "cidadeId" && target.value <= 0) {
            this.setState({ listaSetores: [], setorId: '' });
        }
    };

    esconderErro = () => {
        document.getElementsByClassName('alert-erro')[0].style.display = 'none';
    };

    esconderSucesso = () => {
        document.getElementsByClassName('alert-sucesso')[0].style.display = 'none';
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
                        <Form.Control type="text" placeholder="Digite o nome" name="nomePessoa" value={this.state.nomePessoa !== null ? this.state.nomePessoa : ""} onChange={this.handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formCadastroRamal">
                        <Form.Label>Ramal:</Form.Label>
                        <InputMask className="form-control" placeholder="Digite o número do ramal" mask="999" type="text" name="numeroRamal" value={this.state.numeroRamal} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formCadastroTelefone">
                        <Form.Label>Telefone:</Form.Label>
                        <InputMask className="form-control" placeholder="Digite o número do telefone" mask="(99) 99999-9999" type="text" name="numeroTelefone" value={this.state.numeroTelefone} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formCadastroEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="text" placeholder="Digite o email" name="email" value={this.state.email !== null ? this.state.email : ""} onChange={this.handleChange} />
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
                        <Alert variant='danger' onClose={() => this.esconderErro()} dismissible>Alguma coisa deu errada ao salvar suas informações!</Alert>
                    </div>
                    <div className="alert-sucesso">
                        <Alert variant='success' onClose={() => this.esconderSucesso()} dismissible>Salvo com sucesso!</Alert>
                    </div>
                    <Button className="botoes-cor" variant="primary" type="button" onClick={this.salvarRamal}>Salvar</Button>
                </div>
            </div>
        )
    };
};

const mapStateToProps = state => {
    return {
        usuario: state.usuario
    };
}

export default connect(mapStateToProps)(EditarRamal);