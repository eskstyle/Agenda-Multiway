const express = require('express');
const router = express.Router();

const connection = require('../db/db');

router.post('/api/buscarRamais', (req, res) => {
    const cidadeId = req.body.cidadeId;

    if (cidadeId > 0) {
        const query = connection.query(`SELECT r.id, r.ramal, r.nome, r.telefone, s.nome as setor, c.nome as nome_cidade FROM ramal r INNER JOIN setor s ON s.id = r.setor_id INNER JOIN cidade c ON c.id = s.cidade_id WHERE s.cidade_id = ?`, [cidadeId], (err, result) => {
            if (err) {
                throw err;
            }

            res.json(result);
        });
    } else {
        const query = connection.query(`SELECT r.id, r.ramal, r.nome, r.telefone, s.nome as setor, c.nome as nome_cidade FROM ramal r INNER JOIN setor s ON s.id = r.setor_id INNER JOIN cidade c ON c.id = s.cidade_id`, (err, result) => {
            if (err) {
                throw err;
            }

            res.json(result);
        });
    }

});

router.post('/api/buscarRamal', (req, res) => {
    const ramalId = req.body.ramalId;

    const query = connection.query(`SELECT r.id, r.data_criacao, r.ramal, r.nome as nome_pessoa, r.telefone, s.id as setor_id, s.nome as nome_setor, c.id as cidade_id, c.nome as nome_cidade  FROM ramal r INNER JOIN setor s ON r.setor_id = s.id INNER JOIN cidade c ON c.id = s.cidade_id WHERE r.id = ?
    `, [ramalId], (err, result) => {
        if (err) {
            throw err;
        }

        res.json(result);
    });
});

router.post('/api/pesquisar', (req, res) => {
    const pesquisa = req.body.pesquisar;
    const cidadeId = req.body.cidadeId;

    if (cidadeId <= 0) {
        const query = connection.query(`SELECT r.ramal, r.nome, r.telefone, s.nome as setor, c.nome as nome_cidade FROM ramal r INNER JOIN setor s ON r.setor_id = s.id INNER JOIN cidade c ON s.cidade_id = c.id WHERE r.nome LIKE '%` + pesquisa + `%' OR s.nome LIKE '%` + pesquisa + `%'`, (err, result) => {
            if (err) {
                throw err;
            }

            res.json(result);
        });
    } else {
        const query = connection.query(`SELECT r.ramal, r.nome, r.telefone, s.nome as setor, c.nome as nome_cidade FROM ramal r INNER JOIN setor s ON r.setor_id = s.id INNER JOIN cidade c ON s.cidade_id = c.id WHERE (r.nome LIKE '%` + pesquisa + `%' OR s.nome LIKE '%` + pesquisa + `%') and s.cidade_id = ?`, [cidadeId], (err, result) => {
            if (err) {
                throw err;
            }

            res.json(result);
        });
    }
});

router.post('/api/salvarRamal', (req, res) => {
    const numeroRamal = req.body.numeroRamal;
    const setorId = req.body.setorId;
    const ramalId = req.body.ramalId;
    const nomePessoa = req.body.nomePessoa;
    const numeroTelefone = req.body.numeroTelefone;
    //acao: 1- salvar / 2 - atualizar
    const acao = req.body.acao;

    if (acao === 1) {
        const query = connection.query(`INSERT INTO ramal(ramal, setor_id, nome, telefone) VALUES(?, ?, ?, ?)`, [numeroRamal, setorId, nomePessoa, numeroTelefone], (err, result) => {
            if (err) {
                return res.status(500).send({ error: err });
                // throw err;
            }

            if (result.affectedRows >= 1) {
                return res.status(200).send({ response: result });
            }
        });
    } else if (acao === 2) {
        const query = connection.query(`UPDATE ramal SET nome = ?, ramal = ?, telefone = ?, setor_id = ? WHERE id = ?`, [nomePessoa, numeroRamal, numeroTelefone, setorId, ramalId], (err, result) => {
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
    const ramalId = req.body.ramalId;

    const sql = connection.query(`DELETE FROM ramal WHERE id = ? `, [ramalId], (err, result) => {
        if (err) {
            return res.status(500).send({ error: err });
        }

        return res.status(200).send({ response: "Excluído com sucesso!", excluido: true });
    });

});

module.exports = router;