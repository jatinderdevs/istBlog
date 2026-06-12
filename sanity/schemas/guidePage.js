export const guidePage = {
  name: "guidePage",
  title: "Guide Page",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    },
    { name: "subtitle", title: "Subtitle", type: "string" },
    { name: "category", title: "Category", type: "string" },
    { name: "readTime", title: "Read Time", type: "string", description: "e.g. '10 min read'" },
    { name: "seoTitle", title: "SEO Title", type: "string" },
    { name: "seoDescription", title: "SEO Description", type: "text", rows: 3 },
    { name: "seoKeywords", title: "SEO Keywords", type: "string", description: "Comma separated" },
    { name: "publishedAt", title: "Published At", type: "datetime" },
    {
      name: "showDownloadPDF",
      title: "Show Download PDF Button",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        { type: "guideSection" },
        { type: "calloutBox" },
        { type: "quickReferenceSection" },
      ],
    },
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "Untitled Guide" };
    },
  },
};
