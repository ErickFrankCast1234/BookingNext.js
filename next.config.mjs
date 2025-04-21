/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // 🔵 Hosts generales
      { protocol: "https", hostname: "i0.wp.com" },
      { protocol: "https", hostname: "img.chilango.com" },
      { protocol: "https", hostname: "offloadmedia.feverup.com" },
      { protocol: "https", hostname: "cloudfront-us-east-1.images.arcpublishing.com" },
      { protocol: "https", hostname: "media.timeout.com" },
      { protocol: "https", hostname: "hotelplazarevolucion.com" },
      { protocol: "https", hostname: "images.trvl-media.com" },
      { protocol: "https", hostname: "content.r9cdn.net" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "mexicoemprende.org.mx" },
      { protocol: "https", hostname: "www.kayak.com.mx" },
      { protocol: "https", hostname: "www.mansiondepapilio.com" },
      { protocol: "https", hostname: "cf.bstatic.com" },
      { protocol: "https", hostname: "via.placeholder.com" },

      // 🟡 Monterrey
      { protocol: "https", hostname: "dynamic-media-cdn.tripadvisor.com" },
      { protocol: "https", hostname: "real-inn.hoteles-en-monterrey.com" },
      { protocol: "https", hostname: "cdn.easy-rez.com" },
      { protocol: "https", hostname: "hotel-kavia-monterrey.monterrey-hotels.com" },

      // 🟣 Mérida
      { protocol: "https", hostname: "www.mexicodesconocido.com.mx" },
      { protocol: "https", hostname: "thehappening.com" },
      { protocol: "https", hostname: "topyucatan.com" },
      { protocol: "https", hostname: "hotel-nacional-merida.hotelmix.mx" },

      // 🔴 Querétaro, Morelia, Oaxaca, San Miguel
      { protocol: "https", hostname: "foodandpleasure.com" },
      { protocol: "https", hostname: "grupopresidente.com.mx" },
      { protocol: "https", hostname: "content.skyscnr.com" },
      { protocol: "https", hostname: "img.nh-hotels.net" },
      { protocol: "https", hostname: "nh-puebla-centro-historico.hotelspuebla.com" },
      { protocol: "https", hostname: "fiesta-americana-76160.mejor-hoteles-elbajio.com" },
      { protocol: "https", hostname: "photos.hotelbeds.com" },
      { protocol: "https", hostname: "cdn.quehoteles.com" },
      { protocol: "https", hostname: "de-la-soledad.hotelesmorelia.net" },
      { protocol: "https", hostname: "casa-de-la-loma.hotelesmorelia.net" },
      { protocol: "https", hostname: "casa-mexicana-san-miguel-boutique-bb-san-miguel.san-miguel-de-allendehotels.com" },
      { protocol: "https", hostname: "images.rosewoodhotels.com" },
      { protocol: "https", hostname: "image-tc.galaxy.tf" },
      { protocol: "https", hostname: "assets.hyatt.com" },
      { protocol: "https", hostname: "z.cdrst.com" },
      { protocol: "https", hostname: "www.casaoaxaca.com.mx" },
      { protocol: "https", hostname: "cdn.spahotelsguide.com" },

      // ✅ Nuevos que causaron error
      { protocol: "https", hostname: "cache.marriott.com" },
      { protocol: "https", hostname: "mbmarcobeteta.com" },
      { protocol: "https", hostname: "cdn0.bodas.com.mx" },
      { protocol: "https", hostname: "escapadas.mexicodesconocido.com.mx" } // ← Agregado por el nuevo error
    ]
  }
};

export default nextConfig;
