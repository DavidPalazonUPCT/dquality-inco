import { notFound } from "next/navigation"
import { getProjectBySlug, getProjects } from "@/lib/sanity/fetch"
import ProjectTemplate from "@/components/project/ProjectTemplate"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({
    slug: project.slug.current,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    return {
      title: "Proyecto no encontrado - DQuality InCo",
    }
  }

  return {
    title: `${project.title} - DQuality InCo`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return <ProjectTemplate project={project} />
}
