import { cn } from '@/utilities/ui'
import React from 'react'
import { Card } from '@/components/Card'
import type { Post, Category, User } from '@/payload-types'

export type Props = {
  docs: (Post | Category | User)[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { docs } = props

  const getRelationTo = (doc: Post | Category | User): 'posts' | 'categories' | 'users' | null => {
    if ('categories' in doc) return 'posts'
    if ('title' in doc) return 'categories'
    if ('email' in doc || 'name' in doc) return 'users'
    return null
  }

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {docs?.map((doc, index) => {
            const relationTo = getRelationTo(doc)
            if (relationTo) {
              return (
                <div className="col-span-4" key={index}>
                  <Card className="h-full" doc={doc} relationTo={relationTo} />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
