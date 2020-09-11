import React from 'react';

import Table from 'react-bootstrap/Table';
import FormControl from 'react-bootstrap/FormControl';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { HeaderAdmin } from '../components/Header';
// import { Footer } from '../components/Footer';

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
                        <Row>
                            <Col md={9}>
                                <h2>Ramais Multiway</h2>
                            </Col>
                            <Col md={3}>
                                <FormControl placeholder="Pesquisar por nome ou setor" onChange={this.pesquisar.bind(this)} />
                            </Col>
                        </Row>
                    </div>
                    {/* <Tabela /> */}
                    <Table striped bordered hover className="tabela-ramais">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Ramal</th>
                                <th>Setor</th>
                                <th>Pessoa</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((dados, index) => <tr key={index}><td>{index + 1}</td><td>{dados.ramal}</td><td>{dados.setor}</td><td>{dados.nome}</td><td></td></tr>)}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    };
}

export default ListarRamais;