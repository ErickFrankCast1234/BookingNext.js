"use client";

import { useEffect, useState } from "react";
import BookingSearchForm from "@/Components/BookingSearchForm";
import HotelList from "@/Components/HotelList";
import HotelFilterBar from "@/Components/HotelFilterSidebar";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Filter, MapPin, SortAsc } from "lucide-react";

export default function MoreliaPage() {
  const [hoteles, setHoteles] = useState([]);
  const [filtros, setFiltros] = useState({ servicios: [], tipos: [] });
  const [orden, setOrden] = useState("");
  const [vista, setVista] = useState("lista");
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const fetchHoteles = async ({ servicios = [], tipos = [] } = {}, ordenSeleccionado = "") => {
    try {
      const url = new URL("/api/hoteles", window.location.origin);
      url.searchParams.append("destino", "Morelia");
      if (servicios.length > 0) url.searchParams.append("servicios", servicios.join(","));
      if (tipos.length > 0) url.searchParams.append("tipos", tipos.join(","));
      if (ordenSeleccionado) url.searchParams.append("orden", ordenSeleccionado);

      const res = await fetch(url);
      const data = await res.json();
      setHoteles(data);
    } catch (error) {
      console.error("Error al obtener hoteles:", error);
    }
  };

  useEffect(() => {
    fetchHoteles();
  }, []);

  const handleFilterChange = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
    fetchHoteles(nuevosFiltros, orden);
    const filtrosModal = document.getElementById("filtros-modal");
    if (filtrosModal?.open) filtrosModal.close();
  };

  const handleOrdenChange = (valor) => {
    setOrden(valor);
    fetchHoteles(filtros, valor);
    const ordenarModal = document.getElementById("ordenar-modal");
    if (ordenarModal?.open) ordenarModal.close();
  };

  const opcionesOrden = [
    { label: "Nuestros destacados principales", value: "destacados" },
    { label: "Precio (más bajo primero)", value: "precio_menor" },
    { label: "Precio (más alto primero)", value: "precio_mayor" },
    { label: "Categoría y precio del alojamiento", value: "categoria_precio" },
    { label: "Mejor puntuación y precio más bajo", value: "puntuacion_precio" },
    { label: "Distancia desde el centro de la ciudad", value: "distancia_centro" },
    { label: "Mejor calificados", value: "calificados" },
    { label: "Casas y departamentos primero", value: "casas_departamentos" },
  ];

  return (
    <>
      {/* CABECERA OMITIDA PARA BREVEDAD (idéntica a las otras ciudades) */}
      {/* Cabecera responsiva */}
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



      <main className="min-h-screen bg-gray-100 pt-18">
        <BookingSearchForm />

        {/* BOTONES MÓVIL */}
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

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 mt-8">
            {/* MAPA Y FILTROS SOLO EN ESCRITORIO */}
            <div className="hidden lg:flex flex-col gap-4 h-fit sticky top-24">
              <iframe
                title="Mapa Morelia"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14931.229694244117!2d-101.1899471900193!3d19.706074548894444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842d0d7e05f2f36b%3A0xe7409d6d4a6db1fa!2sMorelia%2C%20Michoac%C3%A1n!5e0!3m2!1ses-419!2smx!4v1713031888888!5m2!1ses-419!2smx"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
              <HotelFilterBar destino="Morelia" onFilterChange={handleFilterChange} />
            </div>

            {/* RESULTADOS */}
            <section>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-0">
                  Morelia: <span className="font-bold text-blue-700">{hoteles.length}</span> alojamientos encontrados
                </h2>
                <div className="hidden md:flex gap-2">
                  <button
                    className={`px-4 py-1 border rounded ${vista === "lista" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
                    onClick={() => setVista("lista")}
                  >
                    Lista
                  </button>
                  <button
                    className={`px-4 py-1 border rounded ${vista === "cuadricula" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
                    onClick={() => setVista("cuadricula")}
                  >
                    Cuadrícula
                  </button>
                </div>

              </div>
              <HotelList hoteles={hoteles} vista={vista} />
            </section>
          </div>
        </div>
      </main>

      {/* MODALES RESPONSIVOS */}
      <dialog id="mapa-modal" className="modal">
        <div className="modal-box p-0 overflow-hidden w-full max-w-lg">
          <iframe
            title="Mapa Morelia"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14931.229694244117!2d-101.1899471900193!3d19.706074548894444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842d0d7e05f2f36b%3A0xe7409d6d4a6db1fa!2sMorelia%2C%20Michoac%C3%A1n!5e0!3m2!1ses-419!2smx!4v1713031888888!5m2!1ses-419!2smx"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
          <form method="dialog" className="modal-backdrop">
            <button className="btn w-full mt-2 bg-blue-600 text-white">Cerrar</button>
          </form>
        </div>
      </dialog>

      <dialog id="filtros-modal" className="modal">
        <div className="modal-box p-4 max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <HotelFilterBar destino="Morelia" onFilterChange={handleFilterChange} />
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
    </>
  );
}
