const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db/db');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(express.json());

app.use('/api/buscarUsuario', (req, res,) => {
    const usuario = req.body.usuario;
    // const usuario = "douglas";

    connection.query(`SELECT * FROM administradores a WHERE a.usuario = ?`, [usuario], (err, result, fields) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.json(result);
    })
});

app.post('/api/salvarSetor', (req, res) => {
    const nomeSetor = req.body.nomeSetor;

    const query = connection.query(`INSERT INTO setor(nome) VALUES(?)`, [nomeSetor, 1], (err, result) => {
        if (err) {
            throw err;
        }

        res.json(result);
    });

    // res.json(query.sql); IMPRIME O SQL QUE ESTÁ SENDO FEITO
});

app.get('/api/buscarSetores', (req, res) => {
    connection.query(`SELECT * FROM setor`, (err, result) => {
        if (err) {
            throw err;
        }

        res.json(result);
    });
});

app.post('/api/salvarRamal', (req, res) => {
    const numeroRamal = req.body.numeroRamal;
    const idSetor = req.body.idSetor;
    const nomePessoa = req.body.nomePessoa

    const query = connection.query(`INSERT INTO ramal(ramal, setor_id, nome) VALUES(?, ?, ?)`, [numeroRamal, idSetor, nomePessoa], (err, result) => {
        if (err) {
            throw err;
        }

        res.json(result);
    });

    // IMPRIME O SQL QUE ESTÁ SENDO FEITO
    // res.json(query.sql); 
});

app.get('/api/buscarRamais', (req, res) => {
    const query = connection.query(`SELECT r.ramal, r.nome, s.nome as setor FROM ramal r INNER JOIN setor s ON s.id = r.setor_id`, (err, result) => {
        if (err) {
            throw err;
        }

        res.json(result);
    });
});

app.post('/api/pesquisar', (req, res) => {
    const pesquisa = req.body.pesquisar;

    const query = connection.query(`SELECT r.ramal, r.nome, s.nome as setor FROM ramal r INNER JOIN setor s ON r.setor_id = s.id WHERE r.nome LIKE '%` + pesquisa + `%' OR s.nome LIKE '%` + pesquisa + `%'`, (err, result) => {
        if (err) {
            throw err;
        }

        res.json(result);
    });
});

app.listen(3080, () => {
    console.log("Server Iniciado!");
});
