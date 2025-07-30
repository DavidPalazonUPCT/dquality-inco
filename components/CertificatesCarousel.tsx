
"use client"

import { useState } from "react"
import Image from "next/image"

interface Certificate {
  id: string
  name: string
  image: string
}

const certificates: Certificate[] = [
  {
    id: "iso-45001",
    name: "ISO 45001",
    image: "/images/certificado-iso-45001.png",
  },
  {
    id: "iso-9001",
    name: "ISO 9001",
    image: "/images/certificado-iso-9001.png",
  },
  {
    id: "iso-14001",
    name: "ISO 14001",
    image: "/images/certificado-iso-14001.png",
  },
]

export default function CertificatesCarousel() {
  const [isPaused, setIsPaused] = useState(false)

  // Duplicamos los certificados múltiples veces para crear un loop infinito suave
  const infiniteCertificates = [...certificates, ...certificates, ...certificates, ...certificates]

  return (
    <div className="mb-20">
      <h3 className="text-3xl font-black text-white mb-6 tracking-tight text-center">
        NUESTRAS <span className="text-gradient">CERTIFICACIONES</span>
      </h3>
      <p className="text-xl text-gray-300 mb-12 leading-relaxed text-center max-w-4xl mx-auto">
        Certificaciones que respaldan nuestro compromiso con la calidad, seguridad y medio ambiente
      </p>

      <div className="relative overflow-hidden">
        <div
          className={`flex animate-scroll gap-8 ${isPaused ? '[animation-play-state:paused]' : ''}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {infiniteCertificates.map((certificate, index) => (
            <div
              key={`${certificate.id}-${index}`}
              className="flex-shrink-0 w-48 h-64 bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <Image
                  src={certificate.image}
                  alt={certificate.name}
                  width={150}
                  height={200}
                  className="object-contain max-w-full max-h-full"
                />
                <h4 className="mt-4 text-lg font-bold text-gray-900 text-center font-mono tracking-wide">
                  {certificate.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  )
}
