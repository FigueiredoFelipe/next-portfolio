import { defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  type: 'document',
  title: 'Project',
  fields: [
    { name: 'title', type: 'string', validation: (r: any) => r.required() },
    { name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r: any) => r.required() },
    { name: 'coverImage', type: 'image', options: { hotspot: true } },
    { name: 'summary', type: 'text', description: 'Short card description (~120 chars)' },
    { name: 'body', type: 'array', of: [{ type: 'block' }] },
    { name: 'techs', type: 'array', of: [{ type: 'string' }] },
    { name: 'githubUrl', type: 'url' },
    { name: 'liveUrl', type: 'url' },
    { name: 'featured', type: 'boolean', initialValue: false },
    { name: 'order', type: 'number', description: 'Lower = shown first' },
  ] as any[],
  preview: {
    select: { title: 'title', media: 'coverImage' },
  },
})
