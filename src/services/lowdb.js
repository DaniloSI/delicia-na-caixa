import { JSONFilePreset } from 'lowdb/node';

const db = await JSONFilePreset('db.json', {});

export const readLowdb = (cacheKey) => {
  let value
  
  console.log("[lowdb] Reading cache for: ", cacheKey);
  value = db.data[cacheKey];

  return Promise.resolve(value);
}

export const writeLowdb = (cacheKey, value) => {
  db.update(data => data[cacheKey] = value);
  console.log("[lowdb] Cache updated for: ", cacheKey);

  return Promise.resolve();
}