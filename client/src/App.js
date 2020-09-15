import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import ListarRamais from './screens/ListarRamais';
import CadastroRamal from './screens/CadastroRamal';
import CadastroSetor from './screens/CadastroSetor';
import ListarSetores from './screens/ListarSetores';
import EditarSetor from './screens/EditarSetor';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={ListarRamais} />
        <Route path="/cadastro-ramal" component={CadastroRamal} />
        <Route path="/cadastro-setor" component={CadastroSetor} />
        <Route path="/listar-setores" component={ListarSetores} />
        <Route path="/editar-setor/:idSetor" component={EditarSetor} />
        {/* <ListarRamais /> */}
      </Switch>/
    </div>
  );
}

export default App;
