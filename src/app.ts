import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongodb";
import { Server } from "./presentation/server";

(async () => {
  main()
})();

async function main() {

  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL
  })
  await Server.start();
}