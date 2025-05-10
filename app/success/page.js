export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 text-green-800">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">✅ ¡Pago exitoso!</h1>
        <p className="text-lg">Tu reservación ha sido confirmada.</p>
        <a href="/" className="text-blue-600 underline mt-4 block">Volver al inicio</a>
      </div>
    </div>
  );
}
