import { groq } from "next-sanity"

export const projectsQuery = groq`
  *[_type == "project"] | order(publishedAt desc) {
    _id,
    _createdAt,
    title,
    slug,
    category,
    mainImage,
    gallery,
    description,
    location,
    year,
    area,
    client,
    featured,
    publishedAt
  }
`

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(publishedAt desc) [0...6] {
    _id,
    _createdAt,
    title,
    slug,
    category,
    mainImage,
    description,
    location,
    year,
    featured
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    slug,
    category,
    mainImage,
    gallery,
    description,
    content,
    location,
    year,
    area,
    client,
    featured,
    publishedAt
  }
`

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    description,
    icon,
    order
  }
`
