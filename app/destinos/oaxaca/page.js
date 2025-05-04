"use client";

import { useEffect, useState } from "react";
import BookingSearchForm from "@/Components/BookingSearchForm";
import HotelList from "@/Components/HotelList";
import HotelFilterBar from "@/Components/HotelFilterSidebar";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function OaxacaPage() {
  const [hoteles, setHoteles] = useState([]);
  const [filtros, setFiltros] = useState({ servicios: [], tipos: [] });
  const [vista, setVista] = useState("lista");

  const { data: session } = useSession();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


  const fetchHoteles = async ({ servicios = [], tipos = [] } = {}) => {
    try {
      const url = new URL("/api/hoteles", window.location.origin);
      url.searchParams.append("destino", "Oaxaca");

      if (servicios.length > 0) {
        url.searchParams.append("servicios", servicios.join(","));
      }

      if (tipos.length > 0) {
        url.searchParams.append("tipos", tipos.join(","));
      }

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
    fetchHoteles(nuevosFiltros);
  };

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

      {/* CONTENIDO */}
      <main className="min-h-screen bg-gray-100 pt-18">
        <BookingSearchForm />

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 mt-8">
            {/* FILTROS Y MAPA */}
            <div className="flex flex-col gap-4 h-fit sticky top-24">
              <div className="rounded-lg overflow-hidden shadow-md">
                <iframe
                  title="Mapa Oaxaca"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.718865646809!2d-96.72511138542874!3d17.073184888208257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c7224931c05c47%3A0x94b84de8d2db3dcf!2sOaxaca%20de%20Ju%C3%A1rez%2C%20Oax.!5e0!3m2!1ses-419!2smx!4v1713139000000!5m2!1ses-419!2smx"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <HotelFilterBar destino="Oaxaca de Juárez" onFilterChange={handleFilterChange} />
            </div>

            {/* LISTA DE HOTELES */}
            <section>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-0">
                  Oaxaca de Juárez: <span className="font-bold text-blue-700">{hoteles.length}</span> alojamientos encontrados
                </h2>

                <div className="flex gap-2">
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
    </>
  );
}
