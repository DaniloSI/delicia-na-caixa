import {
  FIVE_MINUTES_IN_MILLISECONDS,
  IS_DEVELOPMENT,
  ONE_DAY_IN_MILLISECONDS,
} from "@/utils/constants";
import { caching, memoryStore } from "cache-manager";
import { redisStore } from "cache-manager-redis-yet";

let redisCache;

if (!redisCache) {
  redisCache = await caching(IS_DEVELOPMENT ? memoryStore() : redisStore, {
    url: process.env.URL_REDIS,
    ttl: FIVE_MINUTES_IN_MILLISECONDS,
  });
}

export const readRedis = (cacheKey) => {
  console.log("[redis] Reading from cache for: ", cacheKey);
  return redisCache.get(cacheKey);
};

export const writeRedis = (cacheKey, value) => {
  console.log("[redis] Updating cache for: ", cacheKey);
  return redisCache.set(cacheKey, value, ONE_DAY_IN_MILLISECONDS);
};

export const writeAllRedis = (entries) => {
  console.log(
    "[redis] Updating all cache for: ",
    entries.map(([key]) => key).join(", ")
  );
  return redisCache.store.mset(entries, ONE_DAY_IN_MILLISECONDS);
};
