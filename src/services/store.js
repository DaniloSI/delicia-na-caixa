import { jsonBinRequest } from "@/utils/jsonBinRequest";
import { cache } from "react";
import { read, write } from "./dao";

const getAndUpdateCache = async ({ cacheKey, jsonBinId }) => {
  let value = await read(cacheKey);

  if (!value) {
    value = await jsonBinRequest(jsonBinId);
    await write(cacheKey, value)
  }

  return value;
};

export const getSnacks = cache(async () => {
  const snacks = await getAndUpdateCache({
    cacheKey: "snacks",
    jsonBinId: "65bfb3e41f5677401f2ab8bb",
  });

  return snacks;
});

export const getCentPrice = cache(async () => {
  const centPrice = await getAndUpdateCache({
    cacheKey: "cent-price",
    jsonBinId: "65bfac54266cfc3fde85a607",
  });

  return new Map(Object.entries(centPrice));
});

export const getOtherSettings = cache(async () => {
  const otherSettings = await getAndUpdateCache({
    cacheKey: "other-settings",
    jsonBinId: "65bfb3d6dc74654018a02975",
  });

  return otherSettings;
});
