const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const connection = require('../db/db');

router.post('/api/buscarSetores', (req, res) => {
    const cidadeId = req.body.cidadeId;
    const token = req.headers['x-access-token'];

    if (cidadeId === '') {
        return res.status(406).json({ mensagem: 'cidadeId não pode estar vazio!' });
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
        if (cidadeId <= 0) {
            connection.query(`SELECT s.id, s.data_criacao, s.nome, c.nome as nome_cidade FROM setor s INNER JOIN cidade c ON s.cidade_id = c.id ORDER BY s.nome ASC`, (err, result) => {
                if (err) {
                    throw err;
                }

                return res.json(result);
            });
        } else {
            connection.query(`SELECT s.id, s.data_criacao, s.nome, c.nome as nome_cidade FROM setor s INNER JOIN cidade c ON s.cidade_id = c.id WHERE c.id = ? ORDER BY s.nome ASC`, [cidadeId], (err, result) => {
                if (err) {
                    throw err;
                }

                return res.json(result);
            });
        }
    } catch (err) {
        return res.status(500).json('Erro ao buscar os setores');
    }
});

router.post('/api/buscarSetor', (req, res) => {
    const setorId = req.body.setorId;
    const token = req.headers['x-access-token'];

    if (!setorId) {
        return res.status(406).json({ mensagem: 'setorId não pode estar vazio!' });
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
        connection.query(`SELECT * from setor WHERE id = ?;`, [setorId], (err, result) => {
            if (err) {
                throw err;
            }

            res.json(result);
        });
    } catch (err) {
        return res.status(500).json("Erro a obuscar o setor");
    }
});

router.post('/api/salvarSetor', (req, res) => {
    const nomeSetor = req.body.nomeSetor;
    const cidadeId = req.body.cidadeId;
    const token = req.headers['x-access-token'];

    if (!nomeSetor) {
        return res.status(406).json({ mensagem: 'nomeSetor não pode estar vazio!' });
    } else if (!cidadeId) {
        return res.status(406).json({ mensagem: 'cidadeId não pode estar vazio!' });
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
        const query = connection.query(`INSERT INTO setor(nome, cidade_id) VALUES(?, ?)`, [nomeSetor, cidadeId], (err, result) => {
            if (err) {
                return res.status(500).send({ error: err });
                // throw err;
            }

            if (result.affectedRows >= 1) {
                return res.status(200).send({ response: result });
            }
        });

    } catch (err) {
        res.status(500).json("Erro ao salvar o setor");
    }
    // res.json(query.sql); IMPRIME O SQL QUE ESTÁ SENDO FEITO
});

router.post('/api/atualizarSetor', (req, res) => {
    const nomeSetor = req.body.nomeSetor;
    const cidadeId = req.body.cidadeId;
    const setorId = req.body.setorId;
    const token = req.headers['x-access-token'];

    if (!nomeSetor) {
        return res.status(406).json({ mensagem: 'nomeSetor não pode estar vazio!' });
    } else if (!cidadeId) {
        return res.status(406).json({ mensagem: 'cidadeId não pode estar vazio!' });
    } else if (!setorId) {
        return res.status(406).json({ mensagem: 'setorId não pode estar vazio!' });
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
        const query = connection.query(`UPDATE setor SET nome = ?, cidade_id = ? WHERE id= ?`, [nomeSetor, cidadeId, setorId], (err, result) => {
            if (err) {
                return res.status(500).send({ error: err });
                // throw err;
            }

            return res.status(200).send({ response: result });

        });
    } catch (err) {
        return res.status(500).json('Erro ao atualizar o setor');
    }
});

//UM SETOR SÓ PODERÁ SER DELETADO SE NÃO HOUVER MAIS RAMAIS CADASTRADOS PARA ELE.
router.post('/api/excluirSetor', (req, res) => {
    const setorId = req.body.setorId;
    const token = req.headers['x-access-token'];

    if (!setorId) {
        return res.status(406).json({ mensagem: 'setorId não pode estar vazio!' });
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

                    if (result.affectedRows > 0) {
                        return res.status(200).send({ response: "Excluído com sucesso!", excluido: true });
                    } else {
                        return res.status(500).json({ response: "Setor já excluído!", excluido: false })
                    }

                });
            } else {
                return res.status(200).send({ response: 'Todos os ramais deste setor devem ser excluídos para prosseguir!', excluido: false });
            }

        });
    } catch (err) {
        return res.status(500).json("Erro ao excluir o setor");
    }
});

module.exports = router;
