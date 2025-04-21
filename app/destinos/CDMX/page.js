"use client";

import { useEffect, useState } from "react";
import BookingSearchForm from "@/Components/BookingSearchForm";
import HotelList from "@/Components/HotelList";
import HotelFilterBar from "@/Components/HotelFilterSidebar";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function CiudadDeMexicoPage() {
  const [hoteles, setHoteles] = useState([]);
  const [filtros, setFiltros] = useState({ servicios: [], tipos: [] });
  const [vista, setVista] = useState("lista");

  const { data: session } = useSession();

  const fetchHoteles = async ({ servicios = [], tipos = [] } = {}) => {
    try {
      const url = new URL("/api/hoteles", window.location.origin);
      url.searchParams.append("destino", "Ciudad de México");

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
      {/* CABECERA */}
      <div className="navbar bg-blue-600 shadow-md px-6 w-full h-20 fixed top-0 left-0 z-50 flex justify-between items-center">
      {/*<div className="navbar bg-blue-600 shadow-md px-6 w-full h-20 flex justify-between items-center">*/}
   
        <div className="flex items-center">
          <Link href="/" className="flex items-center text-white no-underline">
            <Image
              src="/Roomio.png"
              alt="Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="ml-2 text-xl font-semibold">Alojamientos</span>
          </Link>
        </div>

        <div className="flex items-center gap-4 text-white font-semibold">
          {!session ? (
            <>
              <button
                className="btn bg-white text-blue-700 hover:bg-gray-100 border-none font-semibold"
                onClick={() => (window.location.href = "/register")}
              >
                Regístrate
              </button>
              <Link
                href="/login"
                className="btn bg-white text-blue-700 hover:bg-gray-100 border-none font-semibold"
              >
                Iniciar sesión
              </Link>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost hover:bg-blue-700 flex items-center gap-2"
              >
                <Image
                  src={session.user.image || "https://i.pravatar.cc/300"}
                  alt="Perfil"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span>{session.user.name || session.user.email}</span>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52 text-black"
              >
                <li><a>Mi cuenta</a></li>
                <li><a>Reservas</a></li>
                <li><a>Favoritos</a></li>
                <li>
                  <button onClick={() => signOut({ callbackUrl: "/" })}>
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* CONTENIDO */}
      <main className="min-h-screen bg-gray-100 pt-20">
         {/*<main className="min-h-screen bg-gray-100">*/}
        <BookingSearchForm />

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 mt-8">
            {/* MAPA + FILTROS */}
            <div className="flex flex-col gap-4 h-fit sticky top-24">
               {/* <div className="flex flex-col gap-4">*/}
              <div className="rounded-lg overflow-hidden shadow-md">
                <iframe
                  title="Mapa Ciudad de México"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.546555038435!2d-99.16766368454144!3d19.43260778688738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f92f9e88cd45%3A0x2d7d7637c6cb6e42!2sCiudad%20de%20México!5e0!3m2!1ses-419!2smx!4v1713031800000!5m2!1ses-419!2smx"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <HotelFilterBar
                destino="Ciudad de México"
                onFilterChange={handleFilterChange}
              />
            </div>

            {/* LISTA DE HOTELES */}
            <section>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-0">
                  Ciudad de México:{" "}
                  <span className="font-bold text-blue-700">{hoteles.length}</span>{" "}
                  alojamientos encontrados
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
