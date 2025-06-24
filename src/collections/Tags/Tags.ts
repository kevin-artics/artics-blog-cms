import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { slugField } from '@/fields/slug'

export const Tags: CollectionConfig = {
  slug: 'tags',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    description: 'Gestiona los tags que se pueden usar en las categorías',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Nombre del tag (debe ser único)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Descripción opcional del tag',
      },
    },
    {
      name: 'color',
      type: 'select',
      admin: {
        description: 'Color del tag para personalización visual',
      },
      options: [
        { label: 'Azul', value: 'blue' },
        { label: 'Verde', value: 'green' },
        { label: 'Rojo', value: 'red' },
        { label: 'Amarillo', value: 'yellow' },
        { label: 'Púrpura', value: 'purple' },
        { label: 'Naranja', value: 'orange' },
        { label: 'Gris', value: 'gray' },
      ],
      defaultValue: 'blue',
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [
      async ({ doc, req: { payload, context } }) => {
        if (!context?.disableRevalidate) {
          // Revalidar páginas que usan tags
          payload.logger.info(`Revalidating after tag change: ${doc.name}`)
          // Aquí podrías agregar revalidación específica si es necesario
        }
        return doc
      },
    ],
  },
}
