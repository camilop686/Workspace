import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [mostrarReloj, setMostrarReloj] = useState(true);
  const [usuarioId, setUsuarioId] = useState(1);

  return (
    <div className="app">
      <h1>useEffect y Ciclo de Vida</h1>

      <section>
        <h2>1. Reloj</h2>
        <button onClick={() => setMostrarReloj(!mostrarReloj)}>
          {mostrarReloj ? 'Ocultar reloj' : 'Mostrar reloj'}
        </button>
        {mostrarReloj && <Reloj />}
      </section>

      <section>
        <h2>2. Contador automático</h2>
        <ContadorAutomatico />
      </section>

      <section>
        <h2>3. Ancho de ventana</h2>
        <RastreadorVentana />
      </section>

      <section>
        <h2>4. Perfil de usuario</h2>
        <div className="botones-usuario">
          <button onClick={() => setUsuarioId(1)}>Usuario 1</button>
          <button onClick={() => setUsuarioId(2)}>Usuario 2</button>
        </div>
        <PerfilUsuario id={usuarioId} />
      </section>

      <section>
        <h2>5. Experimento: fases del ciclo de vida</h2>
        <ExperimentoFases />
      </section>
    </div>
  );
}

function Reloj() {
  const [segundos, setSegundos] = useState(0);

  // 🐛 BUG 1 — Este efecto arranca un setInterval pero nunca lo limpia.
  // Cuando el componente se desmonta (al ocultar el reloj), el intervalo
  // sigue corriendo en segundo plano. Abran la consola, oculten el reloj
  // con el botón, y fíjense si los logs de "tick" siguen apareciendo.
  useEffect(() => {
    console.log('⏰ Reloj montado');
    const id = setInterval(() => {
      setSegundos((s) => {
        console.log('tick, segundos:', s + 1);
        return s + 1;
      });
    }, 1000);
    // Falta el cleanup acá: return () => clearInterval(id);
    return () => clearInterval(id);
  }, []);

  return <p>Segundos: {segundos}</p>;
}

function ContadorAutomatico() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      // 🐛 BUG 2 — 'contador' quedó "congelado" en el valor que tenía
      // cuando el efecto se creó (stale closure), porque el arreglo de
      // dependencias está vacío pero acá adentro se lee 'contador'
      // directamente en vez de usar la forma funcional de setState.
      console.log('El contador según el efecto es:', contador);
      setContador((c) => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <p>Contador: {contador}</p>;
}

function RastreadorVentana() {
  const [ancho, setAncho] = useState(window.innerWidth);

  useEffect(() => {
    function manejarResize() {
      console.log('Resize detectado, ancho:', window.innerWidth);
      setAncho(window.innerWidth);
    }

    window.addEventListener('resize', manejarResize);

    return () => window.removeEventListener('resize', manejarResize);
  }, [ancho]);

  return <p>Ancho actual: {ancho}px</p>;
}

function PerfilUsuario({ id }) {
  const [nombre, setNombre] = useState('');

  // 🐛 BUG 4 — El efecto usa 'id' pero no lo incluye en el arreglo de
  // dependencias. Por eso, aunque cambien de usuario con los botones,
  // el efecto no se vuelve a ejecutar y el nombre no se actualiza.
  useEffect(() => {
    console.log('Buscando datos del usuario', id);
    const nombres = { 1: 'Ana', 2: 'Luis' };
    setNombre(nombres[id]);
 }, [id]);

  return <p>Nombre: {nombre}</p>;
}

function ExperimentoFases() {
  const [clics, setClics] = useState(0);
  const esPrimeraVez = useRef(true);

  // Este componente no tiene ningún bug: es para experimentar cambiando
  // el arreglo de dependencias (ver Parte 4 de la guía) y observar
  // cuándo se ejecuta cada log.
  useEffect(() => {
    if (esPrimeraVez.current) {
      console.log('🟢 MONTADO');
      esPrimeraVez.current = false;
    } else {
      console.log('🔵 ACTUALIZADO, clics:', clics);
    }

    return () => {
      console.log('🔴 LIMPIEZA (antes del próximo efecto, o al desmontar)');
    };
  }, [clics]);

  return (
    <div>
      <p>Clics: {clics}</p>
      <button onClick={() => setClics(clics + 1)}>Clickeame</button>
    </div>
  );
}

export default App;