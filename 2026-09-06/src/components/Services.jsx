
// ============================================================
//  🛠️ COMPONENTE COMPLETADO — TAREA ESTUDIANTE
//  Services.jsx
// ============================================================

// 🛠️ PASO 1: Define aquí tu array de servicios
const servicios = [
  {
    icono: '⚡',
    titulo: 'Instalaciones Residenciales',
    descripcion: 'Diseño e instalación de sistemas eléctricos completos para hogares, garantizando seguridad y normativa.',
  },
  {
    icono: '🏢',
    titulo: 'Mantenimiento Comercial',
    descripcion: 'Soporte técnico preventivo y correctivo para oficinas, locales comerciales y empresas.',
  },
  {
    icono: '🛠️',
    titulo: 'Reparación de Averías',
    descripcion: 'Atención rápida para solucionar cortocircuitos, apagones y fallos eléctricos inesperados.',
  },
  {
    icono: '💡',
    titulo: 'Iluminación LED',
    descripcion: 'Proyectos de optimización energética y cambio a luminarias LED de alta eficiencia.',
  },
  {
    icono: '📉',
    titulo: 'Estudios de Ahorro',
    descripcion: 'Análisis de consumo para ayudarte a reducir el costo de tu factura de energía eléctrica.',
  },
  {
    icono: '🛡️',
    titulo: 'Pozos a Tierra',
    descripcion: 'Instalación y mantenimiento de sistemas de puesta a tierra para proteger tus equipos y familia.',
  },
];

function Services() {
  return (
    <section id="servicios" className="py-5 bg-light">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="section-titulo">Nuestros Servicios</h2>
          <p className="section-subtitulo text-muted">
            {/* 🛠️ TODO: Escribe una descripción corta de la sección */}
            Ofrecemos soluciones eléctricas integrales con los más altos estándares de calidad y seguridad.
          </p>
        </div>

        {/* 🛠️ PASO 2: Renderiza las tarjetas con servicios.map(...) */}
        <div className="row g-4">

          {/* TODO: Tu código .map() va aquí */}
          {servicios.map((servicio, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center p-4">
                  <div className="fs-1 mb-3">{servicio.icono}</div>
                  <h3 className="card-title h5 mb-3">{servicio.titulo}</h3>
                  <p className="card-text text-muted">{servicio.descripcion}</p>
                </div>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Services;