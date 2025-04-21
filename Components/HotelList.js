"use client";

import HotelCard from "./HotelCard";

export default function HotelList({ hoteles, vista = "cuadricula" }) {
  if (!hoteles?.length) {
    console.warn("⚠️ No se recibieron hoteles en HotelList");
    return <p className="text-center text-gray-500">No hay hoteles disponibles.</p>;
  }

  // Clases condicionales según la vista
  const layoutClasses =
    vista === "cuadricula"
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      : "flex flex-col gap-6";

  return (
    <div className={`container mx-auto p-6 ${layoutClasses}`}>
      {hoteles.map((hotel) => (
        <HotelCard key={hotel._id} hotel={hotel} />
      ))}
    </div>
  );
}
