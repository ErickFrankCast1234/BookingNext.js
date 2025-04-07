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

  const destinations = [
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
      fechaEntrada: checkIn,
      fechaSalida: checkOut,
      adultos: adults,
      ninos: children,
      habitaciones: rooms,
    }).toString();
    router.push(`/resultados?${params}`);
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

      <div className="absolute bottom-10 w-full flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full bg-white mt-10 p-4 rounded-lg shadow-lg border-2 border-yellow-400"
          style={{ maxWidth: "90rem" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center">
            {/* Destino */}
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

            {/* Fechas */}
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

            {/* Adultos/Niños/Habitaciones */}
            <div className="dropdown w-full">
              <label tabIndex={0} className="btn w-full justify-between">
                {adults} adultos • {children} niños • {rooms} habitación
              </label>
              <div
                tabIndex={0}
                className="dropdown-content z-[1] bg-white rounded-box shadow p-4 w-full"
              >
                {/* Adultos */}
                <div className="flex justify-between mb-2 text-black">
                  <span>Adultos</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="btn btn-sm"
                    >
                      -
                    </button>
                    <span>{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults(adults + 1)}
                      className="btn btn-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Niños */}
                <div className="flex justify-between mb-2 text-black">
                  <span>Niños</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="btn btn-sm"
                    >
                      -
                    </button>
                    <span>{children}</span>
                    <button
                      type="button"
                      onClick={() => setChildren(children + 1)}
                      className="btn btn-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Habitaciones */}
                <div className="flex justify-between mb-2 text-black">
                  <span>Habitaciones</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setRooms(Math.max(1, rooms - 1))}
                      className="btn btn-sm"
                    >
                      -
                    </button>
                    <span>{rooms}</span>
                    <button
                      type="button"
                      onClick={() => setRooms(rooms + 1)}
                      className="btn btn-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-full mt-2">
                  OK
                </button>
              </div>
            </div>

            {/* Botón principal */}
            <button type="submit" className="btn btn-primary w-full">
              Buscar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
