import type { SanityProject, SanityService } from "@/types/sanity"

// Mockdata completa para servicios
export const mockServices: SanityService[] = [
  {
    _id: "service-1",
    title: "Diseño Arquitectónico",
    description:
      "Proyectos únicos que combinan funcionalidad y estética, adaptados a las necesidades específicas de cada cliente.",
    icon: "palette",
    order: 1,
  },
  {
    _id: "service-2",
    title: "Ejecución de Obras",
    description: "Construcción integral con los más altos estándares de calidad y cumplimiento de plazos establecidos.",
    icon: "hammer",
    order: 2,
  },
  {
    _id: "service-3",
    title: "Restauración",
    description: "Rehabilitación y restauración de edificios históricos preservando su valor patrimonial.",
    icon: "building2",
    order: 3,
  },
  {
    _id: "service-4",
    title: "Coordinación de Gremios",
    description: "Gestión completa de todos los oficios involucrados en el proyecto para garantizar la excelencia.",
    icon: "users",
    order: 4,
  },
]

// Mockdata completa para proyectos con contenido detallado
export const mockProjects: SanityProject[] = [
  {
    _id: "project-1",
    _createdAt: "2023-01-01",
    title: "Residencial San Adrián",
    slug: { current: "residencial-san-adrian" },
    category: "residencial",
    mainImage: null, // No fake asset reference
    gallery: null, // No fake gallery
    description: "Complejo residencial moderno con 24 viviendas de alta calidad y diseño contemporáneo.",
    content: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "El proyecto Residencial San Adrián representa la perfecta fusión entre diseño contemporáneo y funcionalidad práctica. Este complejo de 24 viviendas ha sido concebido para ofrecer el máximo confort a sus residentes, incorporando las últimas tendencias en arquitectura sostenible.",
          },
        ],
        style: "normal",
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Características principales del proyecto:",
          },
        ],
        style: "h2",
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "• Diseño bioclimático que aprovecha la orientación solar\n• Materiales de alta calidad y bajo impacto ambiental\n• Espacios comunitarios integrados en el diseño\n• Sistema de domótica en todas las viviendas\n• Zonas verdes y espacios de recreación",
          },
        ],
        style: "normal",
      },
    ],
    location: "San Adrián, España",
    year: "2023",
    area: 2400,
    client: "Ayuntamiento de San Adrián",
    featured: true,
    publishedAt: "2023-01-01",
  },
  {
    _id: "project-2",
    _createdAt: "2023-01-01",
    title: "Nave Industrial Arquitania",
    slug: { current: "nave-industrial-arquitania" },
    category: "industrial",
    mainImage: null,
    gallery: null,
    description: "Construcción de nave industrial de 5.000m² con tecnología sostenible y eficiencia energética.",
    content: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "La Nave Industrial Arquitania es un proyecto pionero en sostenibilidad industrial. Con 5.000m² de superficie, esta instalación incorpora las más avanzadas tecnologías en eficiencia energética y gestión ambiental.",
          },
        ],
        style: "normal",
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Innovaciones implementadas:",
          },
        ],
        style: "h2",
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "• Paneles solares integrados en la cubierta\n• Sistema de recuperación de aguas pluviales\n• Iluminación LED con sensores de movimiento\n• Aislamiento térmico de alta eficiencia\n• Certificación LEED Gold",
          },
        ],
        style: "normal",
      },
    ],
    location: "Polígono Industrial Norte",
    year: "2023",
    area: 5000,
    client: "Arquitania S.L.",
    featured: true,
    publishedAt: "2023-01-01",
  },
  {
    _id: "project-3",
    _createdAt: "2022-01-01",
    title: "Villa Privada con Pérgola",
    slug: { current: "villa-privada-pergola" },
    category: "chalets",
    mainImage: null,
    gallery: null,
    description: "Diseño y construcción de villa de lujo con pérgola curva de madera y piscina infinita.",
    content: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Esta villa privada destaca por su diseño arquitectónico único, donde la pérgola curva de madera se convierte en el elemento protagonista que unifica todos los espacios exteriores.",
          },
        ],
        style: "normal",
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Elementos destacados:",
          },
        ],
        style: "h2",
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "• Pérgola curva de madera laminada\n• Piscina infinita con vistas panorámicas\n• Jardín mediterráneo con especies autóctonas\n• Terrazas en diferentes niveles\n• Sistema de iluminación arquitectónica",
          },
        ],
        style: "normal",
      },
    ],
    location: "Costa del Sol, Málaga",
    year: "2022",
    area: 450,
    client: "Cliente Privado",
    featured: false,
    publishedAt: "2022-01-01",
  },
  {
    _id: "project-4",
    _createdAt: "2022-01-01",
    title: "Restauración Finca Histórica",
    slug: { current: "restauracion-finca-historica" },
    category: "restauracion",
    mainImage: null,
    gallery: null,
    description: "Restauración integral de finca del siglo XVIII respetando la arquitectura tradicional.",
    content: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "La restauración de esta finca histórica del siglo XVIII ha sido un proyecto de gran complejidad técnica y sensibilidad patrimonial. Cada intervención ha sido cuidadosamente planificada para preservar la esencia arquitectónica original.",
          },
        ],
        style: "normal",
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Trabajos de restauración:",
          },
        ],
        style: "h2",
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "• Consolidación de muros de mampostería\n• Restauración de cubiertas con teja árabe original\n• Recuperación de elementos decorativos\n• Instalaciones modernas integradas discretamente\n• Jardines históricos rehabilitados",
          },
        ],
        style: "normal",
      },
    ],
    location: "Centro Histórico, Toledo",
    year: "2022",
    area: 800,
    client: "Fundación Patrimonio Histórico",
    featured: false,
    publishedAt: "2022-01-01",
  },
  {
    _id: "project-5",
    _createdAt: "2023-01-01",
    title: "Villa Mediterránea",
    slug: { current: "villa-mediterranea" },
    category: "chalets",
    mainImage: null,
    gallery: null,
    description: "Villa de lujo con arquitectura mediterránea contemporánea y vistas al mar.",
    content: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Esta villa mediterránea combina la tradición arquitectónica de la región con las comodidades y el diseño contemporáneo. Situada en una ubicación privilegiada con vistas al mar, cada espacio ha sido diseñado para maximizar la conexión con el entorno natural.",
          },
        ],
        style: "normal",
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Características distintivas:",
          },
        ],
        style: "h2",
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "• Grandes ventanales con vistas panorámicas\n• Patios interiores con vegetación mediterránea\n• Piscina integrada en el diseño paisajístico\n• Materiales naturales: piedra, madera y cerámica\n• Espacios de transición interior-exterior",
          },
        ],
        style: "normal",
      },
    ],
    location: "Costa Mediterránea, Valencia",
    year: "2023",
    area: 380,
    client: "Cliente Internacional",
    featured: false,
    publishedAt: "2023-01-01",
  },
  {
    _id: "project-6",
    _createdAt: "2023-06-01",
    title: "Complejo Residencial Moderno",
    slug: { current: "complejo-residencial-moderno" },
    category: "residencial",
    mainImage: null,
    gallery: null,
    description: "Desarrollo residencial de 48 viviendas con diseño minimalista y espacios comunitarios.",
    content: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Este complejo residencial representa la evolución del concepto de vivienda comunitaria, integrando espacios privados y compartidos en un diseño cohesivo y funcional.",
          },
        ],
        style: "normal",
      },
    ],
    location: "Zona Metropolitana, Madrid",
    year: "2023",
    area: 3200,
    client: "Promotora Inmobiliaria",
    featured: true,
    publishedAt: "2023-06-01",
  },
]

// Función para obtener imagen de fallback según categoría
export const getProjectFallbackImage = (category: string) => {
  switch (category) {
    case "residencial":
      return "/images/project-residential.jpg"
    case "industrial":
      return "/images/project-industrial.jpg"
    case "chalets":
      return "/images/project-terrace.jpg"
    case "restauracion":
      return "/images/project-restoration.jpg"
    default:
      return "/images/project-villa.jpg"
  }
}

// Función para obtener múltiples imágenes de galería
export const getProjectGalleryImages = (category: string, count = 3) => {
  const baseImage = getProjectFallbackImage(category)
  return Array.from({ length: count }, (_, index) => baseImage)
}

// Función para crear imágenes mock para el carrusel
export const createMockGallery = (category: string, count = 4) => {
  return Array.from({ length: count }, (_, index) => ({
    _type: "image" as const,
    asset: null, // No fake asset reference
  }))
}
