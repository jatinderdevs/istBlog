import { defineField, defineType } from "sanity";

export const settingsType = defineType({
  name: "settings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      description: "Main title of your website",
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      description: "Used for SEO meta description",
    }),
    defineField({
      name: "keywords",
      title: "SEO Keywords",
      type: "array",
      of: [{ type: "string" }],
      description: "Add keywords one by one",
    }),
    defineField({
      name: "heroHeading",
      title: "Homepage Hero Heading",
      type: "string",
      description: "The big heading on the homepage",
    }),
    defineField({
      name: "heroSubtext",
      title: "Homepage Hero Subtext",
      type: "text",
      description: "The paragraph below the hero heading",
    }),
    defineField({
      name: "heroImage",
      title: "Homepage Hero Image",
      type: "image",
      description:
        "Photo shown beside the hero text (landscape or portrait, at least 1200px wide). Falls back to the featured post image.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Describe the photo for screen readers and SEO",
        }),
      ],
    }),
    defineField({
      name: "heroButtonText",
      title: "Hero Button Text",
      type: "string",
    }),
    defineField({
      name: "footerTagline",
      title: "Footer Tagline",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
