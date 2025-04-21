import connectMongo from "@/libs/mongoose";
import Hotel from "@/models/Hotel";

export async function GET(req) {
  await connectMongo();

  const url = new URL(req.url);
  const destino = url.searchParams.get("destino");
  const servicios = url.searchParams.get("servicios")?.split(",").filter(Boolean) || [];
  const tipos = url.searchParams.get("tipos")?.split(",").filter(Boolean) || [];

  const filtros = {};

  // Filtro por destino (case-insensitive)
  if (destino) {
    filtros.destino = new RegExp(`^${destino}$`, "i"); // ← ahora es insensible a mayúsculas/minúsculas
  }

  // Filtro por servicios
  if (servicios.length > 0) {
    filtros.servicios = { $in: servicios };
  }

  // Filtro por tipo de alojamiento
  if (tipos.length > 0) {
    filtros.tipoAlojamiento = { $in: tipos };
  }

  try {
    const hoteles = await Hotel.find(filtros).lean();
    return Response.json(hoteles);
  } catch (error) {
    console.error("Error al obtener hoteles:", error);
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
  }
}
