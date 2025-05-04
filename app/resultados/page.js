"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import HotelFilterBar from "@/Components/HotelFilterSidebar";
import { Filter, MapPin, SortAsc } from "lucide-react";

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
  const [orden, setOrden] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // ✅ FUNCIÓN GLOBAL Y REUTILIZABLE
const fetchHoteles = async (filtrosActivos = filtros, ordenActual = orden) => {
  const res = await fetch("/api/hoteles/buscar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      destino,
      fechaEntrada,
      fechaSalida,
      adultos,
      ninos,
      habitaciones,
      filtros: filtrosActivos,
      orden: ordenActual,
    }),
  });
  const data = await res.json();
  setHoteles(data);
};

// ✅ useEffect LIMPIO
useEffect(() => {
  fetchHoteles();
}, [destino, fechaEntrada, fechaSalida, adultos, ninos, habitaciones, filtros, orden]);


  const toggleFiltro = (servicio) => {
    setFiltros((prev) =>
      prev.includes(servicio)
        ? prev.filter((f) => f !== servicio)
        : [...prev, servicio]
    );
  };

  useEffect(() => {
    if (!Array.isArray(filtros)) {
      setFiltros([]);
    }
  }, [filtros]);

  const handleFilterChange = (nuevosFiltros) => {
    // Combinar ambos arrays en uno solo
    const filtrosCombinados = [
      ...(nuevosFiltros.servicios || []),
      ...(nuevosFiltros.tipos || [])
    ];
  
    setFiltros(filtrosCombinados);
    fetchHoteles(filtrosCombinados, orden);
  
    // Cierra el modal móvil si está abierto
    const filtrosModal = document.getElementById("filtros-modal");
    if (filtrosModal?.open) filtrosModal.close();
  };
  



  const handleOrdenChange = (nuevoOrden) => {
    setOrden(nuevoOrden);
    document.getElementById("ordenar-modal")?.close();
  };


  const opcionesOrden = [
    { label: "Nuestros destacados principales", value: "destacados" },
    { label: "Precio (más bajo primero)", value: "precio_menor" },
    { label: "Precio (más alto primero)", value: "precio_mayor" },
    { label: "Categoría y precio del alojamiento", value: "categoria_precio" },
    { label: "Mejor puntuación y precio más bajo", value: "puntuacion_precio" },
    { label: "Distancia desde el centro de la ciudad", value: "distancia" },
    { label: "Mejor calificados", value: "mejor_calificados" },
    { label: "Casas y departamentos primero", value: "casas_departamentos" },
  ];


  return (
    <div className="bg-gray-100 min-h-screen text-black">

      {/* ✅ CABECERA RESPONSIVA */}
      <div className="navbar bg-blue-600 shadow-md px-6 w-full h-auto fixed top-0 left-0 z-50 flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center text-white no-underline">
            <Image src="/Roomio.png" alt="Logo" width={40} height={40} className="h-10 w-auto" />
            <span className="ml-2 text-xl font-semibold hidden sm:inline">Alojamientos</span>
          </Link>
        </div>
        <div className="block sm:hidden">
          <button className="btn btn-ghost text-white" onClick={toggleMenu}>☰</button>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-white font-semibold">
          {!session ? (
            <>
              <button className="btn bg-white text-blue-700 hover:bg-gray-100 border-none font-semibold" onClick={() => (window.location.href = "/register")}>Regístrate</button>
              <Link href="/login" className="btn bg-white text-blue-700 hover:bg-gray-100 border-none font-semibold">Iniciar sesión</Link>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-blue-700 flex items-center gap-2">
                <Image src={session.user.image || "https://i.pravatar.cc/300"} alt="Perfil" width={32} height={32} className="rounded-full" />
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
        {menuOpen && (
          <div className="w-full flex flex-col gap-2 mt-2 sm:hidden text-white font-semibold">
            {!session ? (
              <>
                <button className="btn bg-white text-blue-700 hover:bg-gray-100 border-none font-semibold w-full" onClick={() => (window.location.href = "/register")}>Regístrate</button>
                <Link href="/login" className="btn bg-white text-blue-700 hover:bg-gray-100 border-none font-semibold w-full">Iniciar sesión</Link>
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

      {/* ✅ BANNER */}
      <div
        className="relative flex items-center justify-center"
        style={{
          height: "500px",
          width: "100vw",
          backgroundImage: "url('/image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-1/3 w-full text-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">
            &quot;Vive el sueño en una casa vacacional&quot;
          </h1>
        </div>
      </div>

      {/* ✅ BOTONES RESPONSIVOS */}
      <div className="flex justify-around sm:hidden my-4 px-2">
        <button onClick={() => document.getElementById("ordenar-modal")?.showModal()} className="flex items-center gap-1 px-3 py-2 bg-white text-blue-600 rounded-md font-medium shadow">
          <SortAsc className="w-4 h-4" />
          <span className="text-sm">Ordenar</span>
        </button>
        <button onClick={() => document.getElementById("filtros-modal")?.showModal()} className="flex items-center gap-1 px-3 py-2 bg-white text-blue-600 rounded-md font-medium shadow">
          <Filter className="w-4 h-4" />
          <span className="text-sm">Filtrar</span>
        </button>
        <button onClick={() => document.getElementById("mapa-modal")?.showModal()} className="flex items-center gap-1 px-3 py-2 bg-white text-blue-600 rounded-md font-medium shadow">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">Mapa</span>
        </button>
      </div>

      {/* ✅ CONTENIDO */}
      <div className="pt-24 px-4 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* FILTROS */}
          <div className="col-span-1 hidden lg:block">
            <iframe src={`https://maps.google.com/maps?q=${destino}&output=embed`} className="w-full h-52 mb-4 rounded" loading="lazy"></iframe>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-4">Filtrar por:</h2>
              <div className="mb-4">
                <h3 className="font-semibold text-sm mb-2">Instalaciones</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  {[
                    "Estacionamiento", "Restaurante", "Recepción 24h", "Room service", "Gimnasio",
                    "Wifi gratis", "Spa", "Habitaciones para no fumadores", "Alberca",
                    "Estación de recarga de vehículos eléctricos", "Tina de hidromasaje/jacuzzi", "Traslados de aeropuerto"
                  ].map((instalacion) => (
                    <label key={instalacion} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={Array.isArray(filtros) && filtros.includes(instalacion)}
                        onChange={() => toggleFiltro(instalacion)}
                      />

                      {instalacion}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-2">Tipo de alojamiento</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  {[
                    "Departamentos", "Hoteles", "Casas vacacionales", "Hostales", "Villas",
                    "Moteles", "Bed and breakfasts", "Campamentos", "Lodges"
                  ].map((tipo) => (
                    <label key={tipo} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={Array.isArray(filtros) && filtros.includes(tipo)}
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
                {destino}: <span className="text-blue-600 font-bold">{hoteles.length}</span> alojamientos encontrados
              </h2>
              <div className="hidden md:flex gap-2">
                <button onClick={() => setVistaCuadricula(false)} className={`btn ${!vistaCuadricula ? "bg-blue-600 text-white" : "border"}`}>Lista</button>
                <button onClick={() => setVistaCuadricula(true)} className={`btn ${vistaCuadricula ? "bg-blue-600 text-white" : "border"}`}>Cuadrícula</button>
              </div>
            </div>

            {hoteles.length === 0 ? (
              <p className="text-red-500">No se encontraron hoteles con esos filtros.</p>
            ) : (
              <div className={vistaCuadricula ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "flex flex-col gap-4"}>
                {hoteles.map((hotel) => (
                  <div key={hotel._id} className={`bg-white p-4 rounded shadow ${vistaCuadricula ? "" : "flex flex-col md:flex-row md:gap-4"}`}>
                    <img src={hotel.img || "/fallback.jpg"} alt={hotel.descripcion} className={`object-cover rounded mb-2 ${vistaCuadricula ? "w-full h-48" : "w-48 h-32 md:mb-0"}`} />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-blue-700">{hotel.destino}</h3>
                      <p className="text-sm text-gray-600 mb-2">{hotel.descripcion}</p>
                      <p><strong>Precio:</strong> ${hotel.precioNoche} MXN por noche</p>
                      <p><strong>Fechas:</strong> {fechaEntrada} – {fechaSalida}</p>
                      <p><strong>Habitaciones:</strong> {hotel.habitacionesDisponibles} | <strong>Adultos:</strong> {hotel.maxAdultos} | <strong>Niños:</strong> {hotel.maxNinos}</p>
                      <button className="btn mt-2 bg-blue-600 text-white w-full md:w-auto">Mostrar precios</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ✅ MODALES RESPONSIVOS */}
      <dialog id="mapa-modal" className="modal">
        <div className="modal-box p-0 overflow-hidden w-full max-w-lg">
          <iframe title="Mapa" src={`https://maps.google.com/maps?q=${destino}&output=embed`} width="100%" height="300" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
          <form method="dialog" className="modal-backdrop">
            <button className="btn w-full mt-2 bg-blue-600 text-white">Cerrar</button>
          </form>
        </div>
      </dialog>


      <dialog id="filtros-modal" className="modal">
        <div className="modal-box p-4 max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <HotelFilterBar destino={destino} onFilterChange={handleFilterChange} filtrosActivos={filtros} />
          <form method="dialog">
            <button className="btn w-full mt-4 bg-blue-600 text-white">Cerrar</button>
          </form>
        </div>
      </dialog>

      <dialog id="ordenar-modal" className="modal">
        <div className="modal-box max-w-lg w-full">
          <h3 className="font-semibold text-lg mb-4 text-gray-800">Ordenar por</h3>
          <form method="dialog" className="space-y-2">
            {opcionesOrden.map((opcion, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="orden"
                  id={`orden-${index}`}
                  className="radio radio-primary"
                  checked={orden === opcion.value}
                  onChange={() => handleOrdenChange(opcion.value)}
                />
                <label htmlFor={`orden-${index}`} className="text-gray-700">{opcion.label}</label>
              </div>
            ))}
            <button className="btn w-full mt-4 bg-blue-600 text-white">Cerrar</button>
          </form>
        </div>
      </dialog>

    </div>
  );
}
