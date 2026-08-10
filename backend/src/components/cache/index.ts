import { createClient } from "redis";
import logger from "../logger";

const REDIS_ENABLED = process.env.REDIS_ENABLED === "true";
let redisClient: any = null;

if (REDIS_ENABLED) {
  redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST || "localhost"}:${process.env.REDIS_PORT || 6379}`,
    password: process.env.REDIS_PASSWORD || undefined,
  });

  redisClient.on("error", (err: any) => logger.error("Redis Client Error", err));
  redisClient.on("connect", () => logger.info("Redis Client Connected"));
}

export const cache = {
  get: async (key: string): Promise<string | null> => {
    if (!REDIS_ENABLED || !redisClient) return null;
    return redisClient.get(key);
  },
  set: async (key: string, value: string, expirySeconds?: number): Promise<void> => {
    if (!REDIS_ENABLED || !redisClient) return;
    if (expirySeconds) {
      await redisClient.set(key, value, { EX: expirySeconds });
    } else {
      await redisClient.set(key, value);
    }
  },
  del: async (key: string): Promise<void> => {
    if (!REDIS_ENABLED || !redisClient) return;
    await redisClient.del(key);
  },
};
