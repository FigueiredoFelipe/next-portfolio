import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  type: 'document',
  title: 'Project',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'summary', type: 'text', description: 'Short card description (~120 chars)' }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'techs', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'githubUrl', type: 'url' }),
    defineField({ name: 'liveUrl', type: 'url' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', type: 'number', description: 'Lower = shown first' }),
  ],
  preview: {
    select: { title: 'title', media: 'coverImage' },
  },
})
