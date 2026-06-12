export const infoCard = {
  name: "infoCard",
  title: "Info Card",
  type: "object",
  fields: [
    { name: "content", title: "Content", type: "text", rows: 3 },
    { name: "linkLabel", title: "Link Label", type: "string" },
    { name: "linkUrl", title: "Link URL", type: "url" },
  ],
  preview: {
    select: { content: "content" },
    prepare({ content }) {
      return { title: content ? content.slice(0, 60) + "…" : "Info Card" };
    },
  },
};
