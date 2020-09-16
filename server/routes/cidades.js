const express = require('express');
const router = express.Router();

const connection = require('../db/db');

router.get('/api/buscarLocal', (req, res,) => {

    connection.query(`SELECT * FROM local`, (err, result, fields) => {
        if (err) {
            throw err;
        }
        res.json(result);
    })
});

module.exports = router;