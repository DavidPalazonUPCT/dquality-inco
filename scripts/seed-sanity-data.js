import { createClient } from "@sanity/client"

const client = createClient({
  projectId: "hg6pkgw1",
  dataset: "production",
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN, // Necesitarás generar un token
  apiVersion: "2024-01-30",
})

// Datos de ejemplo para servicios
const services = [
  {
    _type: "service",
    title: "Diseño Arquitectónico",
    description:
      "Proyectos únicos que combinan funcionalidad y estética, adaptados a las necesidades específicas de cada cliente.",
    icon: "palette",
    order: 1,
  },
  {
    _type: "service",
    title: "Ejecución de Obras",
    description: "Construcción integral con los más altos estándares de calidad y cumplimiento de plazos establecidos.",
    icon: "hammer",
    order: 2,
  },
  {
    _type: "service",
    title: "Restauración",
    description: "Rehabilitación y restauración de edificios históricos preservando su valor patrimonial.",
    icon: "building2",
    order: 3,
  },
  {
    _type: "service",
    title: "Coordinación de Gremios",
    description: "Gestión completa de todos los oficios involucrados en el proyecto para garantizar la excelencia.",
    icon: "users",
    order: 4,
  },
]

// Función para crear servicios
async function createServices() {
  try {
    for (const service of services) {
      const result = await client.create(service)
      console.log(`Servicio creado: ${result.title}`)
    }
    console.log("✅ Servicios creados exitosamente")
  } catch (error) {
    console.error("❌ Error creando servicios:", error)
  }
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  createServices()
}

export { createServices }
