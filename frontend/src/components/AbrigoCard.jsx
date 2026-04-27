export default function AbrigoCard({ abrigo }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
      <strong>{abrigo.nome}</strong>
      <p>
        {abrigo.cidade} / {abrigo.estado}
      </p>
      <p>
        {abrigo.ocupacao_atual} / {abrigo.capacidade_total}
      </p>
    </div>
  );
}