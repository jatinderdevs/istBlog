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
