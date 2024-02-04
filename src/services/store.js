import { jsonBinRequest } from "@/utils/jsonBinRequest";
import { cache } from "react";

let cacheSnacks;
let cacheCentPrice;
let cacheOtherSettings;

export const getSnacks = cache(async () => {
  if (!cacheSnacks) {
    cacheSnacks = (await jsonBinRequest("65bfb3e41f5677401f2ab8bb")).filter(
      (snack) => snack.active
    );
  }

  return cacheSnacks;
});

export const getCentPrice = cache(async () => {
  if (!cacheCentPrice) {
    const centPrice = await jsonBinRequest("65bfac54266cfc3fde85a607");
    cacheCentPrice = new Map(Object.entries(centPrice));
  }

  return cacheCentPrice;
});

export const getOtherSettings = cache(async () => {
  if (!cacheOtherSettings) {
    cacheOtherSettings = await jsonBinRequest("65bfb3d6dc74654018a02975");
  }

  return cacheOtherSettings;
});
