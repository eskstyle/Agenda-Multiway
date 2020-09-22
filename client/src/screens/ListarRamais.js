import React, { useState } from 'react';

import Table from 'react-bootstrap/Table';
import FormControl from 'react-bootstrap/FormControl';
import Spinner from 'react-bootstrap/Spinner';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { FcFullTrash } from "react-icons/fc";
import { FcEngineering } from "react-icons/fc";
import { Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';

class ListarRamais extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            listaRamais: [],
            isLoading: false,
            cidadeId: null
        }
    }

    componentDidMount() {
        fetch('api/buscarRamais', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cidadeId: 0
            })
        })
            .then(result => result.json())
            .then(data => {
                this.setState({ data: data, listaRamais: data, isLoading: false });
            })
            .catch(err => console.log(err));
    }

    componentDidUpdate(prevProps, prevState) {

        let id = 0;

        if (this.props.match.params.empresa === "aguai") {
            id = 1;
        } else if (this.props.match.params.empresa === "sao-paulo") {
            id = 2;
        } else {
            id = 0;
        }

        let listaRamaisCidade = this.state.data;

        if (id !== 0) {
            listaRamaisCidade = this.state.data.filter(ramal => ramal.cidade_id === id);
        }

        if (prevState.cidadeId !== id) {
            this.setState({ listaRamais: listaRamaisCidade, cidadeId: id });
        }
    }

    pesquisar = event => {
        let listaRamais = this.state.data;
        if (this.state.cidadeId !== 0) {
            listaRamais = this.state.data.filter(ramal => ramal.cidade_id === this.state.cidadeId);
        }

        //filtra no array de objetos todos os que no nome conter o que está sendo pesquisado, retorna um array novo com todos que batem com a busca.
        const listaPesquisaNome = listaRamais.filter(pessoa => pessoa.nome.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0);
        const listaPesquisaSetor = listaRamais.filter(pessoa => pessoa.setor.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0);
        const listaPesquisa = [...listaPesquisaNome, ...listaPesquisaSetor];

        this.setState({ listaRamais: listaPesquisa });
    };

    excluirRamal = ramalId => {
        if (this.props.usuario.token === null) {
            return;
        }

        const resposta = window.confirm("Tem certeza que deseja excluir este ramal?");

        if (resposta) {
            fetch('/api/excluirRamal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ramalId: ramalId
                })
            })
                .then(response => response.json())
                .then(data => {
                    alert(data.response);
                    if (data.excluido) {
                        this.setState({ listaRamais: this.state.listaRamais.filter(dado => dado.id !== ramalId) });
                    }
                })
                .catch(err => console.log(err));
        }
    };

    render() {
        const { data, isLoading, listaRamais } = this.state;

        const tooltipEditar = (props) => (
            <Tooltip id="button-editar" {...props}>
                Editar
            </Tooltip>

        );
        const tooltipExcluir = (props) => (
            <Tooltip id="button-excluir" {...props}>
                Excluir
            </Tooltip>

        );

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
                        <h2>Lista de Ramais</h2>
                        <FormControl placeholder="Pesquisar por nome ou setor" onChange={this.pesquisar.bind(this)} />
                    </div>
                    <Table striped bordered hover responsive className="tabela-ramais">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Ramal</th>
                                <th>Telefone</th>
                                <th>Email</th>
                                <th>Setor</th>
                                <th>Cidade</th>
                                {this.props.usuario.token !== null && <th>Opções</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {listaRamais.map((dados, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{dados.nome}</td>
                                    <td>{dados.ramal}</td>
                                    <td>{dados.telefone}</td>
                                    <td>{dados.email}</td>
                                    <td>{dados.setor}</td>
                                    <td>{dados.nome_cidade}</td>
                                    {this.props.usuario.token !== null &&
                                        <td>
                                            <OverlayTrigger
                                                placement="top"
                                                delay={{ show: 250, hide: 200 }}
                                                overlay={tooltipEditar}
                                            >
                                                <Link to={`/editar-ramal/${dados.id}`}><FcEngineering size="25"></FcEngineering></Link>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                placement="top"
                                                delay={{ show: 250, hide: 200 }}
                                                overlay={tooltipExcluir}
                                            >
                                                <Button variant="link" onClick={this.excluirRamal.bind(this, dados.id)}><FcFullTrash size="25"></FcFullTrash></Button>
                                            </OverlayTrigger>
                                        </td>}
                                </tr>)}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    };
}

const mapStateToProps = state => {
    return {
        usuario: state.usuario
    };
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onMudarEmpresa: () => dispatch({ type: actionTypes.MUDAR_EMPRESA, payload: 2 })
//     };
// };

export default connect(mapStateToProps)(ListarRamais);
// export default ListarRamais;