import { ONE_DAY_IN_MILLISECONDS } from '@/utils/constants';
import { JSONFilePreset } from 'lowdb/node';

const db = await JSONFilePreset('db.json', {});

export const readLowdb = (cacheKey) => {
  const ttl = db.data[`${cacheKey}-ttl`];
  let value
  
  if (ttl) {
    if (new Date(ttl) >= Date.now()) {
      console.log("[lowdb] Reading cache for: ", cacheKey);
      value = db.data[cacheKey];
    } else {
      console.log("[lowdb] Cache ttl expired for: ", cacheKey);
    }
  }

  return Promise.resolve(value);
}

export const writeLowdb = (cacheKey, value, ttl = ONE_DAY_IN_MILLISECONDS) => {
  const ttlKey = `${cacheKey}-ttl`;
  
  db.update(data => data[cacheKey] = value);
  db.update(data => data[ttlKey] = new Date(Date.now() + ttl).toISOString());
  console.log("[lowdb] Cache updated for: ", cacheKey);

  return Promise.resolve();
}