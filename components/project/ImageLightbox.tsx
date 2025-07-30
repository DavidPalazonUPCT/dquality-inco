"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from "lucide-react"
import { urlForImage } from "@/sanity/lib/image"
import { getProjectFallbackImage } from "@/lib/mockdata"
import type { Image as SanityImage } from "sanity"

interface ImageLightboxProps {
  images: SanityImage[]
  isOpen: boolean
  currentIndex: number
  onClose: () => void
  onIndexChange: (index: number) => void
  projectTitle: string
  category?: string
}

export default function ImageLightbox({
  images,
  isOpen,
  currentIndex,
  onClose,
  onIndexChange,
  projectTitle,
  category = "residencial",
}: ImageLightboxProps) {
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Función para obtener URL de imagen con fallback
  const getImageUrl = (image: any, width = 1920, height = 1080) => {
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          goToPrevious()
          break
        case "ArrowRight":
          goToNext()
          break
        case "+":
        case "=":
          zoomIn()
          break
        case "-":
          zoomOut()
          break
        case "r":
        case "R":
          rotate()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentIndex])

  const resetTransform = () => {
    setScale(1)
    setRotation(0)
    setPosition({ x: 0, y: 0 })
  }

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length
    onIndexChange(newIndex)
    resetTransform()
  }

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % images.length
    onIndexChange(newIndex)
    resetTransform()
  }

  const zoomIn = () => {
    setScale((prev) => Math.min(prev * 1.5, 5))
  }

  const zoomOut = () => {
    setScale((prev) => Math.max(prev / 1.5, 0.5))
  }

  const rotate = () => {
    setRotation((prev) => prev + 90)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  if (!isOpen || images.length === 0) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="flex items-center justify-between">
          <div className="text-white">
            <h3 className="text-lg font-semibold">{projectTitle}</h3>
            <p className="text-gray-400 text-sm">
              {currentIndex + 1} de {images.length}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {/* Controles de Zoom y Rotación */}
            <Button
              onClick={zoomOut}
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
              size="sm"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>

            <Button
              onClick={zoomIn}
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
              size="sm"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>

            <Button
              onClick={rotate}
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
              size="sm"
            >
              <RotateCw className="h-4 w-4" />
            </Button>

            <Button
              onClick={onClose}
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
              size="sm"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Imagen Principal */}
      <div
        className="absolute inset-0 flex items-center justify-center p-20 cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="relative max-w-full max-h-full transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
          }}
        >
          <Image
            src={getImageUrl(images[currentIndex], 1920, 1080) || "/placeholder.svg"}
            alt={`${projectTitle} - Imagen ${currentIndex + 1}`}
            width={1920}
            height={1080}
            className="max-w-full max-h-full object-contain"
            priority
          />
        </div>
      </div>

      {/* Controles de Navegación */}
      {images.length > 1 && (
        <>
          <Button
            onClick={goToPrevious}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 w-12 h-12 p-0"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            onClick={goToNext}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 w-12 h-12 p-0"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Miniaturas en la parte inferior */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-full overflow-x-auto px-6">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                onIndexChange(index)
                resetTransform()
              }}
              className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
                index === currentIndex ? "border-red-500 scale-110" : "border-gray-600 hover:border-gray-400"
              }`}
            >
              <Image
                src={getImageUrl(image, 200, 200) || "/placeholder.svg"}
                alt={`Miniatura ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Instrucciones */}
      <div className="absolute bottom-6 left-6 text-gray-400 text-sm space-y-1">
        <p>← → Navegar</p>
        <p>+ - Zoom</p>
        <p>R Rotar</p>
        <p>ESC Cerrar</p>
      </div>
    </div>
  )
}
