"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function HotelDetailPage() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (!id) return;

    const fetchHotel = async () => {
      try {
        const res = await fetch(`/api/hoteles/${id}`);
        const data = await res.json();
        setHotel(data);
      } catch (err) {
        console.error("Error al cargar hotel:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  const handleReservar = async (roomType, price) => {
    try {
      const res = await fetch("/api/billing/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/cancel`,
          hotelId: id,
          roomType,
          price,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Error al crear la sesión de pago:", data.error);
      }
    } catch (error) {
      console.error("Error al iniciar el proceso de pago:", error);
    }
  };

  if (loading) return <p className="text-center py-10">Cargando hotel...</p>;
  if (!hotel) return <p className="text-center py-10 text-red-600">Hotel no encontrado</p>;



  <style jsx global>{`
    html, body {
      margin: 0;
      padding: 0;
      overflow-x: hidden;
    }
  
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 50;
    }
  `}</style>




  return (
    <>
      {/* ✅ CABECERA RESPONSIVA */}
      <div className="navbar bg-blue-600 shadow-md px-6 w-full h-auto fixed top-0 left-0 z-50 flex flex-wrap justify-between items-center">
        {/* Logo + título */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center text-white no-underline">
            <Image src="/Roomio.png" alt="Logo" width={40} height={40} className="h-10 w-auto" />
            <span className="ml-2 text-xl font-semibold hidden sm:inline">Alojamientos</span>
          </Link>
        </div>

        {/* Botón hamburguesa en móviles */}
        <div className="block sm:hidden">
          <button className="btn btn-ghost text-white" onClick={toggleMenu}>
            ☰
          </button>
        </div>

        {/* Menú en pantallas grandes */}
        <div className="hidden sm:flex items-center gap-4 text-white font-semibold">
          {!session ? (
            <>
              <button
                className="btn bg-white text-blue-700 hover:bg-gray-100 border-none font-semibold"
                onClick={() => (window.location.href = "/register")}
              >
                Regístrate
              </button>
              <Link href="/login" className="btn bg-white text-blue-700 hover:bg-gray-100 border-none font-semibold">
                Iniciar sesión
              </Link>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-blue-700 flex items-center gap-2">
                <Image
                  src={session.user.image || "https://i.pravatar.cc/300"}
                  alt="Perfil"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span>{session.user.name || session.user.email}</span>
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52 text-black">
                <li><a>Mi cuenta</a></li>
                <li><a>Reservas</a></li>
                <li><a>Favoritos</a></li>
                <li><button onClick={() => signOut({ callbackUrl: "/" })}>Cerrar sesión</button></li>
              </ul>
            </div>
          )}
        </div>

        {/* Menú desplegable en móviles */}
        {menuOpen && (
          <div className="w-full flex flex-col gap-2 mt-2 sm:hidden text-white font-semibold">
            {!session ? (
              <>
                <button
                  className="btn bg-white text-blue-700 hover:bg-gray-100 border-none font-semibold w-full"
                  onClick={() => (window.location.href = "/register")}
                >
                  Regístrate
                </button>
                <Link href="/login" className="btn bg-white text-blue-700 hover:bg-gray-100 border-none font-semibold w-full">
                  Iniciar sesión
                </Link>
              </>
            ) : (
              <div className="flex flex-col gap-2 text-black bg-white p-4 rounded">
                <p className="font-bold">{session.user.name || session.user.email}</p>
                <button onClick={() => signOut({ callbackUrl: "/" })}>Cerrar sesión</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="bg-white text-black min-h-screen px-4 pt-20 pb-8">

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {/* Columna izquierda */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-2">{hotel.titulo}</h1>
            <p className="text-gray-600 mb-4">📍 {hotel.ubicacion}</p>

            {/* Galería */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <Image
                src={hotel.img}
                alt={hotel.titulo}
                width={800}
                height={500}
                className="rounded-lg w-full h-[300px] sm:h-[400px] object-cover col-span-2"
              />
              {(hotel?.galeria || []).slice(0, 4).map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  alt={`Imagen ${idx + 1}`}
                  width={400}
                  height={150}
                  className="rounded-md w-full h-[90px] object-cover"
                />
              ))}
            </div>

            {/* Descripción */}
            <div className="mb-6 space-y-4 text-justify text-gray-800 leading-relaxed">
              {hotel.descripcion.split("\n").map((parrafo, i) => (
                <p key={i}>{parrafo}</p>
              ))}
            </div>

            {/* Servicios populares */}
            {hotel?.servicios?.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Servicios más populares</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {hotel.servicios.map((servicio, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded shadow-sm border"
                    >
                      <span className="text-green-600">✔</span>
                      <span className="text-sm">{servicio}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Columna derecha */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md h-fit space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Puntos fuertes del alojamiento</h2>
              <div className="text-sm text-gray-700 space-y-4">
                <div>
                  <strong className="block text-black">📍 Parking</strong>
                  <p>Estacionamiento gratis, privado y en el hospedaje.</p>
                </div>
                <div>
                  <strong className="block text-black">🌄 Vistas</strong>
                  <p>Vistas a la ciudad o zonas emblemáticas.</p>
                </div>
                <div>
                  <strong className="block text-black">♿ Accesibilidad</strong>
                  <p>Las plantas superiores son accesibles en elevador.</p>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div className="rounded-md overflow-hidden">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(hotel.ubicacion)}&output=embed`}
                width="100%"
                height="200"
                className="rounded-md w-full"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Precio general */}
            <div className="text-center">
              <p className="text-xl font-bold mb-2">${hotel.precioNoche} MXN por noche</p>
              <p className="text-sm text-gray-600 mb-4">
                Disponible del <b>{new Date(hotel.disponibilidad.fechaEntrada).toLocaleDateString()}</b> al{" "}
                <b>{new Date(hotel.disponibilidad.fechaSalida).toLocaleDateString()}</b>
              </p>
              <button
                onClick={() => handleReservar("General", hotel.precioNoche)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded w-full"
              >
                Reservar ahora
              </button>
            </div>
          </div>
        </div>

        {/* Tabla de Reservación */}
        <div className="max-w-7xl mx-auto mt-12 w-full px-4">
          <div className="w-full border border-gray-300 rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left border-collapse">
              <thead className="bg-blue-100 text-gray-900 font-semibold">
                <tr>
                  <th className="px-4 py-3 border w-[28%]">Tipo de habitación</th>
                  <th className="px-4 py-3 border w-[15%] text-center">Número de personas</th>
                  <th className="px-4 py-3 border w-[15%] text-center">Precio</th>
                  <th className="px-4 py-3 border w-[30%]">Tus opciones</th>
                  <th className="px-4 py-3 border w-[12%] text-center">Seleccionar</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="p-4 border">
                    <p className="font-bold text-blue-600 underline">Habitación con cama grande</p>
                    <p className="text-gray-600">1 cama Queen size</p>
                    <p className="mt-1 text-sm text-gray-700">
                      Habitación doble con baño privado, artículos de aseo, TV, aire acondicionado, minibar, escritorio y más.
                    </p>
                  </td>
                  <td className="p-4 border text-center">👥 {hotel.maxAdultos} adultos</td>
                  <td className="p-4 border text-center">
                    <p className="font-bold text-lg">${hotel.precioNoche} MXN</p>
                    <p className="text-green-600 font-medium">Oferta de tiempo limitado</p>
                  </td>
                  <td className="p-4 border text-green-700">
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Incluye internet</li>
                      <li>Cancelación gratis</li>
                      <li>No pagas hasta tu llegada</li>
                    </ul>
                  </td>
                  <td className="p-4 border text-center">
                    <button
                      onClick={() => handleReservar("Habitación con cama grande", hotel.precioNoche)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Reservar
                    </button>
                  </td>
                </tr>

                <tr className="bg-gray-50">
                  <td className="p-4 border">
                    <p className="font-bold text-blue-600 underline">Suite ejecutiva</p>
                    <p className="text-gray-600">1 cama King size</p>
                    <p className="mt-1 text-sm text-gray-700">
                      Espaciosa suite con sala, escritorio, WiFi premium, baño privado, secadora de cabello y cafetera.
                    </p>
                  </td>
                  <td className="p-4 border text-center">👥 {hotel.maxAdultos + 1} adultos</td>
                  <td className="p-4 border text-center">
                    <p className="font-bold text-lg">${hotel.precioNoche + 400} MXN</p>
                    <p className="text-green-600 font-medium">45% menos</p>
                  </td>
                  <td className="p-4 border text-green-700">
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>WiFi de alta velocidad</li>
                      <li>Cancelación gratuita</li>
                      <li>Desayuno incluido</li>
                    </ul>
                  </td>
                  <td className="p-4 border text-center">
                    <button
                      onClick={() => handleReservar("Suite ejecutiva", hotel.precioNoche + 400)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Reservar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
