const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT an.*, a.nome AS abrigo
      FROM animais an
      LEFT JOIN abrigos a ON an.abrigo_id = a.id
      ORDER BY an.id DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar animais");
  }
});

router.post("/", async (req, res) => {
  try {
    const { nome, especie, status, descricao, abrigo_id } = req.body;

    if (!nome || !especie || !abrigo_id) {
      return res.status(400).send("Nome, espécie e abrigo são obrigatórios");
    }

    await db.query(
      "INSERT INTO animais (nome, especie, status, descricao, abrigo_id) VALUES ($1,$2,$3,$4,$5)",
      [nome, especie, status, descricao, abrigo_id]
    );

    res.status(201).send("Animal cadastrado");

  } catch (err) {
    console.error(err);

    if (err.code === "23503") {
      return res.status(400).send("Abrigo inválido");
    }

    res.status(500).send("Erro ao cadastrar animal");
  }
});

module.exports = router;