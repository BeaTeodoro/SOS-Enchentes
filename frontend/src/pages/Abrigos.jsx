import { useEffect, useState } from "react";
import api from "../api/api";

export default function AbrigoForm({ onCriado }) {
  const [nome, setNome] = useState("");
  const [localizacaoId, setLocalizacaoId] = useState("");
  const [localizacoes, setLocalizacoes] = useState([]);

  useEffect(() => {
    async function carregarLocalizacoes() {
      try {
        const res = await api.get("/localizacoes");
        setLocalizacoes(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    carregarLocalizacoes();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/abrigos", {
        nome,
        localizacao_id: Number(localizacaoId),
      });

      setNome("");
      setLocalizacaoId("");
      onCriado();
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Erro ao criar abrigo");
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

      <select
        value={localizacaoId}
        onChange={(e) => setLocalizacaoId(e.target.value)}
      >
        <option value="">Selecione uma localização</option>

        {localizacoes.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.cidade} - {loc.estado}
          </option>
        ))}
      </select>

      <button type="submit">Cadastrar</button>
    </form>
  );
}