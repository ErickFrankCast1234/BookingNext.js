"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPinIcon } from "@heroicons/react/24/outline";

export default function BookingSearchForm() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [showOptions, setShowOptions] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const destinations = [
    "Acapulco, México",
    "Cancún, México",
    "Tepoztlán, México",
    "Cuernavaca, México",
    "Playa del Carmen, México",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const defaultEntrada = "2025-04-15";
    const defaultSalida = "2025-04-20";

    const params = new URLSearchParams();
    params.append("destino", destination || "");
    params.append("fechaEntrada", checkIn || defaultEntrada);
    params.append("fechaSalida", checkOut || defaultSalida);
    params.append("adultos", adults);
    params.append("ninos", children);
    params.append("habitaciones", rooms);

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
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute top-1/3 w-full text-center">
        <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">
          &quot;Vive el sueño en una casa vacacional&quot;
        </h1>
      </div>

      <div className="absolute bottom-10 w-full flex justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-7xl bg-white p-4 rounded-lg shadow-lg border-2 border-yellow-400"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center">

            {/* DESTINO */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="¿A dónde vas?"
                className="input input-bordered w-full text-black"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onFocus={() => setShowOptions(true)}
                onBlur={() => setTimeout(() => setShowOptions(false), 200)}
              />
              {showOptions && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-lg w-full mt-1">
                  {destinations.map((d, i) => (
                    <li
                      key={i}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 text-black cursor-pointer"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setDestination(d);
                        setShowOptions(false);
                      }}
                    >
                      <MapPinIcon className="h-5 w-5 text-blue-500 mr-2" />
                      {d}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* FECHAS */}
            <input
              type="date"
              className="input input-bordered w-full text-black"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
            <input
              type="date"
              className="input input-bordered w-full text-black"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />

            {/* ADULTOS / NIÑOS / HABITACIONES */}
            <div className="relative w-full">
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="btn w-full justify-between"
              >
                {adults} adultos • {children} niños • {rooms} habitación
              </button>
              {showDropdown && (
                <div className="absolute z-20 bg-white rounded-lg shadow-lg p-4 mt-2 w-full">
                  {[
                    ["Adultos", adults, setAdults, 1],
                    ["Niños", children, setChildren, 0],
                    ["Habitaciones", rooms, setRooms, 1],
                  ].map(([label, value, setter, min], idx) => (
                    <div key={idx} className="flex justify-between mb-3 items-center text-black">
                      <span>{label}</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="btn btn-sm"
                          onClick={() => setter(Math.max(min, value - 1))}
                        >
                          -
                        </button>
                        <span>{value}</span>
                        <button
                          type="button"
                          className="btn btn-sm"
                          onClick={() => setter(value + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-primary w-full mt-2"
                    onClick={() => setShowDropdown(false)}
                  >
                    OK
                  </button>
                </div>
              )}
            </div>

            {/* BOTÓN BUSCAR */}
            <button type="submit" className="btn btn-primary w-full">
              Buscar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
