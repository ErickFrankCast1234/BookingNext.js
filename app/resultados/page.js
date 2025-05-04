"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function Resultados({ searchParams }) {
  const { data: session } = useSession();

  const {
    destino = "",
    fechaEntrada,
    fechaSalida,
    adultos = "1",
    ninos = "0",
    habitaciones = "1",
  } = searchParams;

  const [hoteles, setHoteles] = useState([]);
  const [vistaCuadricula, setVistaCuadricula] = useState(true);
  const [filtros, setFiltros] = useState([]);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const fetchHoteles = async () => {
      const res = await fetch("/api/hoteles/buscar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destino, fechaEntrada, fechaSalida, adultos, ninos, habitaciones, filtros }),
      });
      const data = await res.json();
      setHoteles(data);
    };

    fetchHoteles();
  }, [destino, fechaEntrada, fechaSalida, adultos, ninos, habitaciones, filtros]);

  const toggleFiltro = (servicio) => {
    setFiltros((prev) =>
      prev.includes(servicio)
        ? prev.filter((f) => f !== servicio)
        : [...prev, servicio]
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen text-black">


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
                  src={session?.user?.image || "https://i.pravatar.cc/300"}
                  alt="Perfil"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span>{session?.user?.name || session?.user?.email}</span>
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





      {/* BANNER CON FRASE */}
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
      </div>




      {/* CONTENIDO */}
      <div className="pt-24 px-4 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* FILTROS */}
          <div className="col-span-1">
            <iframe
              src={`https://maps.google.com/maps?q=${destino}&output=embed`}
              className="w-full h-52 mb-4 rounded"
              loading="lazy"
            ></iframe>


            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-4">Filtrar por:</h2>

              {/* INSTALACIONES */}
              <div className="mb-4">
                <h3 className="font-semibold text-sm mb-2">Instalaciones</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  {[
                    "Estacionamiento",
                    "Restaurante",
                    "Recepción 24h",
                    "Room service",
                    "Gimnasio",
                    "Wifi gratis",
                    "Spa",
                    "Habitaciones para no fumadores",
                    "Alberca",
                    "Estación de recarga de vehículos eléctricos",
                    "Tina de hidromasaje/jacuzzi",
                    "Traslados de aeropuerto"
                  ].map((instalacion) => (
                    <label key={instalacion} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filtros.includes(instalacion)}
                        onChange={() => toggleFiltro(instalacion)}
                      />
                      {instalacion}
                    </label>
                  ))}
                </div>
              </div>

              {/* TIPO DE ALOJAMIENTO */}
              <div>
                <h3 className="font-semibold text-sm mb-2">Tipo de alojamiento</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  {[
                    "Departamentos",
                    "Hoteles",
                    "Habitaciones en casas particulares",
                    "Casas vacacionales",
                    "Casas de huéspedes",
                    "Bed and breakfasts",
                    "Hostales",
                    "Campamentos",
                    "Hoteles cápsula",
                    "Villas",
                    "Love hotels",
                    "Moteles",
                    "Tiendas de campaña de lujo",
                    "Barcos",
                    "Lodges",
                    "Chalets de montaña"
                  ].map((tipo) => (
                    <label key={tipo} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filtros.includes(tipo)}
                        onChange={() => toggleFiltro(tipo)}
                      />
                      {tipo}
                    </label>
                  ))}
                </div>
              </div>
            </div>



          </div>

          {/* RESULTADOS */}
          <div className="col-span-1 lg:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {destino}:{" "}
                <span className="text-blue-600 font-bold">{hoteles.length}</span>{" "}
                alojamientos encontrados
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setVistaCuadricula(false)}
                  className={`btn ${!vistaCuadricula ? "bg-blue-600 text-white" : "border"}`}
                >
                  Lista
                </button>
                <button
                  onClick={() => setVistaCuadricula(true)}
                  className={`btn ${vistaCuadricula ? "bg-blue-600 text-white" : "border"}`}
                >
                  Cuadrícula
                </button>
              </div>
            </div>

            {hoteles.length === 0 ? (
              <p className="text-red-500">No se encontraron hoteles con esos filtros.</p>
            ) : (
              <div className={vistaCuadricula ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "flex flex-col gap-4"}>
                {hoteles.map((hotel) => (
                  <div
                    key={hotel._id}
                    className={`bg-white p-4 rounded shadow ${vistaCuadricula ? "" : "flex flex-col md:flex-row md:gap-4"
                      }`}
                  >
                    <img
                      src={hotel.img || "/fallback.jpg"}
                      alt={hotel.descripcion}
                      className={`object-cover rounded mb-2 ${vistaCuadricula ? "w-full h-48" : "w-48 h-32 md:mb-0"
                        }`}
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-blue-700">{hotel.destino}</h3>
                      <p className="text-sm text-gray-600 mb-2">{hotel.descripcion}</p>
                      <p><strong>Precio:</strong> ${hotel.precioNoche} MXN por noche</p>
                      <p><strong>Fechas:</strong> {fechaEntrada} – {fechaSalida}</p>
                      <p>
                        <strong>Habitaciones:</strong> {hotel.habitacionesDisponibles} |{" "}
                        <strong>Adultos:</strong> {hotel.maxAdultos} |{" "}
                        <strong>Niños:</strong> {hotel.maxNinos}
                      </p>
                      <button className="btn mt-2 bg-blue-600 text-white w-full md:w-auto">Mostrar precios</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
