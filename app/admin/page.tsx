"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Save, Eye } from "lucide-react"
import { getProjects, getServices } from "@/lib/sanity/fetch"
import type { SanityProject, SanityService } from "@/types/sanity"

export default function AdminPage() {
  const [projects, setProjects] = useState<SanityProject[]>([])
  const [services, setServices] = useState<SanityService[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<SanityProject | null>(null)

  // Estado del formulario
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    year: "",
    area: "",
    client: "",
    featured: false,
    mainImage: null as File | null,
    gallery: [] as File[],
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [projectsData, servicesData] = await Promise.all([getProjects(), getServices()])
      setProjects(projectsData)
      setServices(servicesData)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (field: string, files: FileList | null) => {
    if (!files) return

    if (field === "mainImage") {
      setFormData((prev) => ({ ...prev, mainImage: files[0] }))
    } else if (field === "gallery") {
      setFormData((prev) => ({ ...prev, gallery: Array.from(files) }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar a Sanity
    console.log("Datos del formulario:", formData)
    alert("¡Proyecto guardado! (En desarrollo - se conectará a Sanity)")
    setIsDialogOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      description: "",
      location: "",
      year: "",
      area: "",
      client: "",
      featured: false,
      mainImage: null,
      gallery: [],
    })
    setEditingProject(null)
  }

  const handleEdit = (project: SanityProject) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      location: project.location,
      year: project.year,
      area: project.area?.toString() || "",
      client: project.client || "",
      featured: project.featured,
      mainImage: null,
      gallery: [],
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (projectId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este proyecto?")) {
      // Aquí iría la lógica para eliminar de Sanity
      console.log("Eliminando proyecto:", projectId)
      alert("¡Proyecto eliminado! (En desarrollo)")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/images/logo-dquality.png"
                alt="DQuality InCo"
                width={150}
                height={50}
                className="h-8 w-auto"
              />
              <Badge variant="secondary">Panel de Administración</Badge>
            </div>
            <Button variant="outline" asChild>
              <a href="/" target="_blank" rel="noreferrer">
                <Eye className="h-4 w-4 mr-2" />
                Ver Web
              </a>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración DQuality</h1>
          <p className="text-gray-600">Gestiona fácilmente los proyectos y servicios de tu empresa</p>
        </div>

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-400">
            <TabsTrigger value="projects">Proyectos</TabsTrigger>
            <TabsTrigger value="services">Servicios</TabsTrigger>
          </TabsList>

          {/* Tab de Proyectos */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Gestionar Proyectos</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Proyecto
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingProject ? "Editar Proyecto" : "Crear Nuevo Proyecto"}</DialogTitle>
                    <DialogDescription>
                      Completa la información del proyecto. Los campos marcados con * son obligatorios.
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Título */}
                    <div>
                      <Label htmlFor="title">Título del Proyecto *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        placeholder="Ej: Residencial San Adrián"
                        required
                      />
                    </div>

                    {/* Categoría */}
                    <div>
                      <Label htmlFor="category">Categoría *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residencial">Residencial</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                          <SelectItem value="chalets">Chalets</SelectItem>
                          <SelectItem value="restauracion">Restauración</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Descripción */}
                    <div>
                      <Label htmlFor="description">Descripción *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Describe el proyecto de forma atractiva..."
                        rows={4}
                        required
                      />
                    </div>

                    {/* Ubicación y Año */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="location">Ubicación *</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          placeholder="Ej: San Adrián, España"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="year">Año *</Label>
                        <Input
                          id="year"
                          value={formData.year}
                          onChange={(e) => handleInputChange("year", e.target.value)}
                          placeholder="Ej: 2023"
                          required
                        />
                      </div>
                    </div>

                    {/* Superficie y Cliente */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="area">Superficie (m²)</Label>
                        <Input
                          id="area"
                          value={formData.area}
                          onChange={(e) => handleInputChange("area", e.target.value)}
                          placeholder="Ej: 2400"
                          type="number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="client">Cliente</Label>
                        <Input
                          id="client"
                          value={formData.client}
                          onChange={(e) => handleInputChange("client", e.target.value)}
                          placeholder="Ej: Ayuntamiento de San Adrián"
                        />
                      </div>
                    </div>

                    {/* Imagen Principal */}
                    <div>
                      <Label htmlFor="mainImage">Imagen Principal *</Label>
                      <div className="mt-2">
                        <Input
                          id="mainImage"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload("mainImage", e.target.files)}
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Sube una imagen de alta calidad (recomendado: 1920x1080px)
                        </p>
                      </div>
                    </div>

                    {/* Galería */}
                    <div>
                      <Label htmlFor="gallery">Galería de Imágenes</Label>
                      <div className="mt-2">
                        <Input
                          id="gallery"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleImageUpload("gallery", e.target.files)}
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Puedes seleccionar múltiples imágenes para la galería
                        </p>
                      </div>
                    </div>

                    {/* Proyecto Destacado */}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) => handleInputChange("featured", checked)}
                      />
                      <Label htmlFor="featured">Marcar como proyecto destacado</Label>
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end space-x-4 pt-4">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button type="submit">
                        <Save className="h-4 w-4 mr-2" />
                        {editingProject ? "Actualizar" : "Crear"} Proyecto
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Lista de Proyectos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading
                ? [...Array(6)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <div className="h-48 bg-gray-200"></div>
                      <CardContent className="p-4">
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded"></div>
                      </CardContent>
                    </Card>
                  ))
                : projects.map((project) => (
                    <Card key={project._id} className="overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={`/images/project-${project.category}.jpg`}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                        {project.featured && <Badge className="absolute top-2 left-2 bg-red-600">Destacado</Badge>}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{project.title}</h3>
                          <Badge variant="outline" className="capitalize">
                            {project.category}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                          <span>{project.location}</span>
                          <span>{project.year}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(project)}>
                            <Edit className="h-3 w-3 mr-1" />
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(project._id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Eliminar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
            </div>
          </TabsContent>

          {/* Tab de Servicios */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Gestionar Servicios</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Servicio
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => (
                <Card key={service._id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {service.title}
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
