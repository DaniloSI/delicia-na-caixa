import { IS_DEVELOPMENT } from "@/utils/constants";

import { readLowdb, writeAllLowdb, writeLowdb } from "./lowdb";
import { readRedis, writeAllRedis, writeRedis } from "./redis";

export const read = IS_DEVELOPMENT ? readLowdb : readRedis;
export const write = IS_DEVELOPMENT ? writeLowdb : writeRedis;
export const writeAll = IS_DEVELOPMENT ? writeAllLowdb : writeAllRedis;
