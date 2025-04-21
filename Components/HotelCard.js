"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HotelCard({ hotel }) {
  const router = useRouter();

  useEffect(() => {
    console.log("🛏️ Hotel recibido:", hotel);
  }, [hotel]);

  if (!hotel) {
    console.warn("❌ Hotel no recibido en HotelCard");
    return null;
  }

  const fechaEntrada = hotel.disponibilidad?.fechaEntrada
    ? new Date(hotel.disponibilidad.fechaEntrada).toLocaleDateString("es-MX")
    : "Fecha no disponible";

  const fechaSalida = hotel.disponibilidad?.fechaSalida
    ? new Date(hotel.disponibilidad.fechaSalida).toLocaleDateString("es-MX")
    : "Fecha no disponible";

  const handleRedirect = () => {
    if (hotel._id) {
      router.push(`/hotel/${hotel._id}`);
    } else {
      console.error("❌ El hotel no tiene ID");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition flex flex-col h-full">
      {/* Imagen */}
      <div className="w-full h-52 relative">
        <Image
          src={hotel.img || "/fallback.jpg"}
          alt={(hotel.descripcion || "Hotel sin descripción").slice(0, 30)}
          layout="fill"
          objectFit="cover"
          onError={(e) => {
            console.error("❌ Error al cargar imagen:", hotel.img);
            e.target.src = "/fallback.jpg";
          }}
        />
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-lg font-semibold text-blue-800 mb-1">
            {hotel.destino || "Destino no disponible"}
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            {hotel.descripcion || "Sin descripción disponible"}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Precio:</strong> ${hotel.precioNoche || 0} MXN por noche
          </p>
          <p className="text-sm text-gray-700">
            <strong>Fechas:</strong> {fechaEntrada} – {fechaSalida}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Habitaciones:</strong> {hotel.habitacionesDisponibles ?? "?"} |{" "}
            <strong>Adultos:</strong> {hotel.maxAdultos ?? "?"} |{" "}
            <strong>Niños:</strong> {hotel.maxNinos ?? "?"}
          </p>
        </div>

        {/* Botón Mostrar Precios */}
        <div className="mt-4">
          <button
            onClick={handleRedirect}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Mostrar precios
          </button>
        </div>
      </div>
    </div>
  );
}
