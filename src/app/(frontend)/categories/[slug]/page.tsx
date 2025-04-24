import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { Media } from '@/components/Media'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from '../../[slug]/page.client'
import RichText from '@/components/RichText'

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

  return (
    <article className="pt-0 pb-24">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />

      <section className="w-full flex justify-center mt-12">
        <div className="relative w-full max-w-4xl h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
          {category.image && typeof category.image === 'object' && (
            <>
              <Media
                resource={category.image}
                className="absolute inset-0 object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/40" />
            </>
          )}
        </div>
      </section>

      <div className="w-full max-w-4xl mx-auto text-center mt-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{category.title}</h1>

        {category.about && (
          <RichText
            className="text-muted-foreground text-lg leading-relaxed"
            data={category.about}
          />
        )}
      </div>
    </article>
  )
}

export async function generateMetadata(args: Args): Promise<Metadata> {
  const { slug } = await args.params
  const category = await queryCategoryBySlug({ slug, draft: false })

  return generateMeta({ doc: category })
}

const queryCategoryBySlug = async ({ slug, draft }: { slug: string; draft: boolean }) => {
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
}
