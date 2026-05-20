import { useState } from "react";
import api from "../api/api";

export default function AbrigoForm({ onCriado }) {
  const [nome, setNome] = useState("");
  const [localizacaoId, setLocalizacaoId] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    // 🔒 validação básica
    if (!nome || !localizacaoId) {
      alert("Preencha todos os campos");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      await api.post("/abrigos", {
        nome,
        localizacao_id: Number(localizacaoId),
      });

      setNome("");
      setLocalizacaoId("");

      onCriado();
    } catch (err) {
      const mensagem = err.response?.data || "Erro ao criar abrigo";
      alert(mensagem);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Novo Abrigo</h2>

      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        placeholder="ID da Localização"
        value={localizacaoId}
        onChange={(e) => setLocalizacaoId(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>
  );
}