// ============================================================
//  🛠️ COMPONENTE COMPLETADO — TAREA ESTUDIANTE
//  WhyUs.jsx
// ============================================================

// 🛠️ PASO 1: Define tu array de razones
const razones = [
  { 
    icono: '🏆', 
    titulo: 'Experiencia Certificada', 
    descripcion: 'Más de 10 años en el sector eléctrico respaldan la calidad y seguridad de cada uno de nuestros proyectos.' 
  },
  { 
    icono: '⏰', 
    titulo: 'Atención 24/7', 
    descripcion: 'Sabemos que las emergencias no esperan. Estamos listos para ayudarte en cualquier momento del día o la noche.' 
  },
  { 
    icono: '💳', 
    titulo: 'Precios Transparentes', 
    descripcion: 'Ofrecemos presupuestos honestos y sin sorpresas ocultas. Calidad profesional al precio justo.' 
  },
  { 
    icono: '🔒', 
    titulo: 'Garantía por Escrito', 
    descripcion: 'Todos nuestros trabajos e instalaciones cuentan con un respaldo y garantía total para tu total tranquilidad.' 
  },
];

function WhyUs() {
  return (
    <section id="nosotros" className="py-5">
      <div className="container">
        <div className="row align-items-center g-5">

          {/* Columna izquierda: imagen */}
          <div className="col-lg-5">
            {/* 🛠️ TODO: Agrega <img> con className="img-fluid rounded shadow" */}
            <img 
              src="https://placehold.co/500x400/1a1e2e/f5c518?text=VoltTec" 
              alt="Equipo de VoltTec trabajando" 
              className="img-fluid rounded shadow" 
            />
          </div>

          {/* Columna derecha: texto y razones */}
          <div className="col-lg-7">
            <h2 className="section-titulo mb-3">¿Por qué elegirnos?</h2>

            {/* 🛠️ TODO: Escribe 2-3 párrafos sobre la empresa */}
            <p className="text-muted">
              En **VoltTec**, somos un equipo de ingenieros y técnicos electricistas apasionados por ofrecer soluciones energéticas eficientes y seguras. Nos especializamos en transformar espacios residenciales y comerciales mediante instalaciones modernas que cumplen con las normativas vigentes más estrictas.
            </p>
            <p className="text-muted mb-4">
              Nuestra prioridad número uno es la satisfacción del cliente y la prevención de riesgos. Por ello, utilizamos materiales de primera calidad y herramientas de última tecnología para asegurar que tu hogar o negocio funcione a la perfección y sin interrupciones.
            </p>

            {/* 🛠️ PASO 2: Renderiza las razones con .map() */}
            <ul className="list-unstyled">
              {/* TODO: razones.map(...) */}
              {razones.map((razon, index) => (
                <li key={index} className="d-flex align-items-start mb-3">
                  <div className="fs-3 me-3">{razon.icono}</div>
                  <div>
                    <h4 className="h6 mb-1 fw-bold">{razon.titulo}</h4>
                    <p className="text-muted mb-0">{razon.descripcion}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

export default WhyUs;