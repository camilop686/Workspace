export function Header({ titulo, grupo }) {
  return (
    <header className="header-main">
      <h1>{titulo}</h1>
      <p>Gradito: {grupo} - Fache de achalichis</p>
    </header>
  );
}