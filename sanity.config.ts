import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schema'

export default defineConfig({
  name: 'default',
  title: 'felipe-snr',
  projectId: '8yzpbmmx',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list().title('Content').items([
          S.listItem()
            .title('Site Settings')
            .id('siteSettings')
            .child(
              S.document()
                .schemaType('siteSettings')
                .documentId('siteSettings')
            ),
          S.divider(),
          ...S.documentTypeListItems().filter(
            (t) => !['siteSettings'].includes(t.getId()!)
          ),
        ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})
