
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
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % certificates.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mb-20">
      <h3 className="text-3xl font-black text-white mb-6 tracking-tight text-center">
        NUESTRAS <span className="text-gradient">CERTIFICACIONES</span>
      </h3>
      <p className="text-xl text-gray-300 mb-12 leading-relaxed text-center max-w-5xl mx-auto">
        Contamos con las certificaciones más exigentes del sector que avalan nuestro compromiso con la calidad,
        el medio ambiente y la seguridad laboral.
      </p>

      <div className="relative overflow-hidden">
        <div className="flex justify-center items-center space-x-8">
          {certificates.map((certificate, index) => (
            <Card
              key={certificate.id}
              className={`transition-all duration-500 ${
                index === currentIndex
                  ? "scale-110 opacity-100 z-10"
                  : "scale-90 opacity-60"
              } bg-gray-800/50 backdrop-blur-sm border-gray-700/50 hover:border-red-500/50`}
            >
              <CardContent className="p-8 text-center">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <Image
                    src={certificate.image}
                    alt={certificate.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h4 className="text-lg font-bold text-white mb-2 font-mono tracking-wide">
                  {certificate.name}
                </h4>
                <p className="text-gray-400 text-sm">{certificate.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Indicadores */}
        <div className="flex justify-center mt-8 space-x-2">
          {certificates.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-gradient-to-r from-red-500 to-orange-500"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
