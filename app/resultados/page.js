import connectMongo from "@/libs/mongoose"; // ✔️ Esta es tu función correcta
import Hotel from "@/models/Hotel";

export default async function Resultados({ searchParams }) {
  const {
    destino = "",
    fechaEntrada,
    fechaSalida,
    adultos = "1",
    ninos = "0",
    habitaciones = "1",
  } = searchParams;

  // Asegurar conexión con MongoDB
  await connectMongo();

  // Convertir fechas a Date
  const entrada = new Date(fechaEntrada);
  const salida = new Date(fechaSalida);

  // Buscar hoteles que cumplan con los filtros correctos
  const hoteles = await Hotel.find({
    destino: { $regex: destino, $options: "i" },
    "disponibilidad.fechaEntrada": { $lte: entrada }, // el hotel debe estar disponible desde antes o igual
    "disponibilidad.fechaSalida": { $gte: salida },   // y hasta después o igual
    maxAdultos: { $gte: parseInt(adultos) },
    maxNinos: { $gte: parseInt(ninos) },
    habitacionesDisponibles: { $gte: parseInt(habitaciones) }
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Resultados para: <span className="text-blue-600">{destino}</span>
      </h1>

      {hoteles.length === 0 ? (
        <p className="text-red-500">No se encontraron hoteles con esos filtros.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hoteles.map((hotel) => (
            <div key={hotel._id} className="border p-4 rounded shadow bg-white">
              <img
                src={hotel.img}
                alt={hotel.descripcion}
                className="mb-2 w-full h-48 object-cover rounded"
              />
              <p className="font-semibold">{hotel.descripcion}</p>
              <p className="text-gray-500">${hotel.precioNoche} MXN / noche</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
