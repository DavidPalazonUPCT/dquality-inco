import type { Image } from "sanity"

export interface SanityProject {
  _id: string
  _createdAt: string
  title: string
  slug: {
    current: string
  }
  category: "residencial" | "industrial" | "chalets" | "restauracion"
  mainImage: Image
  gallery?: Image[]
  description: string
  content?: any[]
  location: string
  year: string
  area?: number
  client?: string
  featured: boolean
  publishedAt: string
}

export interface SanityService {
  _id: string
  title: string
  description: string
  icon: string
  order: number
}
