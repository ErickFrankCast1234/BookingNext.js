"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const Carousel = () => {
  const router = useRouter();

  const destinos = [
    { name: "CDMX", image: "/CDMX.png", distance: "a 86 km", link: "/destinos/CDMX" },
    { name: "Puebla", image: "/puebla.png", distance: "a 114 km", link: "/destinos/puebla" },
    { name: "Morelia", image: "/morelia.png", distance: "a 239 km", link: "/destinos/morelia" },
    { name: "Querétaro", image: "/queretaro.png", distance: "a 248 km" , link: "/destinos/queretaro"},
    { name: "San Miguel de Allende", image: "/sanmiguel.png", distance: "a 298 km", link: "/destinos/sanmiguel" },
    { name: "Oaxaca de Juárez", image: "/oaxaca.png", distance: "a 317 km" , link: "/destinos/oaxaca"},
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % destinos.length;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? destinos.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const scrollToIndex = (index) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * index;
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleClick = (link) => {
    if (link) {
      router.push(link);
    }
  };

  return (
    <div className="p-10 bg-white">
      <div className="container mx-auto max-w-screen-[800px] px-48">
        <h2 className="text-2xl font-bold mb-4 text-black">
          Un planificador de viajes fácil y rápido
        </h2>
        <p className="text-gray-500 mb-8">
          Escoge un estilo y encuentra los mejores destinos en México
        </p>
        <div className="relative flex items-center">
          {/* Botón Anterior */}
          <button
            onClick={handlePrev}
            className="absolute left-0 z-10 bg-black p-2 rounded-full shadow-md hover:bg-gray-100"
          >
            ◀
          </button>

          {/* Carrusel */}
          <div ref={carouselRef} className="flex overflow-x-hidden gap-4">
            {destinos.map((destino, index) => (
              <div
                key={index}
                onClick={() => handleClick(destino.link)}
                className={`flex-shrink-0 w-64 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition duration-300`}
              >
                <img
                  src={destino.image}
                  alt={destino.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-black">{destino.name}</h3>
                  <p className="text-gray-500">{destino.distance}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Botón Siguiente */}
          <button
            onClick={handleNext}
            className="absolute right-0 z-10 bg-black p-2 rounded-full shadow-md hover:bg-gray-100"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
