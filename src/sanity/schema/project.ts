import { defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  type: 'document',
  title: 'Project',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Project Title',
      validation: (r: any) => r.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'URL Slug',
      description: 'Auto-generated from the title. Used in the URL: /projects/slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r: any) => r.required(),
    },
    {
      name: 'featured',
      type: 'boolean',
      title: 'Featured on homepage',
      description: 'Show this project in the Selected Work section on the homepage',
      initialValue: false,
    },
    {
      name: 'order',
      type: 'number',
      title: 'Display Order',
      description: 'Lower number = shown first.',
      initialValue: 99,
    },
    {
      name: 'coverImage',
      type: 'image',
      title: 'Cover Image',
      description: 'Ideal: 1200×675px (16:9). Shown on cards and the project page.',
      options: { hotspot: true },
    },
    {
      name: 'summary',
      type: 'text',
      title: 'Short Summary',
      description: 'Shown on project cards. Keep it under 120 characters.',
      validation: (r: any) => r.max(200),
    },
    {
      name: 'techs',
      type: 'array',
      title: 'Technologies',
      description: 'Tech stack used. Type each one and press Enter.',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'githubUrl',
      type: 'url',
      title: 'GitHub URL',
      description: 'Link to the source code repository.',
    },
    {
      name: 'liveUrl',
      type: 'url',
      title: 'Live Demo URL',
      description: 'Link to the deployed project.',
    },
    {
      name: 'body',
      type: 'array',
      title: 'Project Description',
      description: 'Full write-up shown on the project detail page. Supports rich text.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{ name: 'href', type: 'url', title: 'URL' }],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt text' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },
      ],
    },
  ] as any[],
  preview: {
    select: {
      title: 'title',
      subtitle: 'summary',
      media: 'coverImage',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
