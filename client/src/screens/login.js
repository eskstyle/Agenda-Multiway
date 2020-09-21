import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actionTypes';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: '',
            senha: '',
        }
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    };

    logar = () => {
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                usuario: this.state.usuario,
                senha: this.state.senha
            })
        })
            .then(response => response.json())
            .then(({ autenticado, token }) => {
                if (autenticado) {
                    this.props.onLogin(this.state.usuario, token);
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container-login">
                <div className="container-forms-login">
                    <Form.Group>
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control type="text" placeholder="Digite seu usuário" name="usuario" value={this.state.usuario} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Digite sua senha" name="senha" value={this.state.senha} onChange={this.handleChange} />
                    </Form.Group>
                    <Button className="botoes-cor" onClick={this.logar}>Entrar</Button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (usuario, token) => dispatch({ type: actionTypes.LOGIN, payload: { usuario: { usuario: usuario, token: token } } })
    };
};

export default connect(null, mapDispatchToProps)(Login);