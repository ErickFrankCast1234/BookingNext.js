import mongoose from "mongoose";

const DisponibilidadSchema = new mongoose.Schema({
  fechaEntrada: { type: Date, required: true },
  fechaSalida: { type: Date, required: true },
});

const HotelSchema = new mongoose.Schema({
  destino: { type: String, required: true },
  disponibilidad: { type: DisponibilidadSchema, required: true },
  maxAdultos: { type: Number, required: true },
  maxNinos: { type: Number, required: true },
  habitacionesDisponibles: { type: Number, required: true },
  precioNoche: { type: Number, required: true },
  img: { type: String, required: true },
  descripcion: { type: String, required: true },
});

// Evita que el modelo se registre más de una vez en desarrollo
export default mongoose.models.Hotel || mongoose.model("Hotel", HotelSchema);
