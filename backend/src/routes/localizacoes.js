const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, cidade, estado FROM localizacoes ORDER BY cidade"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar localizações");
  }
});

module.exports = router;