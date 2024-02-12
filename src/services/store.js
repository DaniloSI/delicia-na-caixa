import { cache } from "react";
import { read, write } from "./dao-cache";
import database from "./database";

const getAndUpdateCache = async (cacheKey) => {
  let value = await read(cacheKey);

  if (!value) {
    value = await database.getItem(cacheKey);
    await write(cacheKey, value);
  }

  return value;
};

export const getSnacks = cache(() => getAndUpdateCache("snacks"));

export const getCentPrice = cache(async () => {
  const centPrice = await getAndUpdateCache("centPrice");
  return new Map(Object.entries(centPrice));
});

export const getOtherSettings = cache(() => getAndUpdateCache("otherSettings"));
