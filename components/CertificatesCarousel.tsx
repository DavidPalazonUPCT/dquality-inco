
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const certificates = [
  {
    id: 1,
    name: "ISO 9001:2015",
    description: "Sistema de Gestión de Calidad",
    image: "/images/certificado-iso-9001.png",
  },
  {
    id: 2,
    name: "ISO 14001:2015",
    description: "Sistema de Gestión Ambiental",
    image: "/images/certificado-iso-14001.png",
  },
  {
    id: 3,
    name: "ISO 45001:2018",
    description: "Sistema de Gestión de Seguridad y Salud",
    image: "/images/certificado-iso-45001.png",
  },
]

export default function CertificatesCarousel() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Duplicamos los certificados múltiples veces para crear un loop infinito suave
  const infiniteCertificates = [...certificates, ...certificates, ...certificates, ...certificates]

  return (
    <section className="w-full py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Título principal */}
      <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tight">
          CERTIFICADOS
        </h2>
      </div>

      {/* Contenedor del carousel */}
      <div className="relative w-full">
        {/* Gradientes laterales para efecto fade */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-900 to-transparent z-10" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-900 to-transparent z-10" />
        
        {/* Carousel infinito */}
        <div 
          className={`flex gap-8 transition-opacity duration-1000 ${
            isVisible ? 'animate-scroll-certificates' : 'opacity-0'
          }`}
          style={{
            width: 'calc(100% * 4)', // 4 copias de los certificados
          }}
        >
          {infiniteCertificates.map((certificate, index) => (
            <Card
              key={`${certificate.id}-${index}`}
              className="flex-shrink-0 w-80 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20"
            >
              <CardContent className="p-8 text-center">
                <div className="relative w-32 h-32 mx-auto mb-6 overflow-hidden rounded-lg">
                  <Image
                    src={certificate.image}
                    alt={certificate.name}
                    fill
                    className="object-contain transition-transform duration-300 hover:scale-110"
                    sizes="(max-width: 768px) 128px, 128px"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-mono tracking-wide">
                  {certificate.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {certificate.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Línea decorativa */}
      <div className="flex justify-center mt-16">
        <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full" />
      </div>
    </section>
  )
}
