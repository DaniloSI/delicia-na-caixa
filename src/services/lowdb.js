import { JSONFilePreset } from "lowdb/node";

const db = await JSONFilePreset("db.json", {});

export const readLowdb = (cacheKey) => {
  let value;

  console.log("[lowdb] Reading cache for: ", cacheKey);
  value = db.data[cacheKey];

  return Promise.resolve(value);
};

export const writeLowdb = (cacheKey, value) => {
  db.update((data) => (data[cacheKey] = value));
  console.log("[lowdb] Cache updated for: ", cacheKey);

  return Promise.resolve();
};

export const writeAllLowdb = (entries) => {
  db.update((data) => {
    for (const [key, value] of entries) {
      data[key] = value;
    }
  });

  console.log(
    "[lowdb] Cache updated for: ",
    entries.map(([key]) => key).join(", ")
  );

  return Promise.resolve();
};
