import {UserIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    }),
    defineField({
      name: 'role',
      type: 'string',
      description: 'e.g. "Founder & editor" — shown under the name on posts and the author page.',
    }),
    defineField({
      name: 'credentials',
      type: 'text',
      rows: 3,
      description:
        'One or two lines on why readers can trust you: study/work experience in Australia, relevant roles or qualifications.',
    }),
    defineField({
      name: 'sameAs',
      title: 'Profile links',
      type: 'array',
      of: [defineArrayMember({type: 'url'})],
      description: 'LinkedIn and other public profiles. Used in Person schema.',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
