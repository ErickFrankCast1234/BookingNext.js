// Board.js (Modelo de Mongoose)

import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

export default mongoose.models.Board || mongoose.model("Board", boardSchema);