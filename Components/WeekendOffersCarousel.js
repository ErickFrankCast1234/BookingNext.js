"use client";

import { useRef } from "react";

const formatoMXN = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

const WeekendOffersCarousel = () => {
  const ofertas = [
    {
      id: "680307cc06f61ea7a93af543",
      name: "La Quinta by Wyndham Puebla Palmas Angelópolis",
      image: "/la-quinta.png",
      location: "Puebla, México",
      rating: "8.6",
      reviews: "2,675 comentarios",
      price: 1200,
      oldPrice: 1500,
      nights: "2 noches",
    },
    {
      id: "68030cd406f61ea7a93af544",
      name: "Princess Mundo Imperial Riviera Diamante Acapulco",
      image: "/princess-mundo.png",
      location: "Acapulco, México",
      rating: "8.5",
      reviews: "1,627 comentarios",
      price: 4200,
      oldPrice: 5500,
      nights: "2 noches",
    },
    {
      id: "68030cd406f61ea7a93af545",
      name: "Hotel Stella Maris",
      image: "/stella-maris.png",
      location: "Ciudad de México, México",
      rating: "8.5",
      reviews: "414 comentarios",
      price: 1500,
      oldPrice: 1800,
      nights: "2 noches",
    },
    {
      id: "68030cd406f61ea7a93af546",
      name: "Grand Fiesta Americana Puebla Angelópolis",
      image: "/grand-fiesta.png",
      location: "Puebla, México",
      rating: "9.2",
      reviews: "633 comentarios",
      price: 3200,
      oldPrice: 4000,
      nights: "2 noches",
    },
  ];

  const carouselRef = useRef(null);

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300, // deslizar 300px a la derecha
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300, // deslizar 300px a la izquierda
        behavior: "smooth",
      });
    }
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#fff" }}>
      <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px", color: "#000" }}>
          Ofertas para el fin de semana
        </h2>
        <p style={{ color: "#444", marginBottom: "24px" }}>
          Ahorra en hospedaje para 4 abril - 6 abril
        </p>

        <div style={{ position: "relative" }}>
          {/* Botón izquierdo */}
          <button
            onClick={handlePrev}
            style={{
              position: "absolute",
              left: "8px",
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
              padding: "0 60px",
            }}
          >
            {ofertas.map((oferta, index) => (
              <div
                key={index}
                style={{
                  flex: "0 0 auto",
                  width: "260px", // ahora más ancha
                  minWidth: "260px", // forzamos ancho mínimo
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  backgroundColor: "#fff",
                  overflow: "hidden",
                }}
              >
                <img
                  src={oferta.image}
                  alt={oferta.name}
                  style={{ width: "100%", height: "140px", objectFit: "cover" }}
                />
                <div style={{ padding: "12px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "4px", color: "#000" }}>
                    {oferta.name}
                  </h3>
                  <p style={{ color: "#000", fontSize: "14px" }}>{oferta.location}</p>
                  <p style={{ color: "#1E90FF", fontWeight: "bold", fontSize: "14px" }}>{oferta.rating}</p>
                  <p style={{ color: "#555", fontSize: "14px" }}>{oferta.reviews}</p>
                  <p style={{ color: "#555", fontSize: "14px" }}>{oferta.nights}</p>
                  <p style={{ color: "#FF0000", textDecoration: "line-through", fontSize: "14px" }}>
                    {formatoMXN.format(oferta.oldPrice)}
                  </p>
                  <p style={{ color: "#008000", fontWeight: "bold", fontSize: "16px" }}>
                    {formatoMXN.format(oferta.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Botón derecho */}
          <button
            onClick={handleNext}
            style={{
              position: "absolute",
              right: "8px",
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

export default WeekendOffersCarousel;
