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

  const tags = isCategory(doc) ? doc.tags : undefined

  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const hasCategories = Array.isArray(categories) && categories.length > 0
  const hasTags = Array.isArray(tags) && tags.length > 0
  const href = `/${relationTo}/${slug || doc?.id}`

  return (
    <article
      className={cn(
        'hover:cursor-pointer flex flex-col',
        isUser(doc)
          ? 'items-center text-center'
          : 'border border-border rounded-lg overflow-hidden bg-card h-full',
        className,
      )}
      ref={card.ref}
    >
      {isUser(doc) ? (
        <>
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-border bg-card mb-6">
            {!image && (
              <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                No image
              </div>
            )}
            {image && typeof image !== 'string' && (
              <Media resource={image} size="160px" className="w-full h-full object-cover" />
            )}
          </div>
          <div className="text-center max-w-[200px]">
            {titleToUse && (
              <div className="prose">
                <h3 className="text-xl font-semibold">
                  <Link className="not-prose" href={href} ref={link.ref}>
                    {titleToUse}
                  </Link>
                </h3>
              </div>
            )}
            {description && (
              <div className="mt-3">
                <p className="text-base text-muted-foreground">{sanitizedDescription}</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="relative w-full h-48 overflow-hidden">
            {!image && (
              <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                No image
              </div>
            )}
            {image && typeof image !== 'string' && (
              <div className="absolute inset-0">
                <Media
                  resource={image}
                  size="100vw"
                  className="absolute w-full h-full object-cover object-center"
                  imgClassName="min-w-full min-h-full hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
          </div>
          <div className="p-4 flex-1 flex flex-col">
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
              <div className="prose flex-1">
                <h3>
                  <Link className="not-prose" href={href} ref={link.ref}>
                    {titleToUse}
                  </Link>
                </h3>
              </div>
            )}
            {description && (
              <div className="mt-2 flex-1">
                <p>{sanitizedDescription}</p>
              </div>
            )}
            {/* Tags pill for categories only */}
            {isCategory(doc) && hasTags && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {tags?.map((tag, index) => {
                    if (typeof tag === 'object' && 'name' in tag) {
                      const tagName = tag.name || 'Untitled tag'
                      return (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary-foreground border border-secondary/20"
                        >
                          {tagName}
                        </span>
                      )
                    }
                    return null
                  })}
                </div>
              </div>
            )}
            {/* Category pill for posts only */}
            {isPost(doc) && hasCategories && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {categories?.map((category, index) => {
                    if (typeof category === 'object' && 'title' in category) {
                      const categoryTitle = category.title || 'Untitled category'
                      return (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                        >
                          {categoryTitle}
                        </span>
                      )
                    }
                    return null
                  })}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </article>
  )
}
