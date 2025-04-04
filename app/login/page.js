"use client";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    console.log("📤 Enviando solicitud al endpoint /api/auth/send-login-email");
  
    try {
      const response = await fetch("/api/auth/send-login-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      console.log("📥 Respuesta del servidor:", response);
  
      if (response.ok) {
        setMessage("✅ Se ha enviado un enlace de inicio de sesión a tu correo.");
      } else {
        const errorData = await response.json();
        setMessage(`❌ Error: ${errorData.error || "Inténtalo de nuevo."}`);
      }
    } catch (error) {
      console.error("❌ Error al enviar la solicitud:", error);
      setMessage("❌ Hubo un error al enviar el correo. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar sesión</h2>
        <form onSubmit={handleLogin}>
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
        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </div>
    </div>
  );
}