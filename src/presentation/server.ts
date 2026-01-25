import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.repository";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

const logRepository = new LogRepositoryImpl(new MongoLogDatasource());
// const logRepository = new LogRepositoryImpl(new FileSystemDatasource());
const emailService = new EmailService();
const checkService = new CheckService(logRepository);

export class Server {
  public static async start() {
    console.log("Server started...");

    // Send email
    // const sent = await new SendEmailLogs(
    //   emailService,
    //   fileSystemLogRepository,
    // ).execute("someemail@domain.com");

    CronService.createJob("*/5 * * * * *", () => {
      // const url = "http://localhost:3000";
      const url = "https://google.com";
      new CheckService(
        logRepository,
      ).execute(url);
    });
  }
}