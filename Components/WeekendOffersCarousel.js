"use client";

import { useRef } from "react";

const formatoMXN = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

const WeekendOffersCarousel = () => {
  const ofertas = [
    {
      id: "680307cc06f61ea7a93af543",
      name: "La Quinta by Wyndham Puebla Palmas Angelópolis",
      image: "/la-quinta.png",
      location: "Puebla, México",
      rating: "8.6",
      reviews: "2,675 comentarios",
      price: 1200,
      oldPrice: 1500,
      nights: "2 noches",
    },
    {
      id: "68030cd406f61ea7a93af544",
      name: "Princess Mundo Imperial Riviera Diamante Acapulco",
      image: "/princess-mundo.png",
      location: "Acapulco, México",
      rating: "8.5",
      reviews: "1,627 comentarios",
      price: 4200,
      oldPrice: 5500,
      nights: "2 noches",
    },
    {
      id: "68030cd406f61ea7a93af545",
      name: "Hotel Stella Maris",
      image: "/stella-maris.png",
      location: "Ciudad de México, México",
      rating: "8.5",
      reviews: "414 comentarios",
      price: 1500,
      oldPrice: 1800,
      nights: "2 noches",
    },
    {
      id: "68030cd406f61ea7a93af546",
      name: "Grand Fiesta Americana Puebla Angelópolis",
      image: "/grand-fiesta.png",
      location: "Puebla, México",
      rating: "9.2",
      reviews: "633 comentarios",
      price: 3200,
      oldPrice: 4000,
      nights: "2 noches",
    },
  ];

  const carouselRef = useRef(null);

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 280, // ancho estimado de card + gap
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -280,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="py-10 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-2xl font-bold mb-2 text-black">Ofertas para el fin de semana</h2>
        <p className="text-gray-500 mb-6">Ahorra en hospedaje para 4 abril - 6 abril</p>

        <div className="relative">
          {/* Carrusel con flechas internas */}
          <div className="overflow-hidden relative">
            <div
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto scroll-smooth pb-2"
            >
              {ofertas.map((oferta, index) => (
                <a
                  key={index}
                  href={`/hotel/${oferta.id}`}
                  className="flex-shrink-0 w-64 rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow"
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
                    <p className="text-red-500 line-through">{formatoMXN.format(oferta.oldPrice)}</p>
                    <p className="text-green-600 font-bold">{formatoMXN.format(oferta.price)}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Flecha Izquierda */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 text-black z-10"
            >
              ◀
            </button>

            {/* Flecha Derecha */}
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 text-black z-10"
            >
              ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekendOffersCarousel;
