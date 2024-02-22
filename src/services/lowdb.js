import { JSONFilePreset } from "lowdb/node";

let dbConnection;

const getConnection = async () => {
  if (!dbConnection) {
    dbConnection = await JSONFilePreset("db.json", {});
  }

  return dbConnection;
}


export const readLowdb = async (cacheKey) => {
  const db = await getConnection();
  let value;

  console.log("[lowdb] Reading cache for: ", cacheKey);
  value = db.data[cacheKey];

  return Promise.resolve(value);
};

export const writeLowdb = async (cacheKey, value) => {
  const db = await getConnection();
  db.update((data) => (data[cacheKey] = value));
  console.log("[lowdb] Cache updated for: ", cacheKey);

  return Promise.resolve();
};

export const writeAllLowdb = async (entries) => {
  const db = await getConnection();

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
