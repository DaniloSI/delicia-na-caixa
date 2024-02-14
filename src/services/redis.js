import { ONE_DAY_IN_MILLISECONDS } from "@/utils/constants";
import { createStorage } from "unstorage";
import redisDriver from "unstorage/drivers/redis";

const storage = createStorage({
  driver: redisDriver({
    url: process.env.URL_REDIS,
    ttl: ONE_DAY_IN_MILLISECONDS,
  }),
});

export const readRedis = (cacheKey) => {
  console.log("[redis] Reading from cache for: ", cacheKey);
  return storage.getItem(cacheKey);
};

export const writeRedis = (cacheKey, value) => {
  console.log("[redis] Updating cache for: ", cacheKey);
  return storage.setItem(cacheKey, value);
};

export const writeAllRedis = (entries) => {
  console.log(
    "[redis] Updating all cache for: ",
    entries.map(([key]) => key).join(", ")
  );
  return storage.setItems(entries.map(([key, value]) => ({ key, value })));
};
