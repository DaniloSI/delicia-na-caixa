import { jsonBinRequest } from "@/utils/jsonBinRequest";
import { cache } from "react";
import { read, write } from "./dao";
import {
  CENT_PRICE_JSON_BIN_ID,
  OTHER_SETTINGS_JSON_BIN_ID,
  SNACKS_JSON_BIN_ID,
} from "@/utils/constants";

const getAndUpdateCache = async ({ cacheKey, jsonBinId }) => {
  let value = await read(cacheKey);

  if (!value) {
    value = (await jsonBinRequest(jsonBinId)).record;
    await write(cacheKey, value);
  }

  return value;
};

export const getSnacks = cache(async () => {
  const snacks = await getAndUpdateCache({
    cacheKey: "snacks",
    jsonBinId: SNACKS_JSON_BIN_ID,
  });

  return snacks;
});

export const getCentPrice = cache(async () => {
  const centPrice = await getAndUpdateCache({
    cacheKey: "cent-price",
    jsonBinId: CENT_PRICE_JSON_BIN_ID,
  });

  return new Map(Object.entries(centPrice));
});

export const getOtherSettings = cache(async () => {
  const otherSettings = await getAndUpdateCache({
    cacheKey: "other-settings",
    jsonBinId: OTHER_SETTINGS_JSON_BIN_ID,
  });

  return otherSettings;
});
