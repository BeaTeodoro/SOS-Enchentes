const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Token não enviado");
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Formato inválido");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    console.error("Erro no token:", err.message);
    return res.status(403).send("Token inválido");
  }
};