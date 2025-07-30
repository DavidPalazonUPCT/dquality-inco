"use client"

import { useState } from "react"
import Image from "next/image"

interface Certificate {
  id: string
  name: string
  image: string
}

const certificates: Certificate[] = [
  {
    id: "iso-45001",
    name: "ISO 45001",
    image: "/images/certificado-iso-45001.png",
  },
  {
    id: "iso-9001",
    name: "ISO 9001",
    image: "/images/certificado-iso-9001.png",
  },
  {
    id: "iso-14001",
    name: "ISO 14001",
    image: "/images/certificado-iso-14001.png",
  },
]

export default function CertificatesCarousel() {
  const [isPaused, setIsPaused] = useState(false)

  // Duplicamos los certificados múltiples veces para crear un loop infinito suave
  const infiniteCertificates = [...certificates, ...certificates, ...certificates, ...certificates]

  return (
