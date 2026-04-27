const express = require("express");
const router = express.Router();
const db = require("../config/db");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        a.id,
        a.nome,
        a.capacidade_total,
        a.ocupacao_atual,
        l.cidade,
        l.estado
      FROM abrigos a
      LEFT JOIN localizacoes l ON a.localizacao_id = l.id
      ORDER BY a.id DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar abrigos");
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { nome, capacidade_total = 0, ocupacao_atual = 0, localizacao_id } = req.body;

    if (!nome || !localizacao_id) {
      return res.status(400).send("Nome e localização são obrigatórios");
    }

    await db.query(
      "INSERT INTO abrigos (nome, capacidade_total, ocupacao_atual, localizacao_id) VALUES ($1,$2,$3,$4)",
      [nome, capacidade_total, ocupacao_atual, localizacao_id]
    );

    res.status(201).send("Abrigo criado");

  } catch (err) {
    console.error(err);

    if (err.code === "23505") {
      return res.status(409).send("Abrigo já existe");
    }

    if (err.code === "23503") {
      return res.status(400).send("Localização inválida");
    }

    res.status(500).send("Erro ao criar abrigo");
  }
});

module.exports = router;