import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  fields: [
    defineField({
      name: 'openToWork',
      type: 'boolean',
      description: 'Show "Open to work" badge in the hero section',
      initialValue: true,
    }),
  ],
})
