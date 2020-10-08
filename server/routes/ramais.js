const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const connection = require('../db/db');

router.post('/api/buscarRamais', (req, res) => {
    const cidadeId = req.body.cidadeId;

    try {
        if (cidadeId > 0) {
            const query = connection.query(`SELECT r.id, r.ramal, r.nome, r.telefone, s.nome as setor, r.email, c.id as cidade_id, c.nome as nome_cidade FROM ramal r INNER JOIN setor s ON s.id = r.setor_id INNER JOIN cidade c ON c.id = s.cidade_id WHERE s.cidade_id = ? ORDER BY r.nome ASC`, [cidadeId], (err, result) => {
                if (err) {
                    throw err;
                }

                res.json(result);
            });
        } else {
            const query = connection.query(`SELECT r.id, r.ramal, r.nome, r.telefone, s.nome as setor, r.email, c.id as cidade_id, c.nome as nome_cidade FROM ramal r INNER JOIN setor s ON s.id = r.setor_id INNER JOIN cidade c ON c.id = s.cidade_id ORDER BY r.nome ASC`, (err, result) => {
                if (err) {
                    throw err;
                }

                res.json(result);
            });
        }
    } catch (err) {
        return res.status(500).json("Erro ao buscar os ramais");
    }

});

router.post('/api/buscarRamal', (req, res) => {
    const ramalId = req.body.ramalId;
    const token = req.headers['x-access-token'];

    if (!ramalId) {
        return res.status(406).json({ mensagem: 'ramalId não pode estar vazio!' });
    } else if (!token) {
        return res.status(401).json({ mensagem: 'Nenhum token de acesso foi passado' });
    }

    try {
        jwt.verify(token, process.env.SECRET);
    }
    catch (err) {
        return res.status(401).json(err);
    }

    try {
        const query = connection.query(`SELECT r.id, r.data_criacao, r.ramal, r.nome as nome_pessoa, r.telefone, r.email, s.id as setor_id, s.nome as nome_setor, c.id as cidade_id, c.nome as nome_cidade  FROM ramal r INNER JOIN setor s ON r.setor_id = s.id INNER JOIN cidade c ON c.id = s.cidade_id WHERE r.id = ?
    `, [ramalId], (err, result) => {
            if (err) {
                throw err;
            }

            return res.status(200).json(result);
        });
    } catch (err) {
        return res.status(500).json("Erro ao buscar o ramal");
    }
});

router.post('/api/salvarRamal', (req, res) => {
    const numeroRamal = req.body.numeroRamal;
    const setorId = req.body.setorId;
    const ramalId = req.body.ramalId;
    const nomePessoa = req.body.nomePessoa;
    const numeroTelefone = req.body.numeroTelefone;
    const email = req.body.email;
    //acao: 1- salvar / 2 - atualizar
    const acao = +req.body.acao;
    // const token = req.body.token;
    const token = req.headers['x-access-token'];

    if (!numeroRamal) {
        return res.status(406).json({ mensagem: 'numeroRamal não pode estar vazio!' });
    } else if (!setorId) {
        return res.status(406).json({ mensagem: 'setorId não pode estar vazio!' });
    } else if (!nomePessoa) {
        return res.status(406).json({ mensagem: 'nomePessoa não pode estar vazio!' });
    } else if (!numeroTelefone) {
        return res.status(406).json({ mensagem: 'numeroTelefone não pode estar vazio!' });
    } else if (!email) {
        return res.status(406).json({ mensagem: 'email não pode estar vazio!' });
    } else if (!acao) {
        return res.status(406).json({ mensagem: 'Acao não pode estar vazio!' });
    } else if (!token) {
        return res.status(401).json({ mensagem: 'Nenhum token de acesso foi passado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
    }
    catch (err) {
        return res.status(401).json(err);
    }

    try {
        if (acao === 1) {
            const query = connection.query(`INSERT INTO ramal(ramal, setor_id, nome, telefone, email) VALUES(?, ?, ?, ?, ?)`, [numeroRamal, setorId, nomePessoa, numeroTelefone, email], (err, result) => {
                if (err) {
                    return res.status(500).send({ error: err });
                    // throw err;
                }

                if (result.affectedRows >= 1) {
                    return res.status(200).send({ response: result });
                }
            });
        } else if (acao === 2) {
            const query = connection.query(`UPDATE ramal SET nome = ?, ramal = ?, telefone = ?, setor_id = ?, email = ? WHERE id = ?`, [nomePessoa, numeroRamal, numeroTelefone, setorId, email, ramalId], (err, result) => {
                if (err) {
                    return res.status(500).send({ error: err });
                    // throw err;
                }

                if (result.affectedRows >= 1) {
                    return res.status(200).send({ response: result });
                }
            });
        } else {
            return res.json('acao não informada!');
        }
    } catch (err) {
        return res.status(500).json({ mensagem: 'Erro ao salvar seus dados' });
    }
    // IMPRIME O SQL QUE ESTÁ SENDO FEITO
    // res.json(query.sql); 
});

router.post('/api/excluirRamal', (req, res) => {
    const ramalId = req.body.ramalId;
    const token = req.headers['x-access-token'];

    if (!ramalId) {
        return res.status(406).json({ mensagem: 'ramalId não pode estar vazio!' });
    } else if (!token) {
        return res.status(401).json({ mensagem: 'Nenhum token de acesso foi passado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
    }
    catch (err) {
        return res.status(401).json(err);
    }

    try {
        const sql = connection.query(`DELETE FROM ramal WHERE id = ? `, [ramalId], (err, result) => {
            if (err) {
                return res.status(500).send({ error: err });
            }

            if (result.affectedRows > 0) {
                return res.status(200).send({ response: "Excluído com sucesso!", excluido: true });
            } else {
                return res.status(500).json({ response: 'Usuário já excluido', excluido: false });
            }

        });
    } catch (err) {
        return res.status(500).json("Erro ao excluir o ramal");
    }
});

module.exports = router;