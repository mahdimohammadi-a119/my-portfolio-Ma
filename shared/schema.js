// Single source of truth for the editable site content.
// The API uses it to validate writes, and the admin panel uses it to build forms.

export const LIMITS = {
  string: 200,
  email: 200,
  text: 2000,
  url: 500,
  stringListItems: 10,
  listItems: 50,
  messageName: 100,
  messageBody: 2000,
};

const siteFields = [
  { key: "brand", label: "Brand name", type: "string" },
  { key: "footerText", label: "Footer text", type: "string" },
  { key: "copyright", label: "Copyright line", type: "string" },
];

export const SECTIONS = {
  site: {
    label: "Site",
    fields: siteFields,
  },
  hero: {
    label: "Hero",
    fields: [
      { key: "greeting", label: "Greeting", type: "string" },
      { key: "title", label: "Title", type: "string" },
      { key: "description", label: "Description", type: "text" },
      { key: "primaryButtonText", label: "Primary button text", type: "string" },
      { key: "secondaryButtonText", label: "Secondary button text", type: "string" },
      { key: "image", label: "Image URL", type: "url" },
    ],
  },
  about: {
    label: "About",
    fields: [
      { key: "heading", label: "Heading", type: "string" },
      { key: "paragraphs", label: "Paragraphs (one per line)", type: "stringList" },
      { key: "buttonText", label: "Button text", type: "string" },
      { key: "image", label: "Image URL", type: "url" },
    ],
  },
  skills: {
    label: "Skills",
    fields: [
      { key: "heading", label: "Heading", type: "string" },
      { key: "subheading", label: "Subheading", type: "text" },
      {
        key: "items",
        label: "Skill cards",
        type: "list",
        itemFields: [
          { key: "name", label: "Name", type: "string" },
          { key: "description", label: "Description", type: "string" },
          { key: "image", label: "Logo URL", type: "url" },
        ],
      },
    ],
  },
  projects: {
    label: "Projects",
    fields: [
      { key: "heading", label: "Heading", type: "string" },
      { key: "subheading", label: "Subheading", type: "text" },
      {
        key: "items",
        label: "Project cards",
        type: "list",
        itemFields: [
          { key: "title", label: "Title", type: "string" },
          { key: "description", label: "Description", type: "string" },
          { key: "image", label: "Screenshot URL", type: "url" },
          { key: "alt", label: "Alt text", type: "string" },
        ],
      },
    ],
  },
  contact: {
    label: "Contact",
    fields: [
      { key: "heading", label: "Heading", type: "string" },
      { key: "subheading", label: "Subheading", type: "text" },
      { key: "email", label: "Email", type: "email" },
      { key: "location", label: "Location", type: "string" },
      { key: "role", label: "Role", type: "string" },
    ],
  },
};
