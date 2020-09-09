const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db/db');

const app = express();

app.use(bodyParser.json());

app.use('/api/buscarUsuario', (req, res) => {
    // const usuario = req.body.usuario;
    const usuario = "douglas";

    connection.query(`SELECT * FROM administradores a WHERE a.usuario = ?`, [usuario], (err, result, fields) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.json(result);
    })
});

app.listen(3080, () => {
    console.log("Server Iniciado!");
});