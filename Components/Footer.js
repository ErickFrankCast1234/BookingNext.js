"use client";
import { useState, useEffect } from "react";

// Hook para detectar tamaño de pantalla
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
};

// Componente para versión móvil
const FooterSection = ({ title, items }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #d1d5db", padding: "1rem 0" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          textAlign: "left",
          fontWeight: "bold",
          fontSize: "1rem",
          color: "#000",
          background: "none",
          border: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {title}
        <span>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <ul style={{ listStyle: "none", paddingLeft: "1rem", marginTop: "0.5rem", fontSize: "0.875rem", color: "#4b5563" }}>
          {items.map((item, idx) => (
            <li key={idx} style={{ marginBottom: "0.5rem" }}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Footer = () => {
  const isMobile = useIsMobile();

  const secciones = [
    {
      title: "Atención personal",
      items: [
        "Preguntas frecuentes sobre el coronavirus (COVID-19)",
        "Gestiona tus viajes",
        "Atención al cliente",
        "Centro de recursos sobre seguridad",
      ],
    },
    {
      title: "Descubre",
      items: [
        "Programa de lealtad Genius",
        "Ofertas de temporada y para las vacaciones",
        "Artículos de viajes",
        "Booking.com for Business",
        "Traveller Review Awards",
        "Renta de autos",
        "Buscador de vuelos",
        "Reservaciones en restaurantes",
        "Booking.com para Agentes de viaje",
      ],
    },
    {
      title: "Términos y ajustes",
      items: [
        "Privacidad y cookies",
        "Términos y condiciones",
        "Disputa de colaboradores",
        "Declaración sobre la esclavitud moderna",
        "Declaración sobre derechos humanos",
      ],
    },
    {
      title: "Colaboradores",
      items: ["Acceder a la extranet", "Ayuda para colaboradores", "Registra tu propiedad", "Conviértete en afiliado"],
    },
    {
      title: "Acerca de",
      items: [
        "Sobre Booking.com",
        "Cómo trabajamos",
        "Sustentabilidad",
        "Centro de prensa",
        "Trabaja con nosotros",
        "Relaciones con inversionistas",
        "Contacto corporativo",
      ],
    },
  ];

  return (
    <footer style={{ backgroundColor: "#f3f4f6", padding: "60px 20px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {isMobile ? (
          // Vista móvil: acordeones
          secciones.map((sec, i) => (
            <FooterSection key={i} title={sec.title} items={sec.items} />
          ))
        ) : (
          // Vista desktop: columnas
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "40px",
              color: "#4b5563",
            }}
          >
            {secciones.map((sec, i) => (
              <div key={i}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "1rem", color: "#000" }}>
                  {sec.title}
                </h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {sec.items.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: "0.5rem" }}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

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
