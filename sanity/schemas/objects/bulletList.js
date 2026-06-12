export const bulletList = {
  name: "bulletList",
  title: "Bullet List",
  type: "object",
  fields: [
    {
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "boldLabel", title: "Bold Label", type: "string", description: "Optional bold prefix before main text" },
            { name: "text", title: "Text", type: "string" },
          ],
          preview: {
            select: { boldLabel: "boldLabel", text: "text" },
            prepare({ boldLabel, text }) {
              return { title: [boldLabel, text].filter(Boolean).join(" — ") };
            },
          },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: "Bullet List" };
    },
  },
};
