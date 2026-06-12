export const threeColumnTable = {
  name: "threeColumnTable",
  title: "Three-Column Table",
  type: "object",
  fields: [
    {
      name: "headers",
      title: "Column Headers",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.length(3),
    },
    {
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "col1", title: "Column 1", type: "string" },
            { name: "col2", title: "Column 2", type: "string" },
            { name: "col3", title: "Column 3", type: "string" },
          ],
          preview: {
            select: { col1: "col1", col2: "col2" },
            prepare({ col1, col2 }) {
              return { title: col1 || "", subtitle: col2 || "" };
            },
          },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: "Three-Column Table" };
    },
  },
};
