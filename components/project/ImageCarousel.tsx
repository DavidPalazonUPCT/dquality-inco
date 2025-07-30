"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { urlForImage } from "@/sanity/lib/image"
import { getProjectFallbackImage } from "@/lib/mockdata"
import type { Image as SanityImage } from "sanity"
import MagnetEffect from "./MagnetEffect"

interface ImageCarouselProps {
  images: SanityImage[]
  onImageClick: (index: number) => void
  projectTitle: string
  category?: string
}

export default function ImageCarousel({
  images,
  onImageClick,
  projectTitle,
  category = "residencial",
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, images.length])

  // Función para obtener URL de imagen con fallback
  const getImageUrl = (image: any, width = 1200, height = 800) => {
    // If no valid image asset, use fallback
    if (!image?.asset?._ref || image.asset._ref === null) {
      return getProjectFallbackImage(category)
    }

    // Only use Sanity image URL builder for real Sanity assets
    try {
      return urlForImage(image)?.width(width).height(height).url() || getProjectFallbackImage(category)
    } catch (error) {
      console.warn("Error processing image URL, using fallback:", error)
      return getProjectFallbackImage(category)
    }
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  if (images.length === 0) return null

  return (
    <div className="relative group">
      {/* Carrusel Principal */}
      <div
        className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden border border-gray-800/50 hover:border-red-500/50 transition-all duration-300"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <Image
          src={getImageUrl(images[currentIndex], 1200, 800) || "/placeholder.svg"}
          alt={`${projectTitle} - Imagen ${currentIndex + 1}`}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
        />

        {/* Overlay con Botón de Zoom */}
        <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
          <MagnetEffect>
            <Button
              onClick={() => onImageClick(currentIndex)}
              className="opacity-0 group-hover:opacity-100 bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300 transform scale-90 group-hover:scale-100"
            >
              <ZoomIn className="h-5 w-5 mr-2" />
              Ampliar
            </Button>
          </MagnetEffect>
        </div>

        {/* Controles de Navegación */}
        {images.length > 1 && (
          <>
            <MagnetEffect>
              <Button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-black/50 backdrop-blur-sm border border-white/20 text-white hover:bg-black/70 transition-all duration-300 w-12 h-12 p-0"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </MagnetEffect>

            <MagnetEffect>
              <Button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-black/50 backdrop-blur-sm border border-white/20 text-white hover:bg-black/70 transition-all duration-300 w-12 h-12 p-0"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </MagnetEffect>
          </>
        )}

        {/* Indicadores */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        )}

        {/* Contador */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="mt-6 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {images.map((image, index) => (
            <MagnetEffect key={index}>
              <button
                onClick={() => goToSlide(index)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  index === currentIndex ? "border-red-500 scale-105" : "border-gray-700 hover:border-gray-500"
                }`}
              >
                <Image
                  src={getImageUrl(image, 200, 200) || "/placeholder.svg"}
                  alt={`${projectTitle} - Miniatura ${index + 1}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
                {index === currentIndex && <div className="absolute inset-0 bg-red-500/20"></div>}
              </button>
            </MagnetEffect>
          ))}
        </div>
      )}
    </div>
  )
}
