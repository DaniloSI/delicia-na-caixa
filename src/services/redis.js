import { IS_DEVELOPMENT, ONE_DAY_IN_MILLISECONDS } from "@/utils/constants";
import { caching, memoryStore } from "cache-manager";
import { redisStore } from "cache-manager-redis-yet";

let redisCache;

if (!redisCache) {
  redisCache = await caching(IS_DEVELOPMENT ? memoryStore() : redisStore, {
    url: process.env.URL_REDIS,
    ttl: ONE_DAY_IN_MILLISECONDS,
  });
}

export const readRedis = (cacheKey) => {
  console.log("[redis] Reading from cache for: ", cacheKey);
  return redisCache.get(cacheKey)
};

export const writeRedis = (cacheKey, value) => {
  console.log("[redis] Updating cache for: ", cacheKey);
  return redisCache.set(cacheKey, value, ONE_DAY_IN_MILLISECONDS)
};
