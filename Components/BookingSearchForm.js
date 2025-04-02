"use client";

import { useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/outline"; // Importa el ícono de ubicación

export default function BookingSearchForm() {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [showOptions, setShowOptions] = useState(false); // Estado para controlar la lista desplegable

  const destinations = [
    "Acapulco, México",
    "Cancún, México",
    "Tepoztlán, México",
    "Cuernavaca, México",
    "Playa del Carmen, México",
  ];

  return (
    // filepath: c:\Users\efcas\OneDrive\ESCRITORIO 1\CURSO PROGRAMACION WEB\Proyecto Final Next.js\Booking - copia\Components\BookingSearchForm.js
    <div
      className="relative flex items-center justify-center"
      style={{
        height: "500px",
        width: "100vw", // Cambiado a 100vw para abarcar todo el ancho de la ventana
        backgroundImage: "url('/image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Contenedor para el texto */}
      <div className="absolute top-1/3 w-full text-center">
        <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">
          &quot;Vive el sueño en una casa vacacional&quot;
        </h1>
      </div>

      {/* Contenedor para el formulario */}
      <div className="absolute bottom-10 w-full flex justify-center">
        <form
          className="w-full bg-white mt-10 p-4 rounded-lg shadow-lg border-2 border-yellow-400"
          style={{ maxWidth: "90rem" }} // Ancho personalizado entre 7xl (80rem) y 8xl (96rem)
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center">
            {/* Input de destino */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="¿A dónde vas?"
                className="input input-bordered w-full text-black"
                onFocus={() => setShowOptions(true)} // Mostrar opciones al hacer clic
                onBlur={() => setTimeout(() => setShowOptions(false), 200)} // Ocultar opciones al perder el foco
              />
              {showOptions && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-lg w-full mt-1">
                  {destinations.map((destination, index) => (
                    <li
                      key={index}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 text-black cursor-pointer"
                      onMouseDown={(e) => e.preventDefault()} // Evitar que el blur cierre la lista
                      onClick={() => {
                        document.querySelector("input").value = destination;
                        setShowOptions(false);
                      }}
                    >
                      <MapPinIcon className="h-5 w-5 text-blue-500 mr-2" /> {/* Ícono de ubicación */}
                      {destination}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Fechas */}
            <input
              type="date"
              className="input input-bordered w-full text-black"
            />
            <input
              type="date"
              className="input input-bordered w-full text-black"
            />

            {/* Adultos, niños y habitaciones */}
            <div className="dropdown w-full">
              <label tabIndex={0} className="btn w-full justify-between">
                {adults} adultos • {children} niños • {rooms} habitación
              </label>

              <div tabIndex={0} className="dropdown-content z-[1] bg-white rounded-box shadow p-4 w-full">
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

            {/* Botón de búsqueda */}
            <button type="submit" className="btn btn-primary w-full">
              Buscar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}