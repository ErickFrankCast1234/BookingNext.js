import { Resend } from "resend";

console.log("🚀 El archivo send-login-email.js se está ejecutando");
const resend = new Resend(process.env.RESEND_KEY);

export async function POST(req) {
  try {
    console.log("📩 Endpoint /api/auth/send-login-email llamado");

    // Leer el cuerpo de la solicitud
    const { email } = await req.json();
    console.log("📧 Correo recibido:", email);

    // Validar que el correo esté presente
    if (!email) {
      console.error("❌ Error: El correo electrónico es obligatorio.");
      return new Response(
        JSON.stringify({ error: "El correo electrónico es obligatorio." }),
        { status: 400 }
      );
    }

    // Log para verificar la clave de API
    console.log("🔑 RESEND_KEY:", process.env.RESEND_KEY ? "Clave presente" : "Clave ausente");

    // Enviar el correo utilizando Resend
    const data = await resend.emails.send({
      from: "noreply@castlesbuy.shop", // Asegúrate de que este remitente esté verificado en Resend
      to: email,
      subject: "Enlace de inicio de sesión",
      html: `<p>Haz clic en el siguiente enlace para iniciar sesión:</p>
             <a href="https://example.com/login?email=${email}">Iniciar sesión</a>`,
    });

    console.log("✅ Resend respondió con éxito:", data);

    // Responder con éxito
    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (error) {
    // Registrar el error en los logs
    console.error("❌ Error al enviar el correo:", error.message);
    console.error("🔍 Detalles del error:", error);

    // Responder con un error
    return new Response(
      JSON.stringify({
        error: "Error al enviar el correo.",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}