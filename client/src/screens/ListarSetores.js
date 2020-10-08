import React from 'react';
import { FcFullTrash } from "react-icons/fc";
import { FcEngineering } from "react-icons/fc";

import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { verificaToken } from '../utils/token';

import { Link, Redirect } from 'react-router-dom';
import { Tooltip } from 'react-bootstrap';

import { connect } from 'react-redux';

class CadastroSetor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            nomeSetor: '',
            idLocal: '',
            isLoading: false,
            isTokenExpired: false
        }
    }

    componentDidMount() {
        if (verificaToken(this.props.usuario.expiresIn)) {
            return this.setState({ isTokenExpired: true });
        }

        this.setState({ isLoading: true });

        fetch('/api/buscarSetores', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-access-token': this.props.usuario.token
            },
            body: JSON.stringify({
                cidadeId: 0 // 0 - todos os sertores
            })
        })
            .then(result => result.json())
            .then(data => this.setState({ data, isLoading: false }))
            .catch(err => console.log(err));
    }

    excluirSetor = setorId => {
        if (verificaToken(this.props.usuario.expiresIn)) {
            return this.setState({ isTokenExpired: true });
        }

        if (this.props.usuario.token === null) {
            return;
        }

        const resposta = window.confirm("Tem certeza que deseja excluir este setor?");

        if (resposta) {
            fetch('/api/excluirSetor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': this.props.usuario.token
                },
                body: JSON.stringify({
                    setorId: setorId
                })
            })
                .then(response => response.json())
                .then(data => {
                    alert(data.response);
                    if (data.excluido) {
                        this.setState({ data: this.state.data.filter(dado => dado.id !== setorId) });
                    }
                })
                .catch(err => console.log(err));
        }
    };

    render() {
        const { data, isLoading, isTokenExpired } = this.state;

        if (isTokenExpired) {
            return <Redirect to="/logout" />;
        }

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
                        <h2>Editar Setor</h2>
                    </div>
                    <Table striped bordered hover responsive className="tabela-setores">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome Setor</th>
                                <th>Cidade</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((dados, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{dados.nome}</td>
                                        <td>{dados.nome_cidade}</td>
                                        <td>
                                            <OverlayTrigger
                                                placement="top"
                                                delay={{ show: 250, hide: 200 }}
                                                overlay={tooltipEditar}
                                            >
                                                <Link to={`/editar-setor/${dados.id}`}><FcEngineering size="25"></FcEngineering></Link>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                placement="top"
                                                delay={{ show: 250, hide: 200 }}
                                                overlay={tooltipExcluir}
                                            >
                                                <Button variant="link" onClick={this.excluirSetor.bind(this, dados.id)}><FcFullTrash size="25"></FcFullTrash></Button>
                                            </OverlayTrigger>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </div >

        )
    }
};

const mapStateToProps = state => {
    return {
        usuario: state.usuario
    };
}

export default connect(mapStateToProps)(CadastroSetor);