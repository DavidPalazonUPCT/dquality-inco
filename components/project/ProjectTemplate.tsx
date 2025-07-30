"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Calendar, User, Square, ExternalLink } from "lucide-react"
import { urlForImage } from "@/sanity/lib/image"
import { getProjectFallbackImage } from "@/lib/mockdata"
import type { SanityProject } from "@/types/sanity"
import ProjectHero from "./ProjectHero"
import ImageCarousel from "./ImageCarousel"
import ImageLightbox from "./ImageLightbox"
import MagnetEffect from "./MagnetEffect"
import { PortableText } from "@portabletext/react"

interface ProjectTemplateProps {
  project: SanityProject
}

export default function ProjectTemplate({ project }: ProjectTemplateProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Función para obtener URL de imagen con fallback
  const getImageUrl = (image: any, width = 1200, height = 800) => {
    // If using mockdata or no valid image, use fallback
    if (!image?.asset?._ref || image.asset._ref === null) {
      return getProjectFallbackImage(project.category)
    }

    // Only use Sanity image URL builder for real Sanity assets
    try {
      return urlForImage(image)?.width(width).height(height).url() || getProjectFallbackImage(project.category)
    } catch (error) {
      console.warn("Error processing image URL, using fallback:", error)
      return getProjectFallbackImage(project.category)
    }
  }

  // Preparar todas las imágenes para el lightbox con fallbacks
  const allImages =
    project.gallery && project.gallery.length > 0
      ? [project.mainImage, ...project.gallery].filter(Boolean)
      : [
          { asset: null }, // Main image placeholder
          { asset: null }, // Gallery image 1
          { asset: null }, // Gallery image 2
          { asset: null }, // Gallery image 3
        ]

  // Si no hay imágenes reales, usar imágenes de fallback
  const displayImages =
    allImages.length > 0
      ? allImages
      : [
          { asset: { _ref: "fallback-main" } },
          { asset: { _ref: "fallback-1" } },
          { asset: { _ref: "fallback-2" } },
          { asset: { _ref: "fallback-3" } },
        ]

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header Flotante */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div
          className={`backdrop-blur-xl transition-all duration-300 ${
            scrollY > 50 ? "bg-black/80 border-b border-gray-800/50" : "bg-transparent"
          }`}
        >
          <div className="container mx-auto px-4 lg:px-6">
            <div className="flex items-center justify-between h-16 lg:h-20">
              <MagnetEffect>
                <Link href="/" className="flex items-center space-x-2 group">
                  <Image
                    src="/images/logo-dquality.png"
                    alt="DQuality InCo"
                    width={180}
                    height={60}
                    className="h-8 lg:h-10 w-auto brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
                  />
                </Link>
              </MagnetEffect>

              <MagnetEffect>
                <Button
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-white hover:text-black transition-all duration-300 bg-transparent"
                  asChild
                >
                  <Link href="/#portfolio">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver al Portfolio
                  </Link>
                </Button>
              </MagnetEffect>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <ProjectHero project={project} onImageClick={() => openLightbox(0)} scrollY={scrollY} />

      {/* Contenido Principal */}
      <section className="relative z-10 bg-gradient-to-b from-black/50 to-black">
        <div className="container mx-auto px-4 lg:px-6 py-20">
          {/* Grid de Información y Carrusel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-20">
            {/* Información del Proyecto */}
            <div className="lg:col-span-1 space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white mb-4 relative">
                    Detalles del Proyecto
                    <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-red-500 to-orange-500"></div>
                  </h2>
                </div>

                <div className="space-y-6">
                  <MagnetEffect>
                    <div className="flex items-center space-x-4 p-4 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 hover:border-red-500/50 transition-all duration-300">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Ubicación</p>
                        <p className="text-gray-300">{project.location}</p>
                      </div>
                    </div>
                  </MagnetEffect>

                  <MagnetEffect>
                    <div className="flex items-center space-x-4 p-4 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 hover:border-red-500/50 transition-all duration-300">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Año</p>
                        <p className="text-gray-300">{project.year}</p>
                      </div>
                    </div>
                  </MagnetEffect>

                  {project.area && (
                    <MagnetEffect>
                      <div className="flex items-center space-x-4 p-4 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 hover:border-red-500/50 transition-all duration-300">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                          <Square className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">Superficie</p>
                          <p className="text-gray-300">{project.area} m²</p>
                        </div>
                      </div>
                    </MagnetEffect>
                  )}

                  {project.client && (
                    <MagnetEffect>
                      <div className="flex items-center space-x-4 p-4 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 hover:border-red-500/50 transition-all duration-300">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">Cliente</p>
                          <p className="text-gray-300">{project.client}</p>
                        </div>
                      </div>
                    </MagnetEffect>
                  )}
                </div>
              </div>

              {/* Categoría */}
              <div className="flex items-center space-x-4">
                <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 text-sm font-semibold capitalize">
                  {project.category}
                </Badge>
                {project.featured && (
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 text-sm font-semibold">
                    Destacado
                  </Badge>
                )}
              </div>
            </div>

            {/* Carrusel de Imágenes */}
            <div className="lg:col-span-2">
              <ImageCarousel
                images={displayImages}
                onImageClick={openLightbox}
                projectTitle={project.title}
                category={project.category}
              />
            </div>
          </div>

          {/* Contenido Detallado */}
          {project.content && project.content.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center relative">
                Sobre el Proyecto
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-red-500 to-orange-500"></div>
              </h2>

              <div className="prose prose-lg prose-invert max-w-none">
                <PortableText
                  value={project.content}
                  components={{
                    types: {
                      image: ({ value }) => (
                        <MagnetEffect>
                          <div className="my-12 rounded-2xl overflow-hidden border border-gray-800/50 hover:border-red-500/50 transition-all duration-300">
                            <Image
                              src={getImageUrl(value, 1200, 800) || "/placeholder.svg"}
                              alt={value.alt || "Imagen del proyecto"}
                              width={1200}
                              height={800}
                              className="w-full h-auto hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        </MagnetEffect>
                      ),
                    },
                    block: {
                      normal: ({ children }) => (
                        <p className="text-gray-300 leading-relaxed text-lg mb-6">{children}</p>
                      ),
                      h2: ({ children }) => <h2 className="text-2xl font-bold text-white mt-12 mb-6">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-xl font-semibold text-white mt-8 mb-4">{children}</h3>,
                    },
                    list: {
                      bullet: ({ children }) => (
                        <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">{children}</ul>
                      ),
                    },
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-gray-900 to-black border-t border-gray-800/50">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">¿Tienes un proyecto en mente?</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Nos encantaría conocer tus ideas y ayudarte a hacerlas realidad con la misma calidad y dedicación.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <MagnetEffect>
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-4 text-lg font-semibold group"
                asChild
              >
                <Link href="/#contacto">
                  Contactar Ahora
                  <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </Button>
            </MagnetEffect>

            <MagnetEffect>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold bg-transparent"
                asChild
              >
                <Link href="/#portfolio">Ver Más Proyectos</Link>
              </Button>
            </MagnetEffect>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <ImageLightbox
        images={displayImages}
        isOpen={lightboxOpen}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setLightboxIndex}
        projectTitle={project.title}
        category={project.category}
      />
    </div>
  )
}
