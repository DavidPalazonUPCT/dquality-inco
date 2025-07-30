import createImageUrlBuilder from "@sanity/image-url"
import type { Image } from "sanity"

import { dataset, projectId } from "../env"

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
})

export const urlForImage = (source: Image) => {
  if (!projectId || !dataset) {
    console.warn("Sanity project ID or dataset not configured")
    return null
  }
  return imageBuilder?.image(source).auto("format").fit("max")
}
