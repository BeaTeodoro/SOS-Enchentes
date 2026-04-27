const express = require("express");
const router = express.Router();
const db = require("../config/db");

const STATUS_VALIDOS = ["desaparecida", "encontrada"];

router.get("/", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT p.*, a.nome AS abrigo
      FROM pessoas p
      LEFT JOIN abrigos a ON p.abrigo_id = a.id
      ORDER BY p.id DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar pessoas");
  }
});

router.post("/", async (req, res) => {
  try {
    const { nome, status, descricao, abrigo_id } = req.body;

    if (!nome || !status || !abrigo_id) {
      return res.status(400).send("Nome, status e abrigo são obrigatórios");
    }

    if (!STATUS_VALIDOS.includes(status)) {
      return res.status(400).send("Status inválido");
    }

    await db.query(
      "INSERT INTO pessoas (nome, status, descricao, abrigo_id) VALUES ($1,$2,$3,$4)",
      [nome, status, descricao, abrigo_id]
    );

    res.status(201).send("Pessoa cadastrada");

  } catch (err) {
    console.error(err);

    if (err.code === "23503") {
      return res.status(400).send("Abrigo inválido");
    }

    res.status(500).send("Erro ao cadastrar pessoa");
  }
});

module.exports = router;