import { defineField, defineType } from "sanity"

export const serviceType = defineType({
  name: "service",
  title: "Servicio",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icono",
      type: "string",
      options: {
        list: [
          { title: "Diseño Arquitectónico", value: "palette" },
          { title: "Construcción", value: "hammer" },
          { title: "Restauración", value: "building2" },
          { title: "Coordinación", value: "users" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Orden",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
})
