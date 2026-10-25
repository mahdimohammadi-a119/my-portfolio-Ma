import { createHash, createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "admin_session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

// The admin password comes only from the ADMIN_PASSWORD environment variable.
export function isAdminPasswordConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function checkPassword(candidate) {
  return typeof candidate === "string" && candidate.length > 0 && safeEqual(candidate, process.env.ADMIN_PASSWORD);
}

export function createSessionCookie() {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const token = `${expiresAt}.${sign(`admin:${expiresAt}`)}`;
  return serializeCookie(token, SESSION_TTL_MS / 1000);
}

export function clearSessionCookie() {
  return serializeCookie("", 0);
}

export function isAuthenticated(req) {
  if (!isAdminPasswordConfigured()) {
    return false;
  }

  const token = parseCookies(req.headers.cookie)[COOKIE_NAME];
  if (!token) {
    return false;
  }

  const [expiresAt, signature] = token.split(".");
  if (!expiresAt || !signature || Number(expiresAt) <= Date.now()) {
    return false;
  }

  return safeEqual(signature, sign(`admin:${expiresAt}`));
}

function signingKey() {
  return process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD;
}

function sign(payload) {
  return createHmac("sha256", signingKey()).update(payload).digest("hex");
}

// Hashing both sides first gives equal lengths, which timingSafeEqual requires.
function safeEqual(a, b) {
  const hashA = createHash("sha256").update(String(a)).digest();
  const hashB = createHash("sha256").update(String(b)).digest();
  return timingSafeEqual(hashA, hashB);
}

function serializeCookie(value, maxAgeSeconds) {
  const parts = [
    `${COOKIE_NAME}=${value}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    `Max-Age=${Math.floor(maxAgeSeconds)}`,
  ];
  if (process.env.VERCEL) {
    parts.push("Secure");
  }
  return parts.join("; ");
}

function parseCookies(header = "") {
  return Object.fromEntries(
    header
      .split(";")
      .map((part) => part.trim().split("="))
      .filter(([name]) => name)
      .map(([name, ...rest]) => [name, rest.join("=")]),
  );
}
