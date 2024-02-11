import { readRedis, writeRedis, writeAllRedis } from './redis'
import { readLowdb, writeLowdb, writeAllLowdb } from './lowdb'
import { IS_DEVELOPMENT } from '@/utils/constants'

export const read = IS_DEVELOPMENT ? readLowdb : readRedis
export const write = IS_DEVELOPMENT ? writeLowdb : writeRedis
export const writeAll = IS_DEVELOPMENT ? writeAllLowdb : writeAllRedis