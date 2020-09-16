const express = require('express');
const router = express.Router();

const connection = require('../db/db');

router.get('/api/buscarUsuario', (req, res,) => {
    const usuario = req.body.usuario;
    // const usuario = "douglas";

    connection.query(`SELECT * FROM administradores a WHERE a.usuario = ?`, [usuario], (err, result, fields) => {
        if (err) {
            throw err;
        }
        res.json(result);
    })
});

module.exports = router;