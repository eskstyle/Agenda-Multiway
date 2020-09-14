import React from 'react';

import Table from 'react-bootstrap/Table';
import FormControl from 'react-bootstrap/FormControl';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { HeaderAdmin } from '../components/Header';
import Footer from '../components/Footer';

class ListarRamais extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        fetch('api/buscarRamais', {
            method: 'GET'
        })
            .then(result => result.json())
            .then(data => {
                this.setState({ data: data });
            })
            .catch(err => console.log(err));
    }

    pesquisar = event => {
        // console.log(event.target.value);
        fetch('/api/pesquisar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pesquisar: event.target.value
            })
        })
            .then(result => result.json())
            .then(data => {
                this.setState({ data: data });
            })
            .catch(err => console.log(err));
    };

    render() {

        const { data } = this.state;

        return (
            <div className="tela">
                <HeaderAdmin />
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
                                <th>Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((dados, index) => <tr key={index}><td>{index + 1}</td><td>{dados.nome}</td><td>{dados.ramal}</td><td>{dados.telefone}</td><td>{dados.setor}</td><td></td></tr>)}
                        </tbody>
                    </Table>
                </div>
                <Footer />
            </div>
        )
    };
}

export default ListarRamais;