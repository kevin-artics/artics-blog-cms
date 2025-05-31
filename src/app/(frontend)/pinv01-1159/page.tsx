'use client'

import { useState, ChangeEvent, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import dynamic from 'next/dynamic'
import {
  MapPin,
  Droplet,
  Thermometer,
  Settings,
  ListOrdered,
  Gauge,
  Eye,
  Bug,
  Clock,
} from 'lucide-react'
import { LeafletMouseEvent } from 'leaflet'
import { useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
  ssr: false,
})
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), {
  ssr: false,
})
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false })

export default function PInv011159Page() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [base64Image, setBase64Image] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [showImages, setShowImages] = useState<boolean>(false)
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [, setDragCounter] = useState<number>(0)
  const [roboflowResult, setRoboflowResult] = useState<{
    image: { width: number; height: number }
    predictions: {
      x: number
      y: number
      width: number
      height: number
      class: string
      confidence: number
      detection_id: string
      time: number
    }[]
  } | null>(null)

  const [waterQuality, setWaterQuality] = useState({
    turbidity: '',
    ph: '',
    temperature: '',
    notes: '',
  })

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

    reader.onloadend = async () => {
      const base64String = reader.result as string

      setOriginalImage(URL.createObjectURL(file))
      setBase64Image(base64String)

      try {
        const formData = new FormData()
        formData.append('file', file)

        const response = await axios({
          method: 'POST',
          url: 'https://detect.roboflow.com/macroinvertebrados-acuaticos/1',
          params: {
            api_key: '2RLyVNicgMaHTfkWIqNl',
          },
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        console.log('Roboflow result:', response.data)
        setRoboflowResult({
          image: response.data.image,
          predictions: response.data.predictions,
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error('Error al llamar a Roboflow:', error.message)
      }

      setLoading(false)
      setTimeout(() => setShowImages(true), 100)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setWaterQuality((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegister = () => {
    const result = {
      originalImage: base64Image,
      processedImage: base64Image,
      coordinates,
      waterQuality,
    }

    console.log('Registro:', result)
  }

  function LocationMarker({
    coordinates,
    setCoordinates,
  }: {
    coordinates: { lat: number; lng: number } | null
    setCoordinates: (coords: { lat: number; lng: number } | null) => void
  }) {
    const [icon, setIcon] = useState<L.Icon | null>(null)

    useEffect(() => {
      async function loadIcon() {
        const L = (await import('leaflet')).default

        const newIcon = L.icon({
          iconUrl: '/marker-icon.png',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        })

        setIcon(newIcon)
      }

      loadIcon()
    }, [])

    useMapEvents({
      click: (e: LeafletMouseEvent) => {
        setCoordinates({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        })
      },
    })

    if (!coordinates || !icon) return null

    return <Marker position={[coordinates.lat, coordinates.lng]} icon={icon} />
  }

  const predictionSummary: Record<string, { count: number; confidence: number[] }> = {}

  if (roboflowResult?.predictions) {
    for (const pred of roboflowResult.predictions) {
      const label = pred.class

      if (!predictionSummary[label]) {
        predictionSummary[label] = { count: 0, confidence: [] }
      }

      const entry = predictionSummary[label]
      entry.count += 1
      entry.confidence.push(pred.confidence)
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

        {/* Images and Form */}
        {!loading && originalImage && base64Image && (
          <div
            className={cn(
              'flex flex-col gap-20 mt-20 transition-opacity duration-700 ease-in-out',
              showImages ? 'opacity-100' : 'opacity-0',
            )}
          >
            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="flex flex-col items-center text-center gap-6">
                <h2 className="text-xl font-bold">Imagen Original</h2>
                <div className="relative w-full aspect-square rounded-md overflow-hidden border border-border bg-background">
                  <Image src={originalImage} alt="Imagen original" fill className="object-cover" />
                </div>
              </div>
              <div className="flex flex-col items-center text-center gap-6">
                <h2 className="text-xl font-bold">Predicción</h2>
                <div className="relative w-full aspect-square rounded-md overflow-hidden border border-border bg-background">
                  <Image src={base64Image} alt="Imagen base64" fill className="object-cover" />

                  {roboflowResult?.predictions.map((box, i) => {
                    const scaleX = 100 / roboflowResult.image.width
                    const scaleY = 100 / roboflowResult.image.height

                    const left = (box.x - box.width / 2) * scaleX
                    const top = (box.y - box.height / 2) * scaleY
                    const width = box.width * scaleX
                    const height = box.height * scaleY

                    return (
                      <div
                        key={box.detection_id}
                        className="absolute border-2 border-red-500 bg-red-500/10 text-xs text-red-800 font-semibold pointer-events-none"
                        style={{
                          left: `${left}%`,
                          top: `${top}%`,
                          width: `${width}%`,
                          height: `${height}%`,
                        }}
                      >
                        <div className="bg-red-500 text-white px-1 absolute top-0 left-0">
                          {box.class} ({(box.confidence * 100).toFixed(1)}%)
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            {roboflowResult && (
              <div className="mt-10 flex flex-col gap-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ListOrdered className="w-5 h-5" /> Resumen de Detecciones
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(predictionSummary).map(([label, data]) => {
                    const averageConfidence =
                      data.confidence.reduce((sum, c) => sum + c, 0) / data.confidence.length

                    return (
                      <div
                        key={label}
                        className="border border-border rounded-md p-4 bg-muted/20 flex flex-col gap-2"
                      >
                        <div className="flex items-center gap-2 text-base font-semibold">
                          <Bug className="w-4 h-4 text-primary" />
                          <span>{label}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Eye className="w-4 h-4" />
                          <span>Cantidad: {data.count}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Gauge className="w-4 h-4" />
                          <span>Confianza Promedio: {(averageConfidence * 100).toFixed(1)}%</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>Tiempo de ejecución: {(averageConfidence * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Map */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <MapPin className="w-5 h-5" /> Seleccionar ubicación
              </h2>
              <div className="w-full h-80 rounded-md overflow-hidden border border-border">
                <MapContainer
                  center={[-23.4425, -58.4438]}
                  zoom={5}
                  scrollWheelZoom={true}
                  className="w-full h-full"
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <LocationMarker coordinates={coordinates} setCoordinates={setCoordinates} />
                </MapContainer>
              </div>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <Droplet className="w-4 h-4" /> Turbidez (NTU)
                </label>
                <input
                  type="number"
                  name="turbidity"
                  value={waterQuality.turbidity}
                  onChange={handleInputChange}
                  className="border rounded-md p-2 bg-background text-foreground"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <Settings className="w-4 h-4" /> pH
                </label>
                <input
                  type="number"
                  name="ph"
                  value={waterQuality.ph}
                  onChange={handleInputChange}
                  className="border rounded-md p-2 bg-background text-foreground"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <Thermometer className="w-4 h-4" /> Temperatura (°C)
                </label>
                <input
                  type="number"
                  name="temperature"
                  value={waterQuality.temperature}
                  onChange={handleInputChange}
                  className="border rounded-md p-2 bg-background text-foreground"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="flex items-center gap-2 text-sm">
                  <Settings className="w-4 h-4" /> Notas adicionales
                </label>
                <textarea
                  name="notes"
                  value={waterQuality.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="border rounded-md p-2 bg-background text-foreground resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleRegister}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
              >
                Registrar Resultados
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
