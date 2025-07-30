"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ZoomIn } from "lucide-react"
import { urlForImage } from "@/sanity/lib/image"
import { getProjectFallbackImage } from "@/lib/mockdata"
import type { SanityProject } from "@/types/sanity"
import MagnetEffect from "./MagnetEffect"

interface ProjectHeroProps {
  project: SanityProject
  onImageClick: () => void
  scrollY: number
}

export default function ProjectHero({ project, onImageClick, scrollY }: ProjectHeroProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  // Función para obtener URL de imagen con fallback
  const getImageUrl = () => {
    // If no valid image asset, use fallback
    if (!project.mainImage?.asset?._ref || project.mainImage.asset._ref === null) {
      return getProjectFallbackImage(project.category)
    }

    // Only use Sanity image URL builder for real Sanity assets
    try {
      return urlForImage(project.mainImage)?.width(1920).height(1080).url() || getProjectFallbackImage(project.category)
    } catch (error) {
      console.warn("Error processing image URL, using fallback:", error)
      return getProjectFallbackImage(project.category)
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image con Parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0005})`,
        }}
      >
        <Image
          src={getImageUrl() || "/placeholder.svg"}
          alt={project.title}
          fill
          className={`object-cover transition-all duration-1000 ${
            imageLoaded ? "scale-100 opacity-100" : "scale-110 opacity-0"
          }`}
          priority
          onLoad={() => setImageLoaded(true)}
        />

        {/* Overlay Gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />

        {/* Efectos de Luz */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      </div>

      {/* Contenido del Hero */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <div className="space-y-8 animate-fade-in">
          {/* Badge de Categoría */}
          <MagnetEffect>
            <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 text-sm font-semibold uppercase tracking-wider">
              {project.category}
            </Badge>
          </MagnetEffect>

          {/* Título Principal */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              {project.title}
            </span>
          </h1>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">{project.description}</p>

          {/* Información Rápida */}
          <div className="flex flex-wrap justify-center gap-8 text-sm md:text-base">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-gray-300">{project.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-300">{project.year}</span>
            </div>
            {project.area && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-300">{project.area} m²</span>
              </div>
            )}
          </div>

          {/* Botón de Zoom */}
          <MagnetEffect>
            <Button
              onClick={onImageClick}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold group transition-all duration-300"
            >
              <ZoomIn className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Ver en Grande
            </Button>
          </MagnetEffect>
        </div>
      </div>

      {/* Indicador de Scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
          <span className="text-xs uppercase tracking-wider text-gray-300">Scroll</span>
        </div>
      </div>

      {/* Líneas Decorativas */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
      </div>
    </section>
  )
}
