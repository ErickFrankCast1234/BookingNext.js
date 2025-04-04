// 📦 Importaciones necesarias
import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongo";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";

// ⚙️ Configuración de NextAuth
const config = {
  providers: [
    Resend({
      apiKey: process.env.RESEND_KEY,
      from: "noreply@castlesbuy.shop", // ✔️ Correo ya verificado en Resend
      name: "Email",
    }),
  ],

  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.AUTH_SECRET,

  allowDangerousEmailAccountLinking: true,

  callbacks: {
    async session({ session, user }) {
      if (session?.user) {
        session.user.emailVerified = user?.emailVerified || null;
      }
      return session;
    },

    async signIn({ user }) {
      try {
        await connectMongo();

        const dbUser = await User.findOne({ email: user.email });

        if (dbUser && !dbUser.emailVerified) {
          dbUser.emailVerified = new Date();
          await dbUser.save();
          console.log(`✅ Correo verificado para: ${user.email}`);
        }

        return true;
      } catch (error) {
        console.error("❌ Error en signIn callback:", error.message);
        return false;
      }
    },
  },
};

// 🚀 Exportar controladores
export const { handlers, signIn, signOut, auth } = NextAuth(config);
