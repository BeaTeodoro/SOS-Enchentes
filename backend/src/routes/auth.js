const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "segredo";

router.post("/register", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).send("Email e senha obrigatórios");
    }

    const hash = await bcrypt.hash(senha, 10);

    await db.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1,$2,$3)",
      [nome, email, hash]
    );

    return res.status(201).send("Usuário criado");

  }
  catch (err) {
    console.error(err);

    if (err.code === "23505") {
      return res.status(409).send("Email já cadastrado");
    }

    return res.status(500).send("Erro ao registrar");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).send("Email e senha obrigatórios");
    }

    const result = await db.query(
      "SELECT * FROM usuarios WHERE email=$1",
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).send("Usuário não encontrado");
    }

    const valid = await bcrypt.compare(senha, user.senha);

    if (!valid) {
      return res.status(401).send("Senha inválida");
    }

    const token = jwt.sign({ id: user.id }, SECRET);

    return res.json({ token });

  } catch (err) {
    console.error(err);
    return res.status(500).send("Erro no login");
  }
});

module.exports = router;