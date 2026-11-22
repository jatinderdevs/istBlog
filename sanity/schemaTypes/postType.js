import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    {
      name: "featured",
      title: "Featured Post",
      type: "boolean",
      description: "Show this post in the hero section on the homepage",
      initialValue: false,
    },
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description:
        "A short summary shown on listing pages and used for SEO meta descriptions.",
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),

    defineField({
      name: "categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
    defineField({
      name: "body",
      type: "blockContent",
    }),

    // ---- SEO & trust (E-E-A-T) ----
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      group: "seo",
      description:
        "Title shown in Google. Aim for 50–60 characters; the site name is added automatically. Falls back to the post title.",
      validation: (rule) =>
        rule.max(65).warning("Over 65 characters will be cut off in Google."),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
      group: "seo",
      description:
        "Meta description shown in Google (120–155 characters). Falls back to the excerpt, then the first paragraph.",
      validation: (rule) => [
        rule.min(110).warning("Under 110 characters wastes snippet space."),
        rule.max(160).warning("Over 160 characters will be cut off."),
      ],
    }),
    defineField({
      name: "lastReviewedAt",
      title: "Last reviewed",
      type: "datetime",
      group: "seo",
      description:
        "Set this when you check the post against official sources. Shown as “Reviewed …” and used as the modified date for Google.",
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      group: "seo",
      description:
        "3–5 real questions people search (use Search Console queries). Shown at the end of the post.",
      of: [
        defineArrayMember({
          type: "object",
          name: "faqItem",
          fields: [
            defineField({
              name: "question",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "answer",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        }),
      ],
    }),
    defineField({
      name: "sources",
      title: "Official sources",
      type: "array",
      group: "seo",
      description:
        "Government or official pages this post relies on (Home Affairs, ATO, Fair Work, Services Australia…).",
      of: [
        defineArrayMember({
          type: "object",
          name: "sourceLink",
          fields: [
            defineField({
              name: "title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "title", subtitle: "url" } },
        }),
      ],
    }),
  ],
  groups: [
    { name: "seo", title: "SEO & trust" },
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
