"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const Carousel = () => {
  const router = useRouter();
  const carouselRef = useRef(null);

  const destinos = [
    { name: "CDMX", image: "/CDMX.png", distance: "a 86 km", link: "/destinos/CDMX" },
    { name: "Puebla", image: "/puebla.png", distance: "a 114 km", link: "/destinos/puebla" },
    { name: "Morelia", image: "/morelia.png", distance: "a 239 km", link: "/destinos/morelia" },
    { name: "Querétaro", image: "/queretaro.png", distance: "a 248 km", link: "/destinos/queretaro" },
    { name: "San Miguel de Allende", image: "/sanmiguel.png", distance: "a 298 km", link: "/destinos/sanmiguel" },
    { name: "Oaxaca de Juárez", image: "/oaxaca.png", distance: "a 317 km", link: "/destinos/oaxaca" },
  ];

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const scrollAmount = 300; // ajusta si es necesario
      container.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="px-6 py-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-black">Un planificador de viajes fácil y rápido</h2>
        <p className="text-gray-500 mb-6">Escoge un estilo y encuentra los mejores destinos en México</p>

        <div className="relative">
          {/* Botón izquierdo */}
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 z-10 shadow hover:bg-gray-100"
          >
            ◀
          </button>

          {/* Carrusel */}
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-8 scrollbar-hide"
          >
            {destinos.map((destino, index) => (
              <div
                key={index}
                onClick={() => router.push(destino.link)}
                className="min-w-[16rem] flex-shrink-0 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg cursor-pointer snap-start transition"
              >
                <img src={destino.image} alt={destino.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-black">{destino.name}</h3>
                  <p className="text-gray-500">{destino.distance}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Botón derecho */}
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 z-10 shadow hover:bg-gray-100"
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
