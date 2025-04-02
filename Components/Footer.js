"use client";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">


          {/* Columna 1 */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-black">Atención personal</h3>
            <ul className="text-gray-600 space-y-2">
              <li>Preguntas frecuentes sobre el coronavirus (COVID-19)</li>
              <li>Gestiona tus viajes</li>
              <li>Atención al cliente</li>
              <li>Centro de recursos sobre seguridad</li>
            </ul>
          </div>

          {/* Columna 2 */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-black">Descubre</h3>
            <ul className="text-gray-600 space-y-2">
              <li>Programa de lealtad Genius</li>
              <li>Ofertas de temporada y para las vacaciones</li>
              <li>Artículos de viajes</li>
              <li>Booking.com for Business</li>
              <li>Traveller Review Awards</li>
              <li>Renta de autos</li>
              <li>Buscador de vuelos</li>
              <li>Reservaciones en restaurantes</li>
              <li>Booking.com para Agentes de viaje</li>
            </ul>
          </div>

          {/* Columna 3 */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-black">Términos y ajustes</h3>
            <ul className="text-gray-600 space-y-2">
              <li>Privacidad y cookies</li>
              <li>Términos y condiciones</li>
              <li>Disputa de colaboradores</li>
              <li>Declaración sobre la esclavitud moderna</li>
              <li>Declaración sobre derechos humanos</li>
            </ul>
          </div>

          {/* Columna 4 */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-black">Colaboradores</h3>
            <ul className="text-gray-600 space-y-2">
              <li>Acceder a la extranet</li>
              <li>Ayuda para colaboradores</li>
              <li>Registra tu propiedad</li>
              <li>Conviértete en afiliado</li>
            </ul>
          </div>

          {/* Columna 5 */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-black">Acerca de</h3>
            <ul className="text-gray-600 space-y-2">
              <li>Sobre Booking.com</li>
              <li>Cómo trabajamos</li>
              <li>Sustentabilidad</li>
              <li>Centro de prensa</li>
              <li>Trabaja con nosotros</li>
              <li>Relaciones con inversionistas</li>
              <li>Contacto corporativo</li>
            </ul>
          </div>




        </div>

        <br></br>
        <br></br>

        {/* Línea divisoria */}
        <div className="border-t border-gray-300 my-8"></div>

        {/* Información adicional */}
        <div className="flex flex-col items-center text-gray-600 mt-8"> {/* Agregado mt-8 */}
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-lg">🇲🇽</span>
            <span>COP</span>
          </div>
          <p className="text-sm text-center">
            Booking.com forma parte de Booking Holdings Inc., líder mundial en viajes online y servicios relacionados.
          </p>
        </div>

        {/* Logos */}
        <div className="flex justify-center items-center mt-4 space-x-4">
          <img src="/Roomio.png" alt="Booking.com" className="h-6" />
          <img src="/priceline-logo.png" alt="Priceline" className="h-6" />
          <img src="/kayak-logo.png" alt="Kayak" className="h-6" />
          <img src="/agoda-logo.png" alt="Agoda" className="h-6" />
          <img src="/opentable-logo.png" alt="OpenTable" className="h-6" />
        </div>


      </div>
    </footer>
  );
};

export default Footer;