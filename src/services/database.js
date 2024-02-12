import { createStorage } from "unstorage";
import mongodbDriver from "unstorage/drivers/mongodb";

const database = createStorage({
  driver: mongodbDriver({
    connectionString: process.env.MONGODB_CONNECTION_STRING,
    databaseName: "delicia-na-caixa",
    collectionName: "store",
  }),
});

export default database;
