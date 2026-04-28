export function EntidadCard({ nombreEntidad, descripcion, cantidadCampos }) {
  return (
    <div className="card">
      <h3>Entidadsita: {nombreEntidad}</h3>
      <p>{descripcion}</p>
      <span>Atributicos definiditos: {cantidadCampos}</span>
    </div>
  );
}