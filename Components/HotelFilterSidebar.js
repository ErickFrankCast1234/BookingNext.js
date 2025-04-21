"use client";
import { useState } from "react";

export default function HotelFilterBar({ destino, onFilterChange }) {
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
  const [tiposSeleccionados, setTiposSeleccionados] = useState([]);

  const handleCheckboxChange = (valor, tipo) => {
    let actualizados = tipo === "servicio"
      ? [...serviciosSeleccionados]
      : [...tiposSeleccionados];

    if (actualizados.includes(valor)) {
      actualizados = actualizados.filter((item) => item !== valor);
    } else {
      actualizados.push(valor);
    }

    if (tipo === "servicio") {
      setServiciosSeleccionados(actualizados);
      onFilterChange({
        servicios: actualizados,
        tipos: tiposSeleccionados,
      });
    }

    if (tipo === "tipo") {
      setTiposSeleccionados(actualizados);
      onFilterChange({
        servicios: serviciosSeleccionados,
        tipos: actualizados,
      });
    }
  };

  const instalaciones = [
    "Estacionamiento", "Restaurante", "Recepción 24h", "Room service",
    "Gimnasio", "Wifi gratis", "Spa", "Habitaciones para no fumadores",
    "Alberca", "Estación de recarga de vehículos eléctricos",
    "Tina de hidromasaje/jacuzzi", "Traslados de aeropuerto",
  ];

  const tiposAlojamiento = [
    "Departamentos", "Hoteles", "Habitaciones en casas particulares", "Casas vacacionales",
    "Casas de huéspedes", "Bed and breakfasts", "Hostales", "Campamentos",
    "Hoteles cápsula", "Villas", "Love hotels", "Moteles",
    "Tiendas de campaña de lujo", "Barcos", "Lodges", "Chalets de montaña",
  ];

  return (
    <aside className="w-full max-w-[300px] p-4 bg-white rounded-lg shadow-md mb-6 md:mb-0">
      <h2 className="text-lg font-bold mb-4 text-gray-900">Filtrar por:</h2>

      {/* INSTALACIONES */}
      <h3 className="font-semibold text-sm mb-2 text-gray-900">Instalaciones</h3>
      <ul className="space-y-2 mb-4">
        {instalaciones.map((instalacion, idx) => (
          <li key={idx}>
            <label className="flex items-center w-full text-sm text-gray-700">
              <input
                type="checkbox"
                className="mr-2"
                onChange={() => handleCheckboxChange(instalacion, "servicio")}
                checked={serviciosSeleccionados.includes(instalacion)}
              />
              <span className="w-full">{instalacion}</span>
            </label>
          </li>
        ))}
      </ul>

      {/* TIPO DE ALOJAMIENTO */}
      <h3 className="font-semibold text-sm mb-2 text-gray-900">Tipo de alojamiento</h3>
      <ul className="space-y-2">
        {tiposAlojamiento.map((tipo, idx) => (
          <li key={idx}>
            <label className="flex items-center w-full text-sm text-gray-700">
              <input
                type="checkbox"
                className="mr-2"
                onChange={() => handleCheckboxChange(tipo, "tipo")}
                checked={tiposSeleccionados.includes(tipo)}
              />
              <span className="w-full">{tipo}</span>
            </label>
          </li>
        ))}
      </ul>
    </aside>
  );
}
