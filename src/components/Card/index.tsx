'use client'

import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import { Media } from '@/components/Media'
import type { Post, Category, User } from '@/payload-types'

export type CardDoc = Partial<Post> | Partial<Category> | Partial<User>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardDoc
  relationTo?: 'posts' | 'categories' | 'users'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories } = props

  if (!doc) return null

  const isPost = (doc: CardDoc): doc is Partial<Post> => 'meta' in doc
  const isCategory = (doc: CardDoc): doc is Partial<Category> => 'title' in doc && !('meta' in doc)
  const isUser = (doc: CardDoc): doc is Partial<User> => 'name' in doc

  const slug = 'slug' in doc ? doc.slug : ''
  const categories = isPost(doc) ? doc.categories : undefined
  const titleToUse =
    props.title ||
    (isPost(doc) && doc.title) ||
    (isCategory(doc) && doc.title) ||
    (isUser(doc) && doc.name) ||
    'Untitled'

  const image =
    (isPost(doc) && doc.meta?.image) ||
    (isUser(doc) && doc.avatar) ||
    (isCategory(doc) && doc.image) ||
    undefined

  const description =
    (isPost(doc) && doc.meta?.description) ||
    (isUser(doc) && doc.description) ||
    (isCategory(doc) && doc.description) ||
    ''

  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const hasCategories = Array.isArray(categories) && categories.length > 0
  const href = `/${relationTo}/${slug || doc?.id}`

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full">
        {!image && <div className="">No image</div>}
        {image && typeof image !== 'string' && <Media resource={image} size="33vw" />}
      </div>
      <div className="p-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && 'title' in category) {
                const categoryTitle = category.title || 'Untitled category'
                const isLast = index === categories.length - 1
                return (
                  <Fragment key={index}>
                    {categoryTitle}
                    {!isLast && <Fragment>, &nbsp;</Fragment>}
                  </Fragment>
                )
              }
              return null
            })}
          </div>
        )}
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && (
          <div className="mt-2">
            <p>{sanitizedDescription}</p>
          </div>
        )}
      </div>
    </article>
  )
}
