"use client";

import { useRef } from "react";

const WeekendOffersCarousel = () => {
  const ofertas = [
    {
      name: "La Quinta by Wyndham Puebla Palmas Angelopolis",
      image: "/la-quinta.png",
      location: "Puebla, México",
      rating: "8.6",
      reviews: "2,675 comentarios",
      price: "COP 457,780",
      oldPrice: "COP 544,980",
      nights: "2 noches",
      link: "/ofertas/la-quinta", // Enlace a la página de la oferta
    },
    {
      name: "Princess Mundo Imperial Riviera Diamante Acapulco",
      image: "/princess-mundo.png",
      location: "Acapulco, México",
      rating: "8.5",
      reviews: "1,627 comentarios",
      price: "COP 1,436,460",
      oldPrice: "COP 2,394,080",
      nights: "2 noches",
      link: "/ofertas/princess-mundo", // Enlace a la página de la oferta
    },
    {
      name: "Hotel Stella Maris",
      image: "/stella-maris.png",
      location: "Ciudad de México, México",
      rating: "8.5",
      reviews: "414 comentarios",
      price: "COP 489,740",
      oldPrice: "COP 576,160",
      nights: "2 noches",
      link: "/ofertas/stella-maris", // Enlace a la página de la oferta
    },
    {
      name: "Grand Fiesta Americana Puebla Angelópolis",
      image: "/grand-fiesta.png",
      location: "Puebla, México",
      rating: "9.2",
      reviews: "633 comentarios",
      price: "COP 1,022,840",
      oldPrice: "COP 1,278,520",
      nights: "2 noches",
      link: "/ofertas/grand-fiesta", // Enlace a la página de la oferta
    },
  ];

  const carouselRef = useRef(null);

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="p-10 bg-white">
      <div className="container mx-auto max-w-screen-[800px] px-48">
        <h2 className="text-2xl font-bold mb-4 text-black">Ofertas para el fin de semana</h2>
        <p className="text-gray-500 mb-8">Ahorra en hospedaje para 4 abril - 6 abril</p>
        <div className="relative flex items-center">
          {/* Botón Anterior */}
          <button
            onClick={handlePrev}
            className="absolute left-0 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 text-black"
          >
            ◀
          </button>

          {/* Carrusel */}
          <div
            ref={carouselRef}
            className="flex overflow-x-hidden gap-4"
          >
            {ofertas.map((oferta, index) => (
              <a
                key={index}
                href={oferta.link} // Enlace a la página de la oferta
                className="flex-shrink-0 w-64 rounded-lg overflow-hidden shadow-lg bg-white"
              >
                <img
                  src={oferta.image}
                  alt={oferta.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-black">{oferta.name}</h3>
                  <p className="text-gray-500">{oferta.location}</p>
                  <p className="text-blue-600 font-bold">{oferta.rating}</p>
                  <p className="text-gray-500">{oferta.reviews}</p>
                  <p className="text-gray-500">{oferta.nights}</p>
                  <p className="text-red-500 line-through">{oferta.oldPrice}</p>
                  <p className="text-green-600 font-bold">{oferta.price}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Botón Siguiente */}
          <button
            onClick={handleNext}
            className="absolute right-0 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 text-black"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeekendOffersCarousel;