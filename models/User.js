// User.js (Modelo de Mongoose usando CommonJS)
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true, // ✅ Necesario para MongoDBAdapter
    unique: true,
    trim: true,
    lowercase: true,
  },
  emailVerified: {
    type: Date, // ✅ Necesario para marcar cuentas verificadas (Resend o Google)
    default: null,
  },
  image: {
    type: String,
  },

  // 🔐 Permisos personalizados
  hasAccess: {
    type: Boolean,
    default: false,
  },

  // 🆔 Cliente (si aplica)
  customerId: {
    type: String,
  },

  // Relaciones con tableros u otra entidad
  boards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
    },
  ],
}, {
  timestamps: true, // 🕒 Para createdAt y updatedAt
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
