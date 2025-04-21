import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { successUrl, cancelUrl, hotelId, roomType, price } = await req.json();

    if (!successUrl || !cancelUrl || !hotelId || !roomType || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "mxn",
            product_data: {
              name: `Reservación: ${roomType}`,
              description: `Hotel ID: ${hotelId}`,
            },
            unit_amount: price * 100, // Convertir a centavos
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("❌ Error creando sesión de Stripe:", error.message);
    return NextResponse.json({ error: "Failed to create Stripe session" }, { status: 500 });
  }
}