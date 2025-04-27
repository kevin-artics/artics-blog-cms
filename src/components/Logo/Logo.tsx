import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Payload Logo"
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx(
        'w-auto',
        'h-[50px]',
        'sm:h-[50px]',
        'md:h-[60px]',
        'lg:h-[80px]',
        'xl:h-[100px]',
        className,
      )}
      src={`${process.env.NEXT_PUBLIC_VERCEL_BLOB_BASE_URL}/logo.png`}
    />
  )
}
