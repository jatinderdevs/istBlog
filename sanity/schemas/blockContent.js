export const blockContent = {
  title: "Guide Body Content",
  name: "guideBody",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Underline", value: "underline" },
        ],
        annotations: [
          {
            title: "External Link",
            name: "link",
            type: "object",
            fields: [
              { title: "URL", name: "href", type: "url" },
              { title: "Open in new tab", name: "blank", type: "boolean" },
            ],
          },
          {
            title: "Internal Link",
            name: "internalLink",
            type: "object",
            fields: [
              {
                title: "Post Slug",
                name: "postSlug",
                type: "string",
                description: "The slug of the post to link to (e.g. 'how-to-make-friends')",
              },
            ],
          },
        ],
      },
    },
  ],
};
