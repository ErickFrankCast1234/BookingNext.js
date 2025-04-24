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
    <div
      className="relative flex items-center justify-center"
      style={{
        height: "500px",
        width: "100vw",
        backgroundImage: "url('/image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-1/3 w-full text-center">
        <h1 className="text-white text-4xl font-bold drop-shadow-lg">
          "Vive el sueño en una casa vacacional"
        </h1>
      </div>

      <div className="absolute bottom-10 w-full flex justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-6xl bg-white p-4 rounded-lg shadow-lg border-2 border-yellow-400"
        >
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">

            {/* Destino */}
            <div className="relative">
              <input
                type="text"
                placeholder="¿A dónde vas?"
                className="input input-bordered w-full text-black"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onFocus={() => setShowDestinos(true)}
                onBlur={() => setTimeout(() => setShowDestinos(false), 100)}
              />
              {showDestinos && (
                <ul className="absolute bg-white border rounded shadow z-10 w-full mt-1 text-black">
                  {destinos.map((d, i) => (
                    <li
                      key={i}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setDestination(d);
                        setShowDestinos(false);
                      }}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Fecha entrada */}
            <input
              type="date"
              className="input input-bordered w-full text-black"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />

            {/* Fecha salida */}
            <input
              type="date"
              className="input input-bordered w-full text-black"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />

            {/* Huespedes */}
            <div className="relative">
              <button
                type="button"
                className="btn w-full justify-between text-black"
                onClick={() => setShowGuests(!showGuests)}
              >
                {adults} adultos • {children} niños • {rooms} habitación
              </button>
              {showGuests && (
                <div className="absolute bg-white border rounded shadow p-4 w-full mt-1 z-10 text-black">
                  {[["Adultos", adults, setAdults, 1], ["Niños", children, setChildren, 0], ["Habitaciones", rooms, setRooms, 1]].map(
                    ([label, value, setter, min], i) => (
                      <div key={i} className="flex justify-between items-center mb-2">
                        <span>{label}</span>
                        <div className="flex gap-2">
                          <button type="button" onClick={() => setter(Math.max(min, value - 1))}>-</button>
                          <span>{value}</span>
                          <button type="button" onClick={() => setter(value + 1)}>+</button>
                        </div>
                      </div>
                    )
                  )}
                  <button
                    className="btn btn-sm w-full mt-2 text-black bg-gray-100 hover:bg-gray-200"
                    onClick={() => setShowGuests(false)}
                  >
                    OK
                  </button>
                </div>
              )}
            </div>

            {/* Buscar */}
            <button type="submit" className="btn btn-primary w-full">
              Buscar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
