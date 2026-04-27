const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


app.use("/auth", require("./routes/auth"));
app.use("/abrigos", require("./routes/abrigos"));
app.use("/pessoas", require("./routes/pessoas"));
app.use("/animais", require("./routes/animais"));
app.use("/voluntarios", require("./routes/voluntarios"));
app.use("/doacoes", require("./routes/doacoes"));

app.get("/", (req, res) => {
  res.send("API SOS Enchentes rodando");
});

app.use((req, res) => {
  res.status(404).send("Rota não encontrada");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Erro interno do servidor");
});

app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});