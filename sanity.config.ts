import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"

import { apiVersion } from "./sanity/env"
import { schema } from "./sanity/schemaTypes"

export default defineConfig({
  name: "dquality-inco",
  title: "DQuality InCo - Panel de Administración",
  basePath: "/studio",
  projectId: "hg6pkgw1",
  dataset: "production",
  apiVersion: "2024-01-30",
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenido")
          .items([
            S.listItem()
              .title("Proyectos")
              .child(S.documentTypeList("project").title("Proyectos").filter('_type == "project"')),
            S.listItem()
              .title("Servicios")
              .child(S.documentTypeList("service").title("Servicios").filter('_type == "service"')),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
