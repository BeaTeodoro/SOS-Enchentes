const express = require("express");
const router = express.Router();
const db = require("../config/db");

function telefoneValido(telefone) {
  return typeof telefone === "string" && telefone.length >= 8;
}

router.get("/", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT v.*, a.nome AS abrigo
      FROM voluntarios v
      LEFT JOIN abrigos a ON v.abrigo_id = a.id
      ORDER BY v.id DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar voluntários");
  }
});

router.post("/", async (req, res) => {
  try {
    const { nome, telefone, habilidade, abrigo_id } = req.body;

    if (!nome || !telefone || !abrigo_id) {
      return res.status(400).send("Nome, telefone e abrigo são obrigatórios");
    }

    if (!telefoneValido(telefone)) {
      return res.status(400).send("Telefone inválido");
    }

    await db.query(
      "INSERT INTO voluntarios (nome, telefone, habilidade, abrigo_id) VALUES ($1,$2,$3,$4)",
      [nome, telefone, habilidade, abrigo_id]
    );

    res.status(201).send("Voluntário cadastrado");

  } catch (err) {
    console.error(err);

    if (err.code === "23503") {
      return res.status(400).send("Abrigo inválido");
    }

    res.status(500).send("Erro ao cadastrar voluntário");
  }
});

module.exports = router;