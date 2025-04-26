// src/payload/hooks/revalidateCategory.ts
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { Category } from '../../../payload-types' // Asegúrate que el import sea correcto

export const revalidateCategory: CollectionAfterChangeHook<Category> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context?.disableRevalidate) {
    const pathsToRevalidate = [`/categories`, `/categories/${doc.slug}`]

    for (const path of pathsToRevalidate) {
      payload.logger.info(`Revalidating category at path: ${path}`)
      revalidatePath(path)
    }

    revalidateTag('categories-sitemap')
  }

  return doc
}

export const revalidateCategoryDelete: CollectionAfterDeleteHook<Category> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context?.disableRevalidate) {
    const pathsToRevalidate = [`/categories`, `/categories/${doc.slug}`]

    for (const path of pathsToRevalidate) {
      payload.logger.info(`Revalidating deleted category at path: ${path}`)
      revalidatePath(path)
    }

    revalidateTag('categories-sitemap')
  }

  return doc
}
