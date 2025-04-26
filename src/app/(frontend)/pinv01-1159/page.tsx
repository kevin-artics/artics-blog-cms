'use client'

import { useState, ChangeEvent } from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'

export default function PInv011159Page() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [base64Image, setBase64Image] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [showImages, setShowImages] = useState<boolean>(false)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [, setDragCounter] = useState<number>(0)

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      await processImage(file)
    }
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    setDragCounter(0)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      await processImage(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragCounter((prev) => prev + 1)
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragCounter((prev) => {
      const newCounter = prev - 1
      if (newCounter === 0) {
        setIsDragging(false)
      }
      return newCounter
    })
  }

  const processImage = async (file: File) => {
    setLoading(true)
    setShowImages(false)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      const base64String = reader.result as string
      setOriginalImage(URL.createObjectURL(file))
      setBase64Image(base64String)
      setLoading(false)
      setTimeout(() => setShowImages(true), 100)
    }
  }

  return (
    <div className="pt-24 pb-24">
      <div className="container">
        {/* Dropzone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          className={cn(
            'border-2 border-dashed border-border rounded-xl p-10 flex flex-col items-center justify-center text-center transition',
            isDragging && 'border-primary bg-muted',
          )}
        >
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center gap-4 w-full h-full"
          >
            <h1 className="text-2xl font-semibold pointer-events-none">Subir Imagen</h1>
            <p className="text-muted-foreground text-sm pointer-events-none">
              Arrastra una imagen o haz clic para seleccionarla
            </p>
            <div className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm">
              Seleccionar imagen
            </div>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Loader */}
        {loading && (
          <div className="flex items-center justify-center mt-16">
            <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-sm text-primary">Convirtiendo imagen...</span>
          </div>
        )}

        {/* Images */}
        {!loading && originalImage && base64Image && (
          <div
            className={cn(
              'grid grid-cols-1 md:grid-cols-2 gap-16 mt-20 transition-opacity duration-700 ease-in-out',
              showImages ? 'opacity-100' : 'opacity-0',
            )}
          >
            <div className="flex flex-col items-center text-center gap-6">
              <h2 className="text-xl font-bold">Imagen Original</h2>
              <div className="relative w-full aspect-square rounded-md overflow-hidden border border-border bg-background">
                <Image src={originalImage} alt="Imagen original" fill className="object-cover" />
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-6">
              <h2 className="text-xl font-bold">Imagen Procesada</h2>
              <div className="relative w-full aspect-square rounded-md overflow-hidden border border-border bg-background">
                <Image src={base64Image} alt="Imagen Procesada" fill className="object-cover" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
