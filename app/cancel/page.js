"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CancelPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 4000); // 4 segundos

    return () => clearTimeout(timer); // limpia el temporizador si el componente se desmonta
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-center px-4">
      <div>
        <h1 className="text-3xl font-bold text-red-600 mb-4">Pago cancelado</h1>
        <p className="text-gray-700 mb-2">Tu reserva no fue procesada.</p>
        <p className="text-gray-500">Serás redirigido al inicio en unos segundos...</p>
      </div>
    </div>
  );
}
