import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGO_URI;

export async function GET(request, { params }) {
  const { id } = params;

  // Validar que el ID sea válido
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("test"); // Asegúrate de usar el nombre correcto de tu DB
    const collection = db.collection("hotels");

    const hotel = await collection.findOne({ _id: new ObjectId(id) });
    await client.close();

    if (!hotel) {
      return NextResponse.json({ error: "Hotel no encontrado" }, { status: 404 });
    }

    return NextResponse.json(hotel);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
