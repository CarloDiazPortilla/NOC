import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongodb";
import { Server } from "./presentation/server";
import { LogSeverityLevel, PrismaClient } from "../generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg";

(async () => {
  main()
})();

async function main() {

  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL
  })

  const adapter = new PrismaPg({ connectionString: envs.POSTGRES_URL })
  const prisma = new PrismaClient({ adapter })

  const newLog = await prisma.log.create({
    data: {
      level: LogSeverityLevel.HIGH,
      message: "Test message",
      origin: "app.ts",
    }
  })

  console.log(newLog);

  // await Server.start();
}