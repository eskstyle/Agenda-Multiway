import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

class EditarSetor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            nomeSetor: '',
            idLocal: '',
            isLoading: false
        }
    }

    componentDidMount() {
        // this.setState({ isLoading: true });

        //BUSCA AS CIDADES PARA SER EXIBIDO NO SELECT EMPRESA
        fetch('/api/buscarCidades', {
            method: 'GET',
        })
            .then(result => result.json())
            .then(data => {
                this.setState({ data: data, isLoading: false });
            })
            .catch(err => console.log(err));

        // BUSCA OS DADOS DO SETOR ESCOLHIDO PELO ID
        fetch('/api/buscarSetor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idSetor: this.props.match.params.idSetor
            })
        })
            .then(result => result.json())
            .then(data => {
                this.setState({
                    nomeSetor: data[0].nome,
                    idLocal: data[0].local_id
                });
            })
            .catch(err => console.log(err));
    }

    // ALTERA OS STADOS DAS VARIÁVEIS BASEADO NO ONCHANGE. A CADA LETRA DIGITADA SERÁ ALTERADO O VALOR.
    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    };

    //FAZ UMA REQUISIÇÃO PARA NOSSO SERVER PARA SALVAR O SETOR NO BANCO DE DADOS.
    salvarSetor = () => {
        // document.getElementsByClassName('botao-salvar').firstChild.text.data = "salvando";
        document.querySelector('.botao-salvar').innerHTML = "Salvando...";

        fetch('/api/atualizarSetor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nomeSetor: this.state.nomeSetor,
                idLocal: this.state.idLocal,
                idSetor: this.props.match.params.idSetor
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                response.json();
            })
            .then(() => {
                document.querySelector('.botao-salvar').innerHTML = "Salvar";
                document.getElementsByClassName('alert-sucesso')[0].style.display = 'block'
            })
            .catch(() => document.getElementsByClassName('alert-erro')[0].style.display = 'block');
    };

    //CHAMADO NO onClose DO ALERT PARA FECHAR O ALERT DE ERRO.
    esconderErro = visibility => {
        if (visibility) {
            document.getElementsByClassName('alert-erro')[0].style.display = 'none'
        }
    };

    //CHAMADO NO onClose DO ALERT PARA FECHAR O ALERT DE SUCESSO.
    esconderSucesso = visibility => {
        if (visibility) {
            document.getElementsByClassName('alert-sucesso')[0].style.display = 'none'
        }
    };

    //RENDERIZA A TELA USANDO JSX
    render() {

        // const { data, isLoading } = this.state

        var dados = this.state.data;
        var carregando = this.state.isLoading;

        if (carregando) {
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
                        <Form.Control as="select" name="idLocal" value={this.state.idLocal} onChange={this.handleChange.bind(this)} required>
                            <option value="">Selecione</option>
                            {dados.map(dado => <option key={dado.id} value={dado.id}>{dado.nome}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <div className="alert-erro">
                        <Alert variant='danger' onClose={() => this.esconderErro(true)} dismissible>Alguma coisa deu errada ao salvar suas informações!</Alert>
                    </div>
                    <div className="alert-sucesso">
                        <Alert variant='success' onClose={() => this.esconderSucesso(true)} dismissible>Salvo com sucesso!</Alert>
                    </div>
                    <Button className="botoes-cor botao-salvar" type="button" onClick={this.salvarSetor} >Salvar</Button>
                </div>
                {/* <Footer /> */}
            </div >

        )
    }
};

export default EditarSetor;