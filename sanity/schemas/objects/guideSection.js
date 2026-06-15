export const guideSection = {
  name: "guideSection",
  title: "Guide Section",
  type: "object",
  fields: [
    {
      name: "sectionNumber",
      title: "Section Number",
      type: "string",
      description: "e.g. '01', '02'",
    },
    {
      name: "emoji",
      title: "Emoji",
      type: "string",
      description: "Single emoji character",
    },
    { name: "title", title: "Title", type: "string" },
    {
      name: "anchorId",
      title: "Anchor ID",
      type: "string",
      description: "Used for TOC jump links, e.g. 'government-hubs'",
    },
    { name: "body", title: "Body Content", type: "guideBody" },
    {
      name: "components",
      title: "Section Components",
      type: "array",
      of: [
        { type: "infoCard" },
        { type: "twoColumnTable" },
        { type: "threeColumnTable" },
        { type: "bulletList" },
        { type: "cityTabBlock" },
      ],
    },
    { name: "relatedPostTitle", title: "Related Post Title", type: "string" },
    { name: "relatedPostSlug", title: "Related Post Slug", type: "string" },
  ],
  preview: {
    select: { title: "title", sectionNumber: "sectionNumber" },
    prepare({ title, sectionNumber }) {
      return { title: sectionNumber ? `${sectionNumber}. ${title}` : title };
    },
  },
};
