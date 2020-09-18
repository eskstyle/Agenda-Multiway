const express = require('express');
const router = express.Router();

const connection = require('../db/db');

router.get('/api/buscarCidades', (req, res,) => {

    connection.query(`SELECT * FROM cidade`, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    })
});

module.exports = router;