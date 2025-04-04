// 📦 Importaciones necesarias
import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongo"; // Conexión a MongoDB
import connectMongo from "@/libs/mongoose"; // Conexión a Mongoose
import User from "@/models/User"; // Modelo de usuario
import { NextResponse } from "next/server"; // Importa NextResponse para App Router

// ⚙️ Configuración de NextAuth
const authOptions = {
  providers: [
    Resend({
      apiKey: process.env.RESEND_KEY, // Clave de API de Resend
      from: "noreply@castlesbuy.shop", // Dirección de correo del remitente
      name: "Email", // Nombre del proveedor
    }),
  ],

  adapter: MongoDBAdapter(clientPromise), // Adaptador para MongoDB
  secret: process.env.AUTH_SECRET, // Clave secreta para NextAuth

  // ✅ Para evitar conflictos entre cuentas con el mismo correo
  allowDangerousEmailAccountLinking: true,

  // 🔄 Callbacks
  callbacks: {
    async session({ session, user }) {
      if (session?.user) {
        session.user.emailVerified = user?.emailVerified || null; // Agregar estado de verificación de correo
      }
      return session;
    },

    async signIn({ user }) {
      try {
        await connectMongo(); // Conectar a la base de datos

        const dbUser = await User.findOne({ email: user.email });

        // Si el usuario existe pero no está verificado
        if (dbUser && !dbUser.emailVerified) {
          dbUser.emailVerified = new Date(); // Marcar como verificado
          await dbUser.save();
          console.log(`✅ Correo verificado para: ${user.email}`);
        }

        return true; // Permitir inicio de sesión
      } catch (error) {
        console.error("❌ Error en signIn callback:", error.message);
        return false; // Denegar inicio de sesión en caso de error
      }
    },
  },
};

// Handlers compatibles con App Router
export const handlers = {
  GET: async () => {
    return NextResponse.json({ message: "GET handler funcionando" });
  },
  POST: async () => {
    return NextResponse.json({ message: "POST handler funcionando" });
  },
};

// Exporta la configuración de NextAuth
export default NextAuth(authOptions);