import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { Media } from '@/components/Media'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import type { Post, Category } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from '../../[slug]/page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const categories = await payload.find({
    collection: 'categories',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return categories.docs
    .filter((category) => typeof category.slug === 'string')
    .map((category) => ({
      slug: category.slug!,
    }))
}

type Args = {
  params: Promise<{
    slug: string
  }>
}

export default async function CategoryPage(args: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await args.params
  const url = `/categories/${slug}`
  const category = await queryCategoryBySlug({ slug, draft })

  if (!category) return <PayloadRedirects url={url} />

  // Get posts for this category
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    where: {
      categories: {
        in: [category.id],
      },
    },
  })

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {/* Category Hero */}
      <div className="relative -mt-[10.4rem] flex items-end">
        <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8">
          <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
            <div className="uppercase text-sm mb-6">Category</div>

            <div className="">
              <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{category.title}</h1>
            </div>

            {category.description && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Description</p>
                <p>{category.description}</p>
              </div>
            )}
          </div>
        </div>
        <div className="min-h-[80vh] select-none">
          {category.image && typeof category.image !== 'string' && (
            <Media fill priority imgClassName="-z-10 object-cover" resource={category.image} />
          )}
          <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          {category.about && (
            <RichText
              className="max-w-[48rem] mx-auto mb-12"
              data={category.about}
              enableGutter={false}
            />
          )}

          <div className="container mb-8">
            <PageRange
              collection="posts"
              currentPage={posts.page}
              limit={12}
              totalDocs={posts.totalDocs}
            />
          </div>

          <CollectionArchive docs={posts.docs as (Post | Category)[]} />

          <div className="container">
            {posts.totalPages > 1 && posts.page && (
              <Pagination page={posts.page} totalPages={posts.totalPages} />
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata(args: Args): Promise<Metadata> {
  const { slug } = await args.params
  const category = await queryCategoryBySlug({ slug, draft: false })

  return generateMeta({ doc: category })
}

const queryCategoryBySlug = cache(async ({ slug, draft }: { slug: string; draft: boolean }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'categories',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
