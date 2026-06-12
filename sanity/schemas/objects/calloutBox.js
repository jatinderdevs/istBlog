export const calloutBox = {
  name: "calloutBox",
  title: "Callout Box",
  type: "object",
  fields: [
    { name: "label", title: "Label", type: "string", description: "e.g. 'SAVE THIS', 'KEY NUMBERS'" },
    { name: "content", title: "Content", type: "guideBody" },
    {
      name: "style",
      title: "Style",
      type: "string",
      options: {
        list: [
          { title: "Info", value: "info" },
          { title: "Warning", value: "warning" },
          { title: "Highlight", value: "highlight" },
        ],
        layout: "radio",
      },
      initialValue: "info",
    },
  ],
  preview: {
    select: { label: "label" },
    prepare({ label }) {
      return { title: label ? `Callout: ${label}` : "Callout Box" };
    },
  },
};
