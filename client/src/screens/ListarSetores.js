import React from 'react';
import { FcFullTrash } from "react-icons/fc";
import { FcEngineering } from "react-icons/fc";

import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import { Link } from 'react-router-dom';
import { Tooltip } from 'react-bootstrap';

class CadastroSetor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            nomeSetor: '',
            idLocal: ''
        }
    }

    componentDidMount() {
        fetch('/api/buscarSetores', {
            method: 'GET',
        })
            .then(result => result.json())
            .then(data => this.setState({ data }))
            .catch(err => console.log(err));
    }

    render() {

        const { data } = this.state;

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
                                <th>Local</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((dados, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{dados.nome}</td>
                                        <td>{dados.nome_local}</td>
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
                                                <Link to=""><FcFullTrash size="25"></FcFullTrash></Link>
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

export default CadastroSetor;