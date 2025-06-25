'use client'

import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ImageMedia } from '@/components/Media/ImageMedia'
import type { Media } from '@/payload-types'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props
  const [logoMedia, setLogoMedia] = useState<Media | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await fetch('/api/media/logo')
        if (response.ok) {
          const data = await response.json()
          setLogoMedia(data)
        }
      } catch (error) {
        console.error('Error fetching logo:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLogo()
  }, [])

  if (isLoading) {
    return (
      <div
        className={clsx(
          'w-auto',
          'h-[50px]',
          'sm:h-[50px]',
          'md:h-[60px]',
          'lg:h-[80px]',
          'xl:h-[80px]',
          'bg-gray-200 animate-pulse',
          className,
        )}
      />
    )
  }

  if (!logoMedia) {
    // Fallback si no se encuentra el logo en media
    return (
      <Image
        alt="Payload Logo"
        loading={loading}
        priority={priority === 'high'}
        className={clsx(
          'w-auto',
          'h-[50px]',
          'sm:h-[50px]',
          'md:h-[60px]',
          'lg:h-[80px]',
          'xl:h-[80px]',
          className,
        )}
        src="/media/logo.png"
        width={200}
        height={80}
      />
    )
  }

  return (
    <ImageMedia
      resource={logoMedia}
      alt={logoMedia.alt || 'Logo'}
      imgClassName={clsx(
        'w-auto',
        'h-[50px]',
        'sm:h-[50px]',
        'md:h-[60px]',
        'lg:h-[80px]',
        'xl:h-[80px]',
        className,
      )}
      loading={loading}
      priority={priority === 'high'}
    />
  )
}
