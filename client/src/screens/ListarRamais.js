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
        this.buscarRamais(0);
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

        if (prevState.cidadeId !== id) {
            this.setState({ cidadeId: id });
            this.buscarRamais(id);
        }
    }

    buscarRamais = (cidadeId) => {
        // this.setState({ isLoading: true });

        fetch('api/buscarRamais', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cidadeId: cidadeId
            })
        })
            .then(result => result.json())
            .then(data => {
                this.setState({ data: data, listaRamais: data, isLoading: false });
            })
            .catch(err => console.log(err));
    };

    pesquisar = event => {
        // console.log(event.target.value);
        const listaRamais = this.state.data;

        const listaPesquisa = listaRamais.filter(pessoa => pessoa.nome.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0);

        this.setState({ listaRamais: listaPesquisa });

        // fetch('/api/pesquisar', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         pesquisar: event.target.value,
        //         cidadeId: this.state.cidadeId
        //     })
        // })
        //     .then(result => result.json())
        //     .then(data => {
        //         console.log(data);
        //         this.setState({ data: data });
        //     })
        //     .catch(err => console.log(err));
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
                        this.setState({ data: this.state.data.filter(dado => dado.id !== ramalId) });
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