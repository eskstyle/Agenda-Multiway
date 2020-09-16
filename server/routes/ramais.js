const express = require('express');
const router = express.Router();

const connection = require('../db/db');

router.get('/api/buscarRamais', (req, res) => {
    const query = connection.query(`SELECT r.id, r.ramal, r.nome, r.telefone, s.nome as setor FROM ramal r INNER JOIN setor s ON s.id = r.setor_id WHERE s.local_id = ?`, [1], (err, result) => {
        if (err) {
            throw err;
        }

        res.json(result);
    });
});

router.post('/api/buscarRamal', (req, res) => {
    const idRamal = req.body.idRamal;

    const query = connection.query(`SELECT r.id, r.data_criacao, r.ramal, r.nome as nome_pessoa, r.telefone, s.id as setor_id, s.nome as nome_setor  FROM ramal r INNER JOIN setor s ON r.setor_id = s.id WHERE r.id = ?`, [idRamal], (err, result) => {
        if (err) {
            throw err;
        }

        res.json(result);
    });
});

router.post('/api/pesquisar', (req, res) => {
    const pesquisa = req.body.pesquisar;

    const query = connection.query(`SELECT r.ramal, r.nome, r.telefone, s.nome as setor FROM ramal r INNER JOIN setor s ON r.setor_id = s.id WHERE r.nome LIKE '%` + pesquisa + `%' OR s.nome LIKE '%` + pesquisa + `%'`, (err, result) => {
        if (err) {
            throw err;
        }

        res.json(result);
    });
});

router.post('/api/salvarRamal', (req, res) => {
    const numeroRamal = req.body.numeroRamal;
    const idSetor = req.body.idSetor;
    const idRamal = req.body.idRamal;
    const nomePessoa = req.body.nomePessoa;
    const numeroTelefone = req.body.numeroTelefone;
    //acao: 1- salvar / 2 - atualizar
    const acao = req.body.acao;

    if (acao === 1) {
        const query = connection.query(`INSERT INTO ramal(ramal, setor_id, nome, telefone) VALUES(?, ?, ?, ?)`, [numeroRamal, idSetor, nomePessoa, numeroTelefone], (err, result) => {
            if (err) {
                return res.status(500).send({ error: err });
                // throw err;
            }

            if (result.affectedRows >= 1) {
                return res.status(200).send({ response: result });
            }
        });
    } else if (acao === 2) {
        const query = connection.query(`UPDATE ramal SET nome = ?, ramal = ?, telefone = ?, setor_id = ? WHERE id = ?`, [nomePessoa, numeroRamal, numeroTelefone, idSetor, idRamal], (err, result) => {
            if (err) {
                return res.status(500).send({ error: err });
                // throw err;
            }

            if (result.affectedRows >= 1) {
                return res.status(200).send({ response: result });
            }
        });
    } else {
        res.json('acao não informada!');
    }

    // IMPRIME O SQL QUE ESTÁ SENDO FEITO
    // res.json(query.sql); 
});

router.post('/api/excluirRamal', (req, res) => {
    const idRamal = req.body.idRamal;

    const sql = connection.query(`DELETE FROM ramal WHERE id = ? `, [idRamal], (err, result) => {
        if (err) {
            return res.status(500).send({ error: err });
        }

        return res.status(200).send({ response: "Excluído com sucesso!", excluido: true });
    });

});

module.exports = router;