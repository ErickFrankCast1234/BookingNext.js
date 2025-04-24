"use client";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#f3f4f6", padding: "60px 20px" }}>
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {/* Grid de columnas */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px",
            color: "#4b5563", // texto gris
          }}
        >
          {/* Columna 1 */}
          <div>
            <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "1rem", color: "#000" }}>
              Atención personal
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>Preguntas frecuentes sobre el coronavirus (COVID-19)</li>
              <li>Gestiona tus viajes</li>
              <li>Atención al cliente</li>
              <li>Centro de recursos sobre seguridad</li>
            </ul>
          </div>

          {/* Columna 2 */}
          <div>
            <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "1rem", color: "#000" }}>
              Descubre
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>Programa de lealtad Genius</li>
              <li>Ofertas de temporada y para las vacaciones</li>
              <li>Artículos de viajes</li>
              <li>Booking.com for Business</li>
              <li>Traveller Review Awards</li>
              <li>Renta de autos</li>
              <li>Buscador de vuelos</li>
              <li>Reservaciones en restaurantes</li>
              <li>Booking.com para Agentes de viaje</li>
            </ul>
          </div>

          {/* Columna 3 */}
          <div>
            <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "1rem", color: "#000" }}>
              Términos y ajustes
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>Privacidad y cookies</li>
              <li>Términos y condiciones</li>
              <li>Disputa de colaboradores</li>
              <li>Declaración sobre la esclavitud moderna</li>
              <li>Declaración sobre derechos humanos</li>
            </ul>
          </div>

          {/* Columna 4 */}
          <div>
            <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "1rem", color: "#000" }}>
              Colaboradores
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>Acceder a la extranet</li>
              <li>Ayuda para colaboradores</li>
              <li>Registra tu propiedad</li>
              <li>Conviértete en afiliado</li>
            </ul>
          </div>

          {/* Columna 5 */}
          <div>
            <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "1rem", color: "#000" }}>
              Acerca de
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>Sobre Booking.com</li>
              <li>Cómo trabajamos</li>
              <li>Sustentabilidad</li>
              <li>Centro de prensa</li>
              <li>Trabaja con nosotros</li>
              <li>Relaciones con inversionistas</li>
              <li>Contacto corporativo</li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div style={{ borderTop: "1px solid #d1d5db", margin: "60px 0" }}></div>

        {/* Info adicional */}
        <div style={{ textAlign: "center", color: "#4b5563" }}>
          <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "center", gap: "8px", alignItems: "center" }}>
            <span style={{ fontSize: "1.125rem" }}>🇲🇽</span>
            <span>COP</span>
          </div>
          <p style={{ fontSize: "0.875rem", marginBottom: "20px" }}>
            Booking.com forma parte de Booking Holdings Inc., líder mundial en viajes online y servicios relacionados.
          </p>

          {/* Logos */}
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
            <img src="/Roomio.png" alt="Booking.com" style={{ height: "24px" }} />
            <img src="/priceline-logo.png" alt="Priceline" style={{ height: "24px" }} />
            <img src="/kayak-logo.png" alt="Kayak" style={{ height: "24px" }} />
            <img src="/agoda-logo.png" alt="Agoda" style={{ height: "24px" }} />
            <img src="/opentable-logo.png" alt="OpenTable" style={{ height: "24px" }} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
