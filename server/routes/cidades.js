const express = require('express');
const router = express.Router();

const connection = require('../db/db');

router.get('/api/buscarCidades', (req, res,) => {

    try {
        connection.query(`SELECT * FROM cidade`, (err, result) => {
            if (err) {
                throw err;
            }
            return res.json(result);
        })
    } catch (err) {
        return res.status(500).json('Erro ao buscar as cidades');
    }
});

module.exports = router;