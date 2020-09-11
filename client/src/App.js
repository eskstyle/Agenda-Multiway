import React from 'react';
// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import { getUser } from './services/Services';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { HeaderAdmin } from './components/Header';
import { Footer } from './components/Footer';
import { CadastroSetor } from './screens/CadastroSetor';

function App() {
  return (
    <div className="App">
      <HeaderAdmin />
      
      <Footer />
    </div>
  );
}

export default App;
