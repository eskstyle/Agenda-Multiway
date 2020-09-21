import React from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actionTypes';
import { Redirect } from 'react-router-dom';

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

                } else {
                    document.getElementsByClassName('alert-erro-login')[0].style.display = 'block';
                }
            })
            .catch(err => console.log(err));
    }

    esconderErro = () => {
        document.getElementsByClassName('alert-erro-login')[0].style.display = 'none'
    };

    render() {

        if (this.props.usuario.token) {
            return <Redirect to="/" />;
        }

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
                    <Button className="botoes-cor" onClick={this.logar}><span>Entrar</span></Button>
                    <div className="alert-erro-login">
                        <Alert variant='danger' onClose={() => this.esconderErro(true)} dismissible>Usuário ou senha incorretos!</Alert>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        usuario: state.usuario
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (usuario, token) => dispatch({ type: actionTypes.LOGIN, payload: { usuario: { usuario: usuario, token: token } } })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);