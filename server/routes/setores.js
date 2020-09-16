
const express = require('express');
const router = express.Router();

const connection = require('../db/db');

router.get('/api/buscarSetores', (req, res) => {
    connection.query(`SELECT s.id, s.data_criacao, s.nome, l.nome as nome_local FROM setor s INNER JOIN local l ON s.local_id = l.id;`, (err, result) => {
        if (err) {
            throw err;
        }

        res.json(result);
    });
});

router.post('/api/buscarSetor', (req, res) => {
    const idSetor = req.body.idSetor;

    connection.query(`SELECT * from setor WHERE id = ?;`, [idSetor], (err, result) => {
        if (err) {
            throw err;
        }

        res.json(result);
    });
});

router.post('/api/salvarSetor', (req, res) => {
    const nomeSetor = req.body.nomeSetor;
    const idLocal = req.body.idLocal;

    const query = connection.query(`INSERT INTO setor(nome, local_id) VALUES(?, ?)`, [nomeSetor, idLocal], (err, result) => {
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
    const idLocal = req.body.idLocal;
    const idSetor = req.body.idSetor;

    const query = connection.query(`UPDATE setor SET nome = ?, local_id = ? WHERE id= ?`, [nomeSetor, idLocal, idSetor], (err, result) => {
        if (err) {
            return res.status(500).send({ error: err });
            // throw err;
        }

        return res.status(200).send({ response: result });

    });
});

//UM SETOR SÓ PODERÁ SER DELETADO SE NÃO HOUVER MAIS RAMAIS CADASTRADOS PARA ELE.
router.post('/api/excluirSetor', (req, res) => {
    const idSetor = req.body.idSetor;

    //BUSCA SE EXISTE RAMAIS PARA AQUELE SETOR.
    connection.query(`SELECT * FROM ramal WHERE setor_id = ?`, [idSetor], (err, result) => {
        if (err) {
            return res.status(500).send({ error: err });
        }

        //CASO NÃO HOUVER SERÁ O SETOR SERÁ DELETADO.
        if (result.length <= 0) {
            connection.query(`DELETE FROM setor WHERE id = ? `, [idSetor], (err, result) => {
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
