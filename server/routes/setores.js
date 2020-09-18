
const express = require('express');
const router = express.Router();

const connection = require('../db/db');

router.post('/api/buscarSetores', (req, res) => {
    const cidadeId = req.body.cidadeId;

    if (cidadeId <= 0) {
        connection.query(`SELECT s.id, s.data_criacao, s.nome, c.nome as nome_cidade FROM setor s INNER JOIN cidade c ON s.cidade_id = c.id`, (err, result) => {
            if (err) {
                throw err;
            }

            res.json(result);
        });
    } else {
        connection.query(`SELECT s.id, s.data_criacao, s.nome, c.nome as nome_cidade FROM setor s INNER JOIN cidade c ON s.cidade_id = c.id WHERE c.id = ?`, [cidadeId], (err, result) => {
            if (err) {
                throw err;
            }

            res.json(result);
        });
    }
});

router.post('/api/buscarSetor', (req, res) => {
    const setorId = req.body.setorId;

    connection.query(`SELECT * from setor WHERE id = ?;`, [setorId], (err, result) => {
        if (err) {
            throw err;
        }

        res.json(result);
    });
});

router.post('/api/salvarSetor', (req, res) => {
    const nomeSetor = req.body.nomeSetor;
    const cidadeId = req.body.cidadeId;

    const query = connection.query(`INSERT INTO setor(nome, cidade_id) VALUES(?, ?)`, [nomeSetor, cidadeId], (err, result) => {
        if (err) {
            return res.status(500).send({ error: err });
            // throw err;
        }

        if (result.affectedRows >= 1) {
            return res.status(200).send({ response: result });
        }
    });

    // res.json(query.sql); IMPRIME O SQL QUE ESTÁ SENDO FEITO
});

router.post('/api/atualizarSetor', (req, res) => {
    const nomeSetor = req.body.nomeSetor;
    const cidadeId = req.body.cidadeId;
    const setorId = req.body.setorId;

    const query = connection.query(`UPDATE setor SET nome = ?, cidade_id = ? WHERE id= ?`, [nomeSetor, cidadeId, setorId], (err, result) => {
        if (err) {
            return res.status(500).send({ error: err });
            // throw err;
        }

        return res.status(200).send({ response: result });

    });
});

//UM SETOR SÓ PODERÁ SER DELETADO SE NÃO HOUVER MAIS RAMAIS CADASTRADOS PARA ELE.
router.post('/api/excluirSetor', (req, res) => {
    const setorId = req.body.setorId;

    //BUSCA SE EXISTE RAMAIS PARA AQUELE SETOR.
    connection.query(`SELECT * FROM ramal WHERE setor_id = ?`, [setorId], (err, result) => {
        if (err) {
            return res.status(500).send({ error: err });
        }

        //CASO NÃO HOUVER SERÁ O SETOR SERÁ DELETADO.
        if (result.length <= 0) {
            connection.query(`DELETE FROM setor WHERE id = ? `, [setorId], (err, result) => {
                if (err) {
                    return res.status(500).send({ error: err });
                }

                return res.status(200).send({ response: "Excluído com sucesso!", excluido: true });

            });
        } else {
            return res.status(200).send({ response: 'Todos os ramais deste setor devem ser excluídos para prosseguir!', excluido: false });
        }

    });
});

module.exports = router;
