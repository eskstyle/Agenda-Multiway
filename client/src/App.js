import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import ListarRamais from './screens/ListarRamais';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <ListarRamais />
      <Footer />
    </div>
  );
}

export default App;
