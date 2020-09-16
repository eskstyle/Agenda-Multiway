const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db/db');

const ramais = require('./routes/ramais');
const setores = require('./routes/setores');
const cidades = require('./routes/cidades');
const administradores = require('./routes/administradores');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(ramais);
app.use(setores);
app.use(cidades);
app.use(administradores);

app.listen(3080, () => {
    console.log("Server Iniciado!");
});
