import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { HeaderAdmin } from '../components/Header';
// import {Footer} from '../components/Footer';

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
        fetch('/api/buscarLocal', {
            method: 'GET',
        })
            .then(result => result.json())
            .then(data => {
                this.setState({ data });
            })
            .catch(err => console.log(err));
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    };

    salvarSetor = () => {
        console.log(this.state);

        fetch('/api/salvarSetor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nomeSetor: this.state.nomeSetor,
                idLocal: this.state.idLocal
            })
        })
            .then(result => result.json())
            .then(result => {
                if (result.affectedRows >= 1) {

                }
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
                        <h2>Cadastro Setor</h2>
                    </div>
                    <Form.Group controlId="formCadastroSetor">
                        <Form.Label>Nome Setor</Form.Label>
                        <Form.Control type="text" placeholder="Digite o nome do setor" name="nomeSetor" value={this.state.nomeSetor} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formCadastroSetor">
                        <Form.Label>Setor</Form.Label>
                        <Form.Control as="select" name="idLocal" onChange={this.handleChange.bind(this)} >
                            <option value="">Selecione</option>
                            {data.map(dado => <option key={dado.id} value={dado.id}>{dado.nome}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <div>
                        <Alert variant='danger' dismissible>Alooo globo me ajuda</Alert>
                    </div>
                    <Button variant="primary" type="button" onClick={this.salvarSetor} >Salvar</Button>
                </div>
                {/* <Footer /> */}
            </div >

        )
    }
};

export default CadastroSetor;