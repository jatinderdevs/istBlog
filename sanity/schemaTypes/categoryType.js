import {TagIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      description:
        'Changing this changes the page URL. Add a 301 redirect in next.config.mjs for the old URL.',
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      description:
        'Short summary shown under the heading and used as the Google description (120–155 characters).',
      validation: (rule) => [
        rule.max(160).warning('Over 160 characters will be cut off in Google.'),
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      description:
        'Title shown in Google. The site name is added automatically. Falls back to "<Title> Guides".',
      validation: (rule) =>
        rule.max(60).warning('Keep under 60 characters so the site name still fits.'),
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'array',
      description:
        '150–250 words introducing the topic, with links to the main guides. Shown above the list of posts.',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
          ],
          lists: [{title: 'Bullet', value: 'bullet'}],
          marks: {
            decorators: [{title: 'Strong', value: 'strong'}],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{name: 'href', type: 'url', title: 'URL', validation: (rule) => rule.uri({allowRelative: true})}],
              },
            ],
          },
        }),
      ],
    }),
  ],
})
