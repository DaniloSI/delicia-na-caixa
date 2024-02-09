import { caching } from "cache-manager";
import { redisStore } from "cache-manager-redis-yet";

export const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

const redisCache = await caching(redisStore, {
  url: process.env.URL_REDIS,
  ttl: ONE_DAY_IN_MILLISECONDS,
});

export default redisCache;
