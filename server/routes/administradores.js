const express = require('express');
const router = express.Router();

const md5 = require('md5');

const connection = require('../db/db');

router.post('/api/login', (req, res,) => {
    const usuario = req.body.usuario;
    const senha = req.body.senha;

    const senhaMd5 = md5(senha);

    connection.query(`SELECT * FROM administrador a WHERE a.usuario = ? AND a.senha = ?`, [usuario, senhaMd5], (err, result, fields) => {
        if (err) {
            throw err;
        }

        if (result.length > 0) {
            res.status(200).send({ autenticado: true, token: senhaMd5 });
        } else {
            res.status(200).send({ autenticado: false, token: senhaMd5 });
        }

        // res.status(200).send({ autenticado: true, token: senhaMd5 });
    })
});

module.exports = router;