// app/api/hoteles/buscar/route.js
import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Hotel from "@/models/Hotel";

export async function POST(req) {
  await connectMongo();
  const body = await req.json();

  const {
    destino,
    fechaEntrada,
    fechaSalida,
    adultos = 1,
    ninos = 0,
    habitaciones = 1,
    filtros = [], // Servicios seleccionados (checkboxes)
  } = body;

  const entrada = new Date(fechaEntrada);
  const salida = new Date(fechaSalida);
  const adultosInt = parseInt(adultos);
  const ninosInt = parseInt(ninos);
  const habitacionesInt = parseInt(habitaciones);

  // Filtro base: destino con regex
  const baseDestino = { destino: { $regex: destino, $options: "i" } };

  // Lógica de filtros por niveles
  let filtrosNivel1 = {
    ...baseDestino,
    "disponibilidad.fechaEntrada": { $lte: entrada },
    "disponibilidad.fechaSalida": { $gte: salida },
    maxAdultos: { $gte: adultosInt },
    maxNinos: { $gte: ninosInt },
    habitacionesDisponibles: { $gte: habitacionesInt },
  };
  if (filtros.length > 0) filtrosNivel1.servicios = { $all: filtros };

  let hoteles = await Hotel.find(filtrosNivel1);

  // Nivel 2: solo lugar + fechas
  if (hoteles.length === 0) {
    let filtrosNivel2 = {
      ...baseDestino,
      "disponibilidad.fechaEntrada": { $lte: entrada },
      "disponibilidad.fechaSalida": { $gte: salida },
    };
    if (filtros.length > 0) filtrosNivel2.servicios = { $all: filtros };

    hoteles = await Hotel.find(filtrosNivel2);
  }

  // Nivel 3: solo lugar
  if (hoteles.length === 0) {
    let filtrosNivel3 = { ...baseDestino };
    if (filtros.length > 0) filtrosNivel3.servicios = { $all: filtros };

    hoteles = await Hotel.find(filtrosNivel3);
  }

  return NextResponse.json(hoteles);
}
