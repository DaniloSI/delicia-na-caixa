import { readRedis, writeRedis } from './redis'
import { readLowdb, writeLowdb } from './lowdb'
import { IS_DEVELOPMENT } from '@/utils/constants'

export const read = IS_DEVELOPMENT ? readLowdb : readRedis
export const write = IS_DEVELOPMENT ? writeLowdb : writeRedis