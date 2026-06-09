import { useState } from 'react';

// ============================================================
//  🛠️ COMPONENTE COMPLETADO — TAREA ESTUDIANTE
//  Contact.jsx
// ============================================================

function Contact() {
  // RETO ADICIONAL: Estado para manejar los campos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    servicio: '',
    mensaje: ''
  });

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manejador del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.nombre || !formData.email || !formData.servicio) {
      alert('Por favor, rellena los campos obligatorios (*).');
      return;
    }

    // Alerta de éxito con los datos ingresados
    alert(`¡Gracias por escribirnos, ${formData.nombre}! \nHemos recibido tu solicitud para el servicio de "${formData.servicio}". Nos comunicaremos contigo pronto.`);
    
    // Limpiar el formulario después del envío
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      servicio: '',
      mensaje: ''
    });
  };

  return (
    <section id="contacto" className="py-5 bg-dark text-white">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="section-titulo text-white">Contáctenos</h2>
          <p className="text-light opacity-75">
            ¿Tienes un proyecto en mente o una avería urgente? Déjanos tus datos y un especialista te atenderá de inmediato.
          </p>
        </div>

        <div className="row g-5">

          {/* Columna izquierda: información de contacto */}
          <div className="col-lg-4">
            <h4 className="mb-4 text-warning">Información de contacto</h4>
            <ul className="list-unstyled lh-lg">
              <li className="mb-3">
                <span className="fs-4 me-2">📍</span> 
                <strong>Dirección:</strong> Av. Eléctrica 456, Lima, Perú
              </li>
              <li className="mb-3">
                <span className="fs-4 me-2">📞</span> 
                <strong>Teléfono:</strong> +51 987 654 321
              </li>
              <li className="mb-3">
                <span className="fs-4 me-2">📧</span> 
                <strong>Email:</strong> contacto@volttec.com
              </li>
              <li className="mb-3">
                <span className="fs-4 me-2">🕐</span> 
                <strong>Horario:</strong> Lun - Vie: 8:00 AM - 6:00 PM / Sáb: 9:00 AM - 1:00 PM (Soporte de emergencias 24/7)
              </li>
            </ul>
          </div>

          {/* Columna derecha: formulario */}
          <div className="col-lg-8">
            <div className="bg-white text-dark rounded-3 p-4 shadow">
              
              {/* Envolvemos los campos en una etiqueta <form> para interceptar el envío */}
              <form onSubmit={handleSubmit} className="row g-3">

                {/* Campo: Nombre */}
                <div className="col-md-6">
                  <label htmlFor="nombre" className="form-label fw-bold">Nombre Completo *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="nombre" 
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ej. Juan Pérez" 
                    required 
                  />
                </div>

                {/* Campo: Email */}
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label fw-bold">Correo Electrónico *</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="juan@correo.com" 
                    required 
                  />
                </div>

                {/* Campo: Teléfono */}
                <div className="col-md-6">
                  <label htmlFor="telefono" className="form-label fw-bold">Teléfono / Celular</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    id="telefono" 
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="Ej. 987654321" 
                  />
                </div>

                {/* Campo: Tipo de servicio */}
                <div className="col-md-6">
                  <label htmlFor="servicio" className="form-label fw-bold">Servicio Requerido *</label>
                  <select 
                    className="form-select" 
                    id="servicio" 
                    name="servicio"
                    value={formData.servicio}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Selecciona una opción...</option>
                    <option value="Instalaciones Residenciales">Instalaciones Residenciales</option>
                    <option value="Mantenimiento Comercial">Mantenimiento Comercial</option>
                    <option value="Reparación de Averías">Reparación de Averías</option>
                    <option value="Iluminación LED">Iluminación LED</option>
                    <option value="Estudios de Ahorro Energético">Estudios de Ahorro Energético</option>
                    <option value="Pozos a Tierra">Pozos a Tierra</option>
                  </select>
                </div>

                {/* Campo: Mensaje */}
                <div className="col-12">
                  <label htmlFor="mensaje" className="form-label fw-bold">Detalle de su solicitud o mensaje</label>
                  <textarea 
                    className="form-control" 
                    id="mensaje" 
                    name="mensaje"
                    rows="4" 
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Cuéntanos más sobre lo que necesitas..."
                  ></textarea>
                </div>

                {/* Botón enviar */}
                <div className="col-12 text-end">
                  <button type="submit" className="btn btn-warning px-4 fw-bold">
                    Enviar Mensaje
                  </button>
                </div>

              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;