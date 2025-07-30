import { client } from "@/sanity/lib/client"
import type { SanityProject, SanityService } from "@/types/sanity"
import { projectsQuery, featuredProjectsQuery, projectBySlugQuery, servicesQuery } from "./queries"
import { mockProjects, mockServices, createMockGallery } from "@/lib/mockdata"

// Flag para controlar si usar mockdata
const USE_MOCKDATA = true // Cambia a false cuando Sanity esté configurado

export async function getProjects(): Promise<SanityProject[]> {
  if (USE_MOCKDATA) {
    console.log("🔄 Usando mockdata para proyectos")
    // Add mock gallery to projects
    return mockProjects.map((project) => ({
      ...project,
      gallery: createMockGallery(project.category, 4),
    }))
  }

  try {
    const projects = await client.fetch(projectsQuery)
    console.log("✅ Datos de Sanity cargados correctamente")
    return projects || []
  } catch (error) {
    console.warn("⚠️ Error conectando con Sanity, usando mockdata:", error)
    return mockProjects.map((project) => ({
      ...project,
      gallery: createMockGallery(project.category, 4),
    }))
  }
}

export async function getFeaturedProjects(): Promise<SanityProject[]> {
  if (USE_MOCKDATA) {
    console.log("🔄 Usando mockdata para proyectos destacados")
    return mockProjects
      .filter((project) => project.featured)
      .map((project) => ({
        ...project,
        gallery: createMockGallery(project.category, 4),
      }))
  }

  try {
    const projects = await client.fetch(featuredProjectsQuery)
    console.log("✅ Proyectos destacados de Sanity cargados")
    return projects || []
  } catch (error) {
    console.warn("⚠️ Error conectando con Sanity, usando mockdata para destacados:", error)
    return mockProjects
      .filter((project) => project.featured)
      .map((project) => ({
        ...project,
        gallery: createMockGallery(project.category, 4),
      }))
  }
}

export async function getProjectBySlug(slug: string): Promise<SanityProject | null> {
  if (USE_MOCKDATA) {
    console.log(`🔄 Buscando proyecto con slug: ${slug} en mockdata`)
    const project = mockProjects.find((p) => p.slug.current === slug)
    if (project) {
      return {
        ...project,
        gallery: createMockGallery(project.category, 4),
      }
    }
    return null
  }

  try {
    const project = await client.fetch(projectBySlugQuery, { slug })
    console.log(`✅ Proyecto ${slug} cargado desde Sanity`)
    return project || null
  } catch (error) {
    console.warn(`⚠️ Error buscando proyecto ${slug} en Sanity, usando mockdata:`, error)
    const project = mockProjects.find((p) => p.slug.current === slug)
    if (project) {
      return {
        ...project,
        gallery: createMockGallery(project.category, 4),
      }
    }
    return null
  }
}

export async function getServices(): Promise<SanityService[]> {
  if (USE_MOCKDATA) {
    console.log("🔄 Usando mockdata para servicios")
    return mockServices
  }

  try {
    const services = await client.fetch(servicesQuery)
    console.log("✅ Servicios de Sanity cargados correctamente")
    return services || []
  } catch (error) {
    console.warn("⚠️ Error conectando con Sanity, usando mockdata para servicios:", error)
    return mockServices
  }
}

// Función helper para verificar si estamos usando mockdata
export function isUsingMockdata(): boolean {
  return USE_MOCKDATA
}

// Función para cambiar entre mockdata y Sanity
export function toggleMockdata(useMock: boolean): void {
  // Esta función se puede usar para cambiar dinámicamente
  console.log(`🔄 Cambiando a ${useMock ? "mockdata" : "Sanity"}`)
}
