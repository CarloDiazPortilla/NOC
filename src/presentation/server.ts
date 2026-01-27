import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.repository";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

const postgresLogRepository = new LogRepositoryImpl(new PostgresLogDatasource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());
const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const emailService = new EmailService();
const checkService = new CheckService(fileSystemLogRepository);

export class Server {
  public static async start() {
    console.log("Server started...");

    // Send email
    // const sent = await new SendEmailLogs(
    //   emailService,
    //   fileSystemLogRepository,
    // ).execute("someemail@domain.com");

    // CronService.createJob("*/5 * * * * *", () => {
    //   // const url = "http://localhost:3000";
    //   const url = "https://google.com";
    //   new CheckService(
    //     logRepository,
    //   ).execute(url);
    // });
    CronService.createJob("*/5 * * * * *", () => {
      // const url = "http://localhost:3000";
      const url = "https://google.com";
      new CheckServiceMultiple(
        [
          postgresLogRepository,
          mongoLogRepository,
          fileSystemLogRepository
        ],
      ).execute(url);
    });
    // const logs = await logRepository.getLogs();
    // console.log({ logs })
  }
}