"use client";

import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import BookingSearchForm from "../Components/BookingSearchForm";
import Carousel from "../Components/Carousel";
import WeekendOffersCarousel from "../Components/WeekendOffersCarousel";
import Footer from "../Components/Footer";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          overflow-x: hidden;
        }
      `}</style>

      {/* 🟦 CABECERA */}
      <div className="navbar bg-blue-600 shadow-md px-6 w-full h-20 fixed top-0 left-0 z-50">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl text-white">
            <Image
              src="/Roomio.png"
              alt="Logo"
              width={150}
              height={150}
              className="h-12 w-auto"
            />
            <span className="ml-2">Alojamientos</span>
          </a>
        </div>

        <div className="flex-none gap-4 flex items-center text-white font-semibold">
          {!session ? (
            <>
              <button
                className="btn bg-white text-blue-700 hover:bg-gray-100 border-none font-semibold"
                onClick={() => window.location.href = "/register"}
              >
                Regístrate
              </button>
              <button className="btn bg-white text-blue-700 hover:bg-gray-100 border-none font-semibold">
                <Link href="/login">Iniciar sesión</Link>
              </button>
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
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52 text-black"
              >
                <li><a>Mi cuenta</a></li>
                <li><a>Reservas</a></li>
                <li><a>Favoritos</a></li>
                <li><button onClick={() => signOut({ callbackUrl: "/" })}>Cerrar sesión</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>


      {/* 🔽 CONTENIDO PRINCIPAL */}
      <main className="flex min-h-screen flex-col px-0 pb-24 pt-20 bg-gray-100">


        <BookingSearchForm />



        {/* DESTINOS DE MODA */}
        <div className="p-10 bg-white">
          <div className="container mx-auto max-w-screen-[800px] px-48">
            <h2 className="text-2xl font-bold mb-4 text-black">Destinos de moda</h2>
            <p className="text-gray-500 mb-8">Opciones más populares para quienes viajen desde México</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {[
                { name: "Ciudad de México", image: "/CDMX.png", link: "/destinos/cdmx" },
                { name: "Guadalajara", image: "/guadalajara.png", link: "/destinos/guadalajara" },
              ].map((destino, index) => (
                <a
                  key={index}
                  href={destino.link}
                  className="relative block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-2"
                >
                  <img src={destino.image} alt={destino.name} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h3 className="text-white text-lg font-bold">{destino.name}</h3>
                  </div>
                </a>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { name: "Monterrey", image: "/monterrey.png", link: "/destinos/monterrey" },
                { name: "Mérida", image: "/merida.png", link: "/destinos/merida" },
                { name: "Puebla", image: "/puebla.png", link: "/destinos/puebla" },
              ].map((destino, index) => (
                <a
                  key={index}
                  href={destino.link}
                  className="relative block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-2"
                >
                  <img src={destino.image} alt={destino.name} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h3 className="text-white text-lg font-bold">{destino.name}</h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* CARRUSEL */}
        <Carousel />


        {/* CARRUSEL DE OFERTAS */}
        <WeekendOffersCarousel />


        {/* 👇 FOOTER */}
        <Footer />
      </main>
    </>
  );
}
