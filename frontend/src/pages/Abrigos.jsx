import { useEffect, useState } from "react";
import api from "../api/api";
import AbrigoCard from "../components/AbrigoCard";

export default function Abrigos() {
  const [abrigos, setAbrigos] = useState([]);

  useEffect(() => {
    async function carregar() {
      try {
        const res = await api.get("/abrigos");
        console.log(res.data);
        setAbrigos(res.data);
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar abrigos");
      }
    }

    carregar();
  }, []);

  return (
    <div>
      <h1>Abrigos</h1>

      {abrigos.length === 0 && <p>Nenhum abrigo encontrado</p>}

      {abrigos.map((a) => (
        <AbrigoCard key={a.id} abrigo={a} />
      ))}
    </div>
  );
}