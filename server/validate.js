import { SECTIONS, LIMITS } from "../shared/schema.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Only relative paths and http(s) links are allowed, so no javascript: URLs.
const SAFE_URL_PATTERN = /^(\/(?!\/)|https?:\/\/)/;

export function cleanString(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function cleanUrl(value) {
  const url = cleanString(value, LIMITS.url);
  return SAFE_URL_PATTERN.test(url) ? url : "";
}

function cleanValue(field, raw) {
  switch (field.type) {
    case "url":
      return cleanUrl(raw);
    case "stringList":
      return Array.isArray(raw)
        ? raw
            .map((item) => cleanString(item, LIMITS.text))
            .filter(Boolean)
            .slice(0, LIMITS.stringListItems)
        : [];
    case "list":
      return Array.isArray(raw)
        ? raw.slice(0, LIMITS.listItems).map((item) => cleanFields(field.itemFields, item))
        : [];
    default:
      return cleanString(raw, LIMITS[field.type]);
  }
}

function cleanFields(fields, input) {
  const source = input && typeof input === "object" ? input : {};
  return Object.fromEntries(fields.map((field) => [field.key, cleanValue(field, source[field.key])]));
}

// Returns a cleaned copy of one section, or null if the section does not exist.
export function sanitizeSection(sectionKey, input) {
  if (!Object.hasOwn(SECTIONS, sectionKey)) {
    return null;
  }
  return cleanFields(SECTIONS[sectionKey].fields, input);
}

// Validates a message submitted through the public contact form.
export function validateMessage(input) {
  const name = cleanString(input?.name, LIMITS.messageName);
  const email = cleanString(input?.email, LIMITS.email);
  const message = cleanString(input?.message, LIMITS.messageBody);

  if (!name || !message) {
    return { error: "Name and message are required." };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { error: "Please enter a valid email address." };
  }
  return { message: { name, email, message } };
}
