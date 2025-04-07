"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    const result = await signIn("resend", {
      email,
      callbackUrl: "/", // Puedes cambiar la redirección si gustas
    });

    if (result?.ok) {
      setMessage("✅ Revisa tu correo para iniciar sesión.");
    } else {
      setMessage("❌ No se pudo enviar el enlace. Intenta de nuevo.");
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" }); // 👈 Redirige con Google
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>

        {/* Formulario de Resend */}
        <form onSubmit={handleEmailLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Enviar enlace de inicio de sesión
          </button>
        </form>

        {/* Mensaje */}
        {message && <p className="mt-4 text-center text-sm">{message}</p>}

        {/* Separador visual */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500">o</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Botón de Google */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48">
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.4 1.48 8.37 3.29l6.18-6.18C34.34 3.15 29.55 1 24 1 14.91 1 7.17 6.49 3.7 14.13l7.2 5.6C12.34 14.26 17.7 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.1 24.64c0-1.53-.13-3.01-.37-4.44H24v8.4h12.42c-.53 2.77-2.09 5.14-4.42 6.73v5.56h7.18c4.2-3.88 6.62-9.61 6.62-16.25z"
            />
            <path
              fill="#FBBC05"
              d="M10.9 28.73c-.78-2.3-1.23-4.77-1.23-7.34 0-2.56.45-5.03 1.23-7.34l-7.2-5.6C1.6 13.42 0 18.51 0 24s1.6 10.58 3.7 14.55l7.2-5.6z"
            />
            <path
              fill="#34A853"
              d="M24 46c5.55 0 10.34-1.83 13.78-4.98l-7.18-5.56c-2 1.35-4.55 2.14-6.6 2.14-6.3 0-11.66-4.76-13.1-11.08l-7.2 5.6C7.17 41.51 14.91 46 24 46z"
            />
          </svg>
          Iniciar sesión con Google
        </button>
      </div>
    </div>
  );
}
