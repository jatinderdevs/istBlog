export const cityTabBlock = {
  name: "cityTabBlock",
  title: "City Tab Block",
  type: "object",
  fields: [
    {
      name: "tabs",
      title: "Tabs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "cityName", title: "City Name", type: "string" },
            {
              name: "items",
              title: "Activities",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
          preview: {
            select: { cityName: "cityName", items: "items" },
            prepare({ cityName, items }) {
              return { title: cityName || "", subtitle: items ? `${items.length} activities` : "" };
            },
          },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: "City Tab Block" };
    },
  },
};
