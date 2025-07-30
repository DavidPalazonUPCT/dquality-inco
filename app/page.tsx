"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Building2,
  Hammer,
  Palette,
  Users,
  Award,
  MapPin,
  Calendar,
  Phone,
  Mail,
  ArrowRight,
  ChevronDown,
} from "lucide-react"
import { getProjects, getServices } from "@/lib/sanity/fetch"
import { urlForImage } from "@/sanity/lib/image"
import { getProjectFallbackImage } from "@/lib/mockdata"
import type { SanityProject, SanityService } from "@/types/sanity"
import CertificatesCarousel from "@/components/CertificatesCarousel"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("todos")
  const [scrollY, setScrollY] = useState(0)
  const [projects, setProjects] = useState<SanityProject[]>([])
  const [services, setServices] = useState<SanityService[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        console.log("🔄 Iniciando carga de datos...")

        const [projectsData, servicesData] = await Promise.all([getProjects(), getServices()])

        setProjects(projectsData)
        setServices(servicesData)

        console.log(`✅ Datos cargados: ${projectsData.length} proyectos, ${servicesData.length} servicios`)
      } catch (error) {
        console.error("❌ Error cargando datos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredProjects =
    activeFilter === "todos" ? projects : projects.filter((project) => project.category === activeFilter)

  // Función para obtener el icono correcto
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "palette":
        return Palette
      case "hammer":
        return Hammer
      case "building2":
        return Building2
      case "users":
        return Users
      default:
        return Building2
    }
  }

  // Función para obtener URL de imagen con fallback
  const getImageUrl = (project: SanityProject) => {
    // If no valid image asset, use fallback
    if (!project.mainImage?.asset?._ref || project.mainImage.asset._ref === null) {
      return getProjectFallbackImage(project.category)
    }

    // Only use Sanity image URL builder for real Sanity assets
    try {
      return urlForImage(project.mainImage)?.width(600).height(400).url() || getProjectFallbackImage(project.category)
    } catch (error) {
      console.warn("Error processing image URL, using fallback:", error)
      return getProjectFallbackImage(project.category)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Transparente Mejorado */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-700">
        <div
          className={`transition-all duration-700 ${
            scrollY > 50 ? "bg-black/80 backdrop-blur-xl shadow-2xl border-b border-red-500/30" : "bg-transparent"
          }`}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center h-24">
              {/* Logo Más Grande y a la Izquierda */}
              <Link href="/" className="flex items-center space-x-3 group mr-auto">
                <div className="relative">
                  <Image
                    src="/images/logo-dquality.png"
                    alt="DQuality InCo"
                    width={280}
                    height={100}
                    className="h-16 w-auto transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute -inset-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 blur-sm"></div>
                </div>
              </Link>

              {/* Desktop Navigation - Centrado */}
              <nav className="hidden lg:flex items-center justify-center flex-1">
                <div className="flex items-center space-x-12">
                  <Link
                    href="#inicio"
                    className="nav-link text-white/90 hover:text-red-400 font-medium text-sm tracking-widest uppercase font-mono px-4 py-2 rounded-lg"
                  >
                    Inicio
                  </Link>
                  <Link
                    href="#servicios"
                    className="nav-link text-white/90 hover:text-red-400 font-medium text-sm tracking-widest uppercase font-mono px-4 py-2 rounded-lg"
                  >
                    Servicios
                  </Link>
                  <Link
                    href="#portfolio"
                    className="nav-link text-white/90 hover:text-red-400 font-medium text-sm tracking-widest uppercase font-mono px-4 py-2 rounded-lg"
                  >
                    Portfolio
                  </Link>
                  <Link
                    href="#nosotros"
                    className="nav-link text-white/90 hover:text-red-400 font-medium text-sm tracking-widest uppercase font-mono px-4 py-2 rounded-lg"
                  >
                    Nosotros
                  </Link>
                  <Link
                    href="#contacto"
                    className="nav-link text-white/90 hover:text-red-400 font-medium text-sm tracking-widest uppercase font-mono px-4 py-2 rounded-lg"
                  >
                    Contacto
                  </Link>
                </div>
              </nav>

              {/* CTA Button */}
              <div className="hidden lg:block ml-auto">
                
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-3 text-white/90 hover:text-red-400 transition-colors duration-300 ml-auto"
              >
                <div className="relative w-6 h-6">
                  <span
                    className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? "rotate-45 top-3" : "top-1"}`}
                  ></span>
                  <span
                    className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 top-3 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
                  ></span>
                  <span
                    className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? "-rotate-45 top-3" : "top-5"}`}
                  ></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`lg:hidden transition-all duration-500 overflow-hidden ${
              isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-black/90 backdrop-blur-xl border-t border-red-500/30">
              <nav className="container mx-auto px-4 py-6 space-y-4">
                <Link
                  href="#inicio"
                  className="block text-white/90 hover:text-red-400 font-medium text-sm tracking-wide uppercase font-mono py-3 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </Link>
                <Link
                  href="#servicios"
                  className="block text-white/90 hover:text-red-400 font-medium text-sm tracking-wide uppercase font-mono py-3 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Servicios
                </Link>
                <Link
                  href="#portfolio"
                  className="block text-white/90 hover:text-red-400 font-medium text-sm tracking-wide uppercase font-mono py-3 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Portfolio
                </Link>
                <Link
                  href="#nosotros"
                  className="block text-white/90 hover:text-red-400 font-medium text-sm tracking-wide uppercase font-mono py-3 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Nosotros
                </Link>
                <Link
                  href="#contacto"
                  className="block text-white/90 hover:text-red-400 font-medium text-sm tracking-wide uppercase font-mono py-3 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contacto
                </Link>
                <div className="pt-4">
                  <Button
                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-6 py-3 text-sm font-semibold tracking-wide uppercase font-mono"
                    asChild
                  >
                    <Link href="#contacto" onClick={() => setIsMenuOpen(false)}>
                      Consulta Gratis
                    </Link>
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section con Parallax Mejorado */}
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 parallax-smooth"
          style={{
            transform: `translate3d(0, ${scrollY * 0.3}px, 0) scale(${1 + scrollY * 0.0003})`,
          }}
        >
          <Image
            src="/images/hero-architecture.jpg"
            alt="Arquitectura moderna DQuality"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 grid-pattern opacity-30" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-block">
              <span className="text-sm font-mono tracking-widest text-red-400 uppercase mb-4 block">
                // Arquitectura & Construcción
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tight leading-none">
              <span className="block font-thin">CONSTRUIMOS</span>
              <span className="block font-normal">SORPRENDEMOS</span>
              <span className="block font-bold shadow">INSPIRAMOS</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Del papel a la realidad, <span className="text-red-400 font-medium">redefiniendo horizontes</span> con más
              de 30 años de experiencia
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-10 py-4 text-lg font-bold tracking-wide uppercase font-mono group shadow-2xl hover:shadow-red-500/25 transition-all duration-300"
                asChild
              >
                <Link href="#portfolio">
                  Ver Proyectos
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 px-10 py-4 text-lg font-bold tracking-wide uppercase font-mono bg-transparent backdrop-blur-sm hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="#contacto">Contactar</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="flex flex-col items-center space-y-2">
            <ChevronDown size={32} className="text-red-400" />
            <span className="text-xs font-mono tracking-widest text-gray-400 uppercase">Scroll</span>
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section id="servicios" className="py-20 lg:py-32 bg-gray-50 relative">
        <div className="absolute inset-0 grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 lg:px-6 relative">
          <div className="text-center mb-16">
            <span className="text-sm font-mono tracking-widest text-red-600 uppercase mb-4 block">
              // Nuestros Servicios
            </span>
            <h2 className="text-3xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight">
              SOLUCIONES <span className="text-gradient">INTEGRALES</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Ofrecemos soluciones completas en arquitectura y construcción, desde el diseño conceptual hasta la entrega
              final del proyecto con tecnología de vanguardia.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-6"></div>
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => {
                const IconComponent = getServiceIcon(service.icon)
                return (
                  <Card
                    key={service._id}
                    className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm hover:bg-white hover:-translate-y-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-8 text-center relative">
                      <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 rounded-xl group-hover:from-red-600 group-hover:to-orange-600 transition-all duration-500 group-hover:scale-110">
                        <IconComponent className="h-8 w-8 text-red-600 group-hover:text-white transition-colors duration-500" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 font-mono tracking-wide uppercase">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{service.description}</p>
                      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
        <div className="container mx-auto px-4 lg:px-6 relative">
          <div className="text-center mb-16">
            <span className="text-sm font-mono tracking-widest text-red-600 uppercase mb-4 block">
              // Nuestro Portfolio
            </span>
            <h2 className="text-3xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight">
              PROYECTOS <span className="text-gradient">DESTACADOS</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              Descubre algunos de nuestros proyectos más destacados que reflejan nuestra pasión por la excelencia
              arquitectónica y la innovación tecnológica.
            </p>

            {/* Filtros */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {["todos", "residencial", "industrial", "chalets", "restauracion"].map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "default" : "outline"}
                  onClick={() => setActiveFilter(filter)}
                  className={`capitalize font-mono tracking-wide transition-all duration-300 ${
                    activeFilter === filter
                      ? "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-lg"
                      : "text-gray-700 hover:text-red-600 border-gray-300 hover:border-red-500 hover:bg-red-50"
                  }`}
                >
                  {filter === "todos" ? "Todos" : filter}
                </Button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="animate-pulse overflow-hidden">
                  <div className="h-64 bg-gray-200"></div>
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <Link
                  key={project._id}
                  href={`/proyectos/${project.slug?.current || project._id}`}
                  className="block group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 cursor-pointer hover:-translate-y-2">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={getImageUrl(project) || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                      <Badge className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-orange-600 text-white capitalize font-mono text-xs tracking-wide">
                        {project.category}
                      </Badge>

                      {/* Tech-style overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="bg-white/10 backdrop-blur-md rounded-full p-4 border border-white/20 group-hover:scale-110 transition-transform duration-300">
                          <ArrowRight className="h-6 w-6 text-white" />
                        </div>
                      </div>

                      {/* Grid overlay */}
                      <div className="absolute inset-0 grid-pattern opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </div>
                    <CardContent className="p-6 bg-white group-hover:bg-gray-50 transition-colors duration-300">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors font-mono tracking-wide">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">{project.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 font-mono">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-red-500" />
                          {project.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-red-500" />
                          {project.year}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-10 py-4 text-lg font-bold tracking-wide uppercase font-mono shadow-2xl hover:shadow-red-500/25 transition-all duration-300"
            >
              Ver Todos los Proyectos
            </Button>
          </div>
        </div>
      </section>

      {/* Nosotros Section Expandida */}
      <section id="nosotros" className="py-20 lg:py-32 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 lg:px-6 relative">
          {/* Header de la sección */}
          <div className="text-center mb-20">
            <span className="text-sm font-mono tracking-widest text-red-400 uppercase mb-4 block">
              // Sobre Nosotros
            </span>
            <h2 className="text-3xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              UN CAMINO DE MÁS DE <span className="text-gradient">30 AÑOS</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              De experiencia construyendo sueños y superando expectativas
            </p>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="text-center stat-item opacity-0">
              <div className="rounded-2xl p-8 hover-lift bg-transparent">
                <div className="text-5xl font-black text-white mb-2">+30</div>
                <div className="text-sm font-mono tracking-widest text-red-100 uppercase">Años de Experiencia</div>
              </div>
            </div>
            <div className="text-center stat-item opacity-0">
              <div className="bg-transparent rounded-2xl p-8 hover-lift">
                <div className="text-5xl font-black text-white mb-2">+50</div>
                <div className="text-sm font-mono tracking-widest text-orange-100 uppercase">Proyectos Completados</div>
              </div>
            </div>
            <div className="text-center stat-item opacity-0">
              <div className="bg-transparent rounded-2xl p-8 hover-lift">
                <div className="text-5xl font-black text-white mb-2">12</div>
                <div className="text-sm font-mono tracking-widest text-red-100 uppercase">Miembros del Equipo</div>
              </div>
            </div>
          </div>

          {/* Contenido Principal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h3 className="text-3xl font-black text-white mb-6 tracking-tight">
                DQUALITY <span className="text-gradient">INCO</span>
              </h3>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                En DQuality, la satisfacción del cliente es nuestra máxima prioridad. Nos esforzamos por superar tus
                expectativas en términos de calidad, plazos y servicio al cliente. Nuestro compromiso con la
                transparencia y la comunicación abierta garantiza que estés informado en cada etapa del proceso,
                brindándote la tranquilidad que necesitas para disfrutar del viaje de construcción.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden relative">
                <Image src="/images/hero-architecture.jpg" alt="Equipo DQuality" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20"></div>
                <div className="absolute inset-0 grid-pattern opacity-30"></div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-full opacity-20 blur-xl"></div>
            </div>
          </div>

          {/* Nuestro Equipo Real */}
          <div className="mb-20">
            <h3 className="text-3xl font-black text-white mb-6 tracking-tight text-center">
              NUESTRO <span className="text-gradient">EQUIPO</span>
            </h3>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed text-center max-w-4xl mx-auto">
              Un equipo de profesionales experimentados y comprometidos que trabajan juntos para hacer realidad cada
              proyecto con la máxima calidad y dedicación.
            </p>

            {/* Grid del Equipo */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[
                {
                  name: "David Piña",
                  role: "Cofundador & CEO",
                  description: "Liderazgo estratégico y visión empresarial",
                  gradient: "from-red-600 to-orange-600",
                },
                {
                  name: "Jose Fco. Moya",
                  role: "Cofundador & Arquitecto Técnico e Ingeniero de la Edificación",
                  description: "Expertise técnico y supervisión arquitectónica",
                  gradient: "from-orange-600 to-red-600",
                },
                {
                  name: "Héctor Sánchez",
                  role: "Cofundador & Maestro de Estructuras Metálicas",
                  description: "Especialista en estructuras y construcción metálica",
                  gradient: "from-red-600 to-orange-600",
                },
                {
                  name: "Raúl Jaramillo",
                  role: "Jefe de Obra",
                  description: "Coordinación y supervisión de proyectos en campo",
                  gradient: "from-orange-600 to-red-600",
                },
                {
                  name: "Mariano Gallego",
                  role: "Diseñador",
                  description: "Creatividad y desarrollo de conceptos arquitectónicos",
                  gradient: "from-red-600 to-orange-600",
                },
                {
                  name: "Ángel David Moya",
                  role: "Jefe de Compras y Marketing",
                  description: "Gestión de recursos y estrategia comercial",
                  gradient: "from-orange-600 to-red-600",
                },
              ].map((member, index) => (
                <div key={index} className="group hover-lift">
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 group-hover:border-red-500/50 transition-all duration-500 text-center">
                    {/* Avatar con iniciales */}
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${member.gradient} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <span className="text-white font-black text-xl">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>

                    {/* Información del miembro */}
                    <h4 className="text-xl font-bold text-white mb-2 font-mono tracking-wide">{member.name}</h4>
                    <p className="text-red-400 font-semibold mb-4 text-sm leading-tight">{member.role}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{member.description}</p>

                    {/* Decoración */}
                    <div className="mt-6 flex justify-center">
                      <div className="w-12 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mensaje del equipo */}
            <div className="text-center bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30">
              <p className="text-lg text-red-400 font-mono tracking-wide mb-4">
                "Juntos construimos más que edificios, construimos sueños"
              </p>
              <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Cada miembro de nuestro equipo aporta su experiencia única y pasión por la excelencia, trabajando en
                perfecta armonía para superar las expectativas en cada proyecto.
              </p>
            </div>
          </div>

          {/* Nuestra Filosofía */}
          <div className="mb-20">
            <h3 className="text-3xl font-black text-white mb-6 tracking-tight text-center">
              NUESTRA <span className="text-gradient">FILOSOFÍA</span>
            </h3>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed text-center max-w-5xl mx-auto">
              Nuestra filosofía de empresa se basa en la excelencia, la innovación y el compromiso con nuestros
              clientes. Nos esforzamos por superar las expectativas en cada proyecto, brindando soluciones creativas,
              calidad impecable y un servicio excepcional en todas nuestras interacciones. Creemos en la transparencia,
              la integridad y el trabajo en equipo, cultivando relaciones duraderas con nuestros clientes, colaboradores
              y comunidades donde operamos.
            </p>
          </div>

          {/* Nuestros Servicios Expandido */}
          <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-gray-800 overflow-hidden my-0 py-10 pb-[0] pt-0een relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-gray-800 overflow-hidden my-0 py-10 pb-[4]">
            <h3 className="text-3xl font-black text-white mb-6 tracking-tight text-center">
              NUESTROS <span className="text-gradient">SERVICIOS</span>
            </h3>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed text-center max-w-5xl mx-auto">
              Nuestros servicios abarcan todas las etapas de construcción, desde el diseño inicial hasta la entrega
              final del proyecto. Nos especializamos en la construcción de viviendas, edificaciones comerciales,
              instalación de piscinas y reformas. Además, ofrecemos soluciones personalizadas, garantizando calidad y
              satisfacción en cada proyecto.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Award,
                  title: "Calidad Garantizada",
                  description: "Más de 30 años de experiencia respaldando cada proyecto con tecnología de vanguardia.",
                },
                {
                  icon: Users,
                  title: "Equipo Experto",
                  description: "Profesionales altamente cualificados en cada área con formación continua.",
                },
                {
                  icon: Building2,
                  title: "Proyectos Únicos",
                  description:
                    "Cada obra es diseñada específicamente para nuestros clientes con soluciones innovadoras.",
                },
                {
                  icon: Hammer,
                  title: "Construcción Integral",
                  description: "Desde viviendas hasta edificaciones comerciales, piscinas y reformas completas.",
                },
              ].map((item, index) => (
                <div key={index} className="text-center group hover-lift">
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 group-hover:border-red-500/50 transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-4 font-mono tracking-wide">{item.title}</h4>
                    <p className="text-gray-400 leading-relaxed text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificados Carousel */}
          <CertificatesCarousel />
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="absolute inset-0 grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 lg:px-6 relative">
          <div className="text-center mb-16">
            <span className="text-sm font-mono tracking-widest text-red-600 uppercase mb-4 block">// Contacto</span>
            <h2 className="text-3xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight">
              HABLEMOS DE TU <span className="text-gradient">PROYECTO</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              ¿Tienes un proyecto en mente? Nos encantaría conocer tus ideas y ayudarte a hacerlas realidad con
              tecnología de vanguardia.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 font-mono tracking-wide">INFORMACIÓN DE CONTACTO</h3>
              <div className="space-y-8">
                {[
                  { icon: Phone, title: "Teléfono", info: "+34 XXX XXX XXX" },
                  { icon: Mail, title: "Email", info: "info@dqualityinco.com" },
                  { icon: MapPin, title: "Dirección", info: "Dirección de la empresa" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-6 group">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 font-mono tracking-wide">{item.title}</h4>
                      <p className="text-gray-600">{item.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="nombre"
                      className="block text-sm font-bold text-gray-700 mb-2 font-mono tracking-wide uppercase"
                    >
                      Nombre
                    </label>
                    <Input
                      id="nombre"
                      placeholder="Tu nombre"
                      className="border-gray-300 focus:border-red-500 focus:ring-red-500 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold text-gray-700 mb-2 font-mono tracking-wide uppercase"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="border-gray-300 focus:border-red-500 focus:ring-red-500 transition-colors duration-300"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="asunto"
                    className="block text-sm font-bold text-gray-700 mb-2 font-mono tracking-wide uppercase"
                  >
                    Asunto
                  </label>
                  <Input
                    id="asunto"
                    placeholder="Asunto del mensaje"
                    className="border-gray-300 focus:border-red-500 focus:ring-red-500 transition-colors duration-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="mensaje"
                    className="block text-sm font-bold text-gray-700 mb-2 font-mono tracking-wide uppercase"
                  >
                    Mensaje
                  </label>
                  <Textarea
                    id="mensaje"
                    placeholder="Cuéntanos sobre tu proyecto..."
                    rows={6}
                    className="border-gray-300 focus:border-red-500 focus:ring-red-500 transition-colors duration-300"
                  />
                </div>
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-4 text-lg font-bold tracking-wide uppercase font-mono shadow-xl hover:shadow-red-500/25 transition-all duration-300"
                >
                  Enviar Mensaje
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 lg:px-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Image
                src="/images/logo-dquality.png"
                alt="DQuality InCo"
                width={200}
                height={60}
                className="h-12 w-auto mb-6 brightness-0 invert"
              />
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Construimos espacios que inspiran y perduran en el tiempo, combinando diseño innovador con la más alta
                calidad constructiva y tecnología de vanguardia.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Q</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 font-mono tracking-wide uppercase">Enlaces</h4>
              <ul className="space-y-3 text-gray-400">
                {["Inicio", "Servicios", "Portfolio", "Nosotros"].map((link) => (
                  <li key={link}>
                    <Link
                      href={`#${link.toLowerCase()}`}
                      className="hover:text-red-400 transition-colors duration-300 font-mono text-sm tracking-wide"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 font-mono tracking-wide uppercase">Contacto</h4>
              <ul className="space-y-3 text-gray-400 font-mono text-sm">
                <li>+34 XXX XXX XXX</li>
                <li>info@dqualityinco.com</li>
                <li>Dirección de la empresa</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 font-mono text-sm tracking-wide">
              &copy; {new Date().getFullYear()} DQuality InCo. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
