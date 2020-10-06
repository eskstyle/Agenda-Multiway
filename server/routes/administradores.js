const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const md5 = require('md5');

const connection = require('../db/db');

router.post('/api/login', (req, res) => {
    const usuario = req.body.usuario;
    const senha = req.body.senha;

    const senhaMd5 = md5(senha);

    connection.query(`SELECT * FROM administrador a WHERE a.usuario = ? AND a.senha = ?`, [usuario, senhaMd5], (err, result, fields) => {
        if (err) {
            throw err;
        }

        if (result.length > 0) {
            // Cria um token com 1 hora de expiração.
            let token = jwt.sign({ usuario: usuario, senha: senhaMd5 }, process.env.SECRET, { expiresIn: 60 * 60 });
            res.status(200).send({ autenticado: true, token: token });
        } else {
            res.status(200).send({ autenticado: false, token: null });
        }

    })
});

module.exports = router;