import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { User } from '../../../payload-types'

export const revalidateUser: CollectionAfterChangeHook<User> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context?.disableRevalidate) {
    const pathsToRevalidate = [`/users`, `/users/${doc.slug}`, `/`]

    for (const path of pathsToRevalidate) {
      payload.logger.info(`Revalidating user at path: ${path}`)
      revalidatePath(path)
    }

    revalidateTag('users-sitemap')
  }

  return doc
}

export const revalidateUserDelete: CollectionAfterDeleteHook<User> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context?.disableRevalidate) {
    const pathsToRevalidate = [`/users`, `/users/${doc.slug}`, `/`]

    for (const path of pathsToRevalidate) {
      payload.logger.info(`Revalidating deleted user at path: ${path}`)
      revalidatePath(path)
    }
    revalidateTag('users-sitemap')
  }

  return doc
}
