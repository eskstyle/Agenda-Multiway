import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { HeaderAdmin, Header } from './components/Header';
import Footer from './components/Footer';

import ListarRamais from './screens/ListarRamais';
import CadastroRamal from './screens/CadastroRamal';
import CadastroSetor from './screens/CadastroSetor';
import ListarSetores from './screens/ListarSetores';
import EditarSetor from './screens/EditarSetor';
import EditarRamal from './screens/EditarRamal';
import Login from './screens/Login';
import Logout from './screens/Logout';

const PrivateRoute = props => {
  const { usuario, component, path } = props;

  if (usuario.token === null) {
    return <Redirect to="/login" />;
  }
  return <Route path={path} component={component} />;
};

function App({ location }) {
  const usuario = useSelector(state => state.usuario);

  return (
    <div className="App">
      {usuario.token === null ? < Header /> : <HeaderAdmin />}
      <Switch>
        <PrivateRoute path="/cadastro-ramal" component={CadastroRamal} usuario={usuario} />
        <PrivateRoute path="/cadastro-setor" component={CadastroSetor} usuario={usuario} />
        <PrivateRoute path="/listar-setores" component={ListarSetores} usuario={usuario} />
        <PrivateRoute path="/cadastro-ramal" component={ListarSetores} usuario={usuario} />
        <PrivateRoute path="/editar-setor/:setorId" component={EditarSetor} usuario={usuario} />
        <PrivateRoute path="/editar-ramal/:ramalId" component={EditarRamal} usuario={usuario} />
        <PrivateRoute path="/logout" component={Logout} usuario={usuario} />
        <Route path="/login" component={Login} />
        <Route path="/:empresa" component={ListarRamais} />
        <Route path="/" exact component={ListarRamais} />
      </Switch>
      <Footer />
      {/* {location.pathname !== '/login' && <Footer />} */}
    </div>
  );
}

export default withRouter(App);
