const path = require('path');

const express = require('express');
require("dotenv").config();
const bodyParser = require('body-parser');

const ramais = require('./routes/ramais');
const setores = require('./routes/setores');
const cidades = require('./routes/cidades');
const administradores = require('./routes/administradores');

const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(ramais);
app.use(setores);
app.use(cidades);
app.use(administradores);

// Adicionando caminho da build gerada no react (pasta cliente).
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log("Server Iniciado!");
});


// "build": "webpack",