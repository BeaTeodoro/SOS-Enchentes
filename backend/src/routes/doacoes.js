const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT d.*, a.nome AS abrigo
      FROM doacoes d
      LEFT JOIN abrigos a ON d.abrigo_id = a.id
      ORDER BY d.id DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar doações");
  }
});

router.post("/", async (req, res) => {
  try {
    const { item, quantidade, abrigo_id } = req.body;

    if (!item || !quantidade || !abrigo_id) {
      return res.status(400).send("Item, quantidade e abrigo são obrigatórios");
    }

    if (quantidade <= 0) {
      return res.status(400).send("Quantidade deve ser maior que zero");
    }

    await db.query(
      "INSERT INTO doacoes (item, quantidade, abrigo_id) VALUES ($1,$2,$3)",
      [item, quantidade, abrigo_id]
    );

    res.status(201).send("Doação registrada");

  } catch (err) {
    console.error(err);

    if (err.code === "23503") {
      return res.status(400).send("Abrigo inválido");
    }

    res.status(500).send("Erro ao registrar doação");
  }
});

module.exports = router;