import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const {
      successUrl,
      cancelUrl,
      hotelId,
      roomType,
      price,
      fechaEntrada,
      fechaSalida
    } = await req.json();

    if (!successUrl || !cancelUrl || !hotelId || !roomType || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const descripcion = [
      `Hotel ID:    ${hotelId}................................ `,
      `                                             `,
      `Fecha de Entrada: ${fechaEntrada}..................................................`,
      `Fecha de Salida:  ${fechaSalida}..................................................`
    ].join("     "); // Espacios entre campos para forzar salto visual en Stripe

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "mxn",
            product_data: {
              name: `Reservación: ${roomType}`,
              description: descripcion,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        hotelId,
        fechaEntrada,
        fechaSalida,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("❌ Error creando sesión de Stripe:", error.message);
    return NextResponse.json({ error: "Failed to create Stripe session" }, { status: 500 });
  }
}
