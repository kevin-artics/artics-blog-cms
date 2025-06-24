import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { Media } from '@/components/Media'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from '../../[slug]/page.client'
import RichText from '@/components/RichText'
import Link from 'next/link'

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

  // Get categories where this user is a researcher
  const payload = await getPayload({ config: configPromise })
  const userCategories = await payload.find({
    collection: 'categories',
    depth: 1,
    limit: 1000,
    overrideAccess: false,
    where: {
      researchers: {
        in: [user.id],
      },
    },
  })

  return (
    <article className="pt-0 pb-24">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />

      <section className="w-full flex justify-center mt-20">
        <div className="w-full max-w-2xl px-6">
          {/* Profile Header */}
          <div className="text-center mb-16">
            {user.avatar && typeof user.avatar === 'object' && (
              <div className="relative w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden border border-border">
                <Media
                  resource={user.avatar}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            )}

            <h1 className="text-3xl font-semibold text-foreground mb-3">{user.name}</h1>

            {user.position && (
              <p className="text-base text-muted-foreground font-medium">{user.position}</p>
            )}
          </div>

          {/* About Section */}
          {user.about && (
            <div className="prose prose-neutral max-w-none mb-16">
              <RichText data={user.about} />
            </div>
          )}

          {/* Projects Section */}
          {userCategories.docs && userCategories.docs.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">Proyectos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userCategories.docs.map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    className="group block"
                  >
                    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      {category.image && typeof category.image === 'object' && (
                        <div className="aspect-video relative overflow-hidden">
                          <Media
                            resource={category.image}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {category.title}
                        </h3>
                        {category.description && (
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {category.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
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
