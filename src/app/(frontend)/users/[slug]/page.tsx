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
  const users = await payload.find({
    collection: 'users',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
  })

  return users.docs
    .filter((user) => typeof user.id === 'string')
    .map((user) => ({
      slug: user.id,
    }))
}

type Args = {
  params: Promise<{
    slug: string
  }>
}

export default async function UserPage(args: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await args.params
  const url = `/users/${slug}`

  const user = await queryUserById({ id: slug, draft })

  if (!user) return <PayloadRedirects url={url} />

  return (
    <article className="pt-0 pb-24">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />

      <section className="w-full flex justify-center mt-16">
        <div className="w-full max-w-3xl px-6 flex flex-col items-center text-center">
          {user.avatar && typeof user.avatar === 'object' && (
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden mb-6 border border-border shadow-lg bg-background flex items-center justify-center">
              <Media
                resource={user.avatar}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">{user.name}</h1>

          {user.position && <p className="text-sm text-muted-foreground mb-4">{user.position}</p>}

          {user.about && (
            <div className="mt-6 max-w-prose w-full">
              <RichText data={user.about} />
            </div>
          )}
        </div>
      </section>
    </article>
  )
}

export async function generateMetadata(args: Args): Promise<Metadata> {
  const { slug } = await args.params
  const user = await queryUserById({ id: slug, draft: false })
  return generateMeta({ doc: user })
}

const queryUserById = async ({ id, draft }: { id: string; draft: boolean }) => {
  const payload = await getPayload({ config: configPromise })

  try {
    const user = await payload.findByID({
      collection: 'users',
      id,
      draft,
    })

    return user || null
  } catch (err) {
    console.error('Error fetching user by ID:', err)
    return null
  }
}
