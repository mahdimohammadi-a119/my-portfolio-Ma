import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { DEFAULT_CONTENT } from "../shared/defaults.js";

const CONTENT_KEY = "portfolio:content";
const MESSAGES_KEY = "portfolio:messages";
const MAX_MESSAGES = 500;
const LOCAL_DB_PATH = path.join(process.cwd(), "data", "db.json");
const NOT_CONFIGURED =
  "Storage is not configured. Connect Upstash Redis to this Vercel project (see README).";

export class StorageError extends Error {
  constructor(message) {
    super(message);
    this.name = "StorageError";
  }
}

// Public API:
// - Vercel: uses Upstash Redis (Vercel Marketplace), read through its REST API.
// - Local development: falls back to data/db.json.

export async function getContent() {
  const stored = await getBackend().get(CONTENT_KEY);
  return Object.fromEntries(
    Object.entries(DEFAULT_CONTENT).map(([key, fallback]) => [key, stored?.[key] ?? fallback]),
  );
}

export async function saveContent(content) {
  await getBackend().set(CONTENT_KEY, content);
}

export async function listMessages() {
  return (await getBackend().get(MESSAGES_KEY)) ?? [];
}

export async function addMessage(message) {
  const messages = await listMessages();
  const entry = { id: randomUUID(), createdAt: new Date().toISOString(), ...message };
  await getBackend().set(MESSAGES_KEY, [entry, ...messages].slice(0, MAX_MESSAGES));
}

export async function deleteMessage(id) {
  const messages = await listMessages();
  await getBackend().set(
    MESSAGES_KEY,
    messages.filter((message) => message.id !== id),
  );
}

function getBackend() {
  const redis = getRedisConfig();
  if (redis) {
    return createRedisBackend(redis);
  }
  if (process.env.VERCEL) {
    // Serverless filesystems are read-only, so reads use defaults and writes fail clearly.
    return {
      get: async () => null,
      set: async () => {
        throw new StorageError(NOT_CONFIGURED);
      },
    };
  }
  return localBackend;
}

function getRedisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

async function redisCommand(config, command) {
  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok || data?.error) {
    throw new StorageError(data?.error || `Storage request failed with status ${response.status}`);
  }
  return data.result;
}

function createRedisBackend(config) {
  return {
    async get(key) {
      const raw = await redisCommand(config, ["GET", key]);
      return raw == null ? null : JSON.parse(raw);
    },
    async set(key, value) {
      await redisCommand(config, ["SET", key, JSON.stringify(value)]);
    },
  };
}

const localBackend = {
  async get(key) {
    return (await readLocalDb())[key] ?? null;
  },
  async set(key, value) {
    const db = await readLocalDb();
    db[key] = value;
    await fs.mkdir(path.dirname(LOCAL_DB_PATH), { recursive: true });
    await fs.writeFile(LOCAL_DB_PATH, JSON.stringify(db, null, 2));
  },
};

async function readLocalDb() {
  try {
    return JSON.parse(await fs.readFile(LOCAL_DB_PATH, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw error;
  }
}
