import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        senha,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/abrigos");

      localStorage.setItem("token", res.data.token);

    } catch (err) {
      console.error(err);
      alert("Erro no login");
    }
  }


  return (
    <div>
      <h1>LOGIN TESTE</h1>

      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}