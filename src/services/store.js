import { jsonBinRequest } from "@/utils/jsonBinRequest";
import { cache } from "react";

let cacheSnacks;
let cacheCentPrice;

export const getSnacks = cache(async () => {
  if (!cacheSnacks) {
    cacheSnacks = (await jsonBinRequest("65bf6d92dc74654018a012e6")).filter(
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
