"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    const result = await signIn("resend", {
      email,
      callbackUrl: "/",
    });

    if (result?.ok) {
      setMessage("✅ Revisa tu correo para iniciar sesión.");
    } else {
      setMessage("❌ No se pudo enviar el enlace. Intenta de nuevo.");
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <>
      {/* 🟦 CABECERA */}
      {/* 🟦 CABECERA */}
      <div className="bg-blue-600 shadow-md px-6 w-full h-20 flex items-center">
        <div className="flex items-center">
          <a className="flex items-center text-white text-xl font-semibold">
            <Image
              src="/Roomio.png"
              alt="Logo"
              width={48}
              height={48}
              className="h-10 w-auto"
            />
            <span className="ml-2">Alojamientos</span>
          </a>
        </div>
      </div>


      {/* 🧾 LOGIN FORM */}
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-xl font-bold mb-4 text-center">
            Inicia sesión o crea una cuenta
          </h2>

          <p className="text-sm text-center text-gray-600 mb-6">
            Puedes iniciar sesión con tu cuenta de Roomio.com para acceder a nuestros servicios
          </p>

          <form onSubmit={handleEmailLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                placeholder="Indica tu dirección de email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-semibold"
            >
              Continuar con email
            </button>
          </form>

          {message && <p className="mt-4 text-center text-sm">{message}</p>}

          {/* Separador */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-4 text-sm text-gray-600">
              ¿Aún no tienes cuenta? Usa una de estas opciones
            </span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Login con Google */}
          <div className="w-full mt-2">
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-white border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100 flex items-center justify-center gap-3 shadow-sm"
            >
              <Image
                src="https://www.svgrepo.com/show/475656/google-color.svg" // Ícono externo (puedes reemplazarlo con uno local)
                alt="Google"
                width={20}
                height={20}
              />
              <span className="text-sm font-medium text-gray-700">Continuar con Google</span>
            </button>
          </div>



          {/* Aviso legal */}
          <p className="mt-6 text-xs text-center text-gray-500">
            Al iniciar sesión o al crear una cuenta, aceptas nuestros <a href="#" className="text-blue-600 underline">Términos y condiciones</a> y la <a href="#" className="text-blue-600 underline">Política de privacidad</a>.
          </p>
          <p className="mt-1 text-xs text-center text-gray-400">
            Todos los derechos reservados.<br />Copyright (2006 – 2025) – Roomio.com™
          </p>
        </div>
      </div>
    </>
  );
}
