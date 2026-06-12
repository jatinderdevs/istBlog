export const quickReferenceSection = {
  name: "quickReferenceSection",
  title: "Quick Reference Section",
  type: "object",
  fields: [
    { name: "title", title: "Title", type: "string" },
    {
      name: "ctaText",
      title: "CTA Text",
      type: "string",
      description: "e.g. 'Save this guide — you will need it.'",
    },
    {
      name: "rows",
      title: "Reference Rows",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "resource", title: "Resource Name", type: "string" },
            { name: "link", title: "Link URL", type: "url" },
          ],
          preview: {
            select: { resource: "resource", link: "link" },
            prepare({ resource, link }) {
              return { title: resource || "", subtitle: link || "" };
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "Quick Reference Section" };
    },
  },
};
