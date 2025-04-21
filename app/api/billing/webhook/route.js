import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log("📩 Evento recibido:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("✅ Pago completado:", session);
      // Aquí puedes actualizar la base de datos para confirmar la reservación
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Error en el webhook:", error.message);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }
}