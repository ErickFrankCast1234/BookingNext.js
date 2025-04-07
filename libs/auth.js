// auth.js
import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import Google from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongo";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";

const config = {
  providers: [
    Resend({
      apiKey: process.env.RESEND_KEY,
      from: "noreply@castlesbuy.shop",
      name: "Email",
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.AUTH_SECRET,
  allowDangerousEmailAccountLinking: true,

  callbacks: {
    async session({ session, user }) {
      if (session?.user) {
        session.user.emailVerified = user?.emailVerified || null;

        // 🧠 Asegurar datos consistentes desde la base de datos
        session.user.name = user?.name || session.user.name;
        session.user.image = user?.image || session.user.image || "https://i.pravatar.cc/300";
      }
      return session;
    },

    async signIn({ user }) {
      try {
        await connectMongo();
        const dbUser = await User.findOne({ email: user.email });

        if (dbUser) {
          let updated = false;

          if (!dbUser.emailVerified) {
            dbUser.emailVerified = new Date();
            updated = true;
          }

          if (!dbUser.image && user.image) {
            dbUser.image = user.image;
            updated = true;
          }

          if (!dbUser.name && user.name) {
            dbUser.name = user.name;
            updated = true;
          }

          if (updated) {
            await dbUser.save();
            console.log(`✅ Usuario actualizado: ${user.email}`);
          }
        }

        return true;
      } catch (error) {
        console.error("❌ Error en signIn callback:", error.message);
        return false;
      }
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);

