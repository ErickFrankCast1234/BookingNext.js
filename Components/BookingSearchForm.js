"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BookingSearchForm() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [showDestinos, setShowDestinos] = useState(false);
  const [showGuests, setShowGuests] = useState(false);

  const destinos = [
    "Acapulco, México",
    "Cancún, México",
    "Tepoztlán, México",
    "Cuernavaca, México",
    "Playa del Carmen, México",
  ];




  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams({
      destino: destination,
      fechaEntrada: checkIn || "2025-04-15",
      fechaSalida: checkOut || "2025-04-20",
      adultos: adults,
      ninos: children,
      habitaciones: rooms,
    });
    router.push(`/resultados?${params.toString()}`);
  };

  return (
    <>

      <style jsx global>{`
      html,
      body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        overflow-x: hidden;
      }

.search-form-wrapper {
  width: 100%;
  max-width: 1200px;
  background-color: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  border: 2px solid #FFD700;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: space-between;
  box-sizing: border-box;
}

@media (max-width: 300px) {
  .search-form-wrapper {
    flex-direction: column !important;
    padding: 1rem;
    max-width: 100% !important;
    width: 100% !important;
    box-sizing: border-box;
  }

  .search-form-wrapper input,
  .search-form-wrapper button,
  .search-form-wrapper label {
    width: 100% !important;
    margin-bottom: 0.5rem;
    min-width: 0 !important; /* <-- esto es clave para evitar que el input se estire más de lo debido */
  }

  .search-form-wrapper .dropdown-content {
    position: static !important;
    border: 1px solid #ccc;
  }

  .search-form-wrapper .dropdown-content .btn {
    width: 100%;
  }
}


    `}</style>


      <div style={{
        height: "500px",
        width: "100vw",
        backgroundImage: "url('/image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "clamp(1rem, 10vh, 2rem)"
      }}>
        <div style={{ width: "100%", textAlign: "center", marginTop: "clamp(1rem, 6vh, 2rem)" }}>
          <h1 style={{
            color: "white",
            fontSize: "clamp(1.5rem, 6vw, 3rem)",
            fontWeight: "bold",
            textShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
            marginBottom: "clamp(0.5rem, 2vh, 1rem)" // ⬅️ reducido
          }}>
            "Vive el sueño en una casa vacacional"
          </h1>
        </div>

        <div style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "0 1rem",
          marginTop: "40px" // ⬅️ elimina este margen innecesario
        }}>


          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              maxWidth: "1200px",
              backgroundColor: "white",
              padding: "1rem",
              borderRadius: "10px",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
              border: "2px solid #FFD700",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              justifyContent: "space-between",
            }}
          >

            {/* Destino */}
            <div style={{ flex: "1 1 18%", position: "relative" }}>
              <input
                type="text"
                placeholder="¿A dónde vas?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onFocus={() => setShowDestinos(true)}
                onBlur={() => setTimeout(() => setShowDestinos(false), 100)}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  color: "#000", // 👈 contenido del input
                  backgroundColor: "#fff", // por si acaso
                }}
              />
              {showDestinos && (
                <ul style={{
                  position: "absolute",
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  width: "100%",
                  marginTop: "4px",
                  zIndex: 10,
                }}>
                  {destinos.map((d, i) => (
                    <li
                      key={i}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setDestination(d);
                        setShowDestinos(false);
                      }}
                      style={{
                        padding: "0.5rem",
                        cursor: "pointer",
                        borderBottom: "1px solid #eee",
                        color: "#000", // 👈 contenido del input
                        backgroundColor: "#fff", // por si acaso
                      }}
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Fechas */}
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              style={{ flex: "1 1 16%", padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc", color: "#000", backgroundColor: "#fff", }}
            />

            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              style={{ flex: "1 1 16%", padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc", color: "#000", backgroundColor: "#fff", }}
            />

            {/* Guests */}
            <div style={{ flex: "1 1 22%", position: "relative" }}>
              <button
                type="button"
                onClick={() => setShowGuests(!showGuests)}
                style={{ width: "100%", padding: "0.5rem", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#f9f9f9", textAlign: "left", color: "#333" }}
              >
                {adults} adultos • {children} niños • {rooms} habitación
              </button>

              {showGuests && (
                <div style={{
                  position: "absolute",
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "1rem",
                  width: "100%",
                  marginTop: "4px",
                  zIndex: 10,
                  color: "#000", // 👈 esto fuerza texto negro en todo el bloque
                }}>
                  {[["Adultos", adults, setAdults, 1], ["Niños", children, setChildren, 0], ["Habitaciones", rooms, setRooms, 1]].map(
                    ([label, value, setter, min], i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                        <span>{label}</span>
                        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                          <button type="button" onClick={() => setter(Math.max(min, value - 1))}>-</button>
                          <span>{value}</span>
                          <button type="button" onClick={() => setter(value + 1)}>+</button>
                        </div>
                      </div>
                    )
                  )}
                  <button
                    type="button"
                    onClick={() => setShowGuests(false)}
                    style={{ width: "100%", padding: "0.5rem", borderRadius: "5px", backgroundColor: "#eee" }}
                  >
                    OK
                  </button>
                </div>
              )}
            </div>

            {/* Botón buscar */}
            <button
              type="submit"
              style={{
                flex: "1 1 18%",
                padding: "0.5rem",
                borderRadius: "5px",
                backgroundColor: "#4F46E5",
                color: "white",
                border: "none",
                fontWeight: "bold",
              }}
            >
              Buscar
            </button>
          </form>
        </div>
      </div>

    </>
  );
}
