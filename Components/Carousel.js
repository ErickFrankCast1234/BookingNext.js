"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const Carousel = () => {
  const router = useRouter();

  const destinos = [
    { name: "CDMX", image: "/CDMX.png", distance: "a 86 km", link: "/destinos/CDMX" },
    { name: "Puebla", image: "/puebla.png", distance: "a 114 km", link: "/destinos/puebla" },
    { name: "Morelia", image: "/morelia.png", distance: "a 239 km", link: "/destinos/morelia" },
    { name: "Querétaro", image: "/queretaro.png", distance: "a 248 km", link: "/destinos/queretaro" },
    { name: "San Miguel de Allende", image: "/sanmiguel.png", distance: "a 298 km", link: "/destinos/sanmiguel" },
    { name: "Oaxaca de Juárez", image: "/oaxaca.png", distance: "a 317 km", link: "/destinos/oaxaca" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % destinos.length;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? destinos.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const scrollToIndex = (index) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth / 3;
      carouselRef.current.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });
    }
  };

  const handleClick = (link) => {
    router.push(link);
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#fff" }}>
      <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px", color: "#000" }}>
          Un planificador de viajes fácil y rápido
        </h2>
        <p style={{ color: "#444", marginBottom: "24px" }}>
          Escoge un estilo y encuentra los mejores destinos en México
        </p>

        <div style={{ position: "relative" }}>
          {/* Botón izquierdo */}
          <button
            onClick={handlePrev}
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              cursor: "pointer",
              zIndex: 10,
            }}
          >
            &#9664;
          </button>

          {/* Carrusel */}
          <div
            ref={carouselRef}
            style={{
              display: "flex",
              gap: "16px",
              overflowX: "auto",
              scrollBehavior: "smooth",
              padding: "0 40px",
            }}
          >
            {destinos.map((destino, index) => (
              <div
                key={index}
                onClick={() => handleClick(destino.link)}
                style={{
                  flex: "0 0 auto",
                  width: "220px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  backgroundColor: "#fff",
                  overflow: "hidden",
                }}
              >
                <img
                  src={destino.image}
                  alt={destino.name}
                  style={{ width: "100%", height: "140px", objectFit: "cover" }}
                />
                <div style={{ padding: "12px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "4px", color: "#000" }}>
                    {destino.name}
                  </h3>
                  <p style={{ color: "#000", fontSize: "14px" }}>{destino.distance}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Botón derecho */}
          <button
            onClick={handleNext}
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              cursor: "pointer",
              zIndex: 10,
            }}
          >
            &#9654;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
