import { CronService } from "./cron/cron-service";

export class Server {
  public static start() {
    console.log("Server started...");
    CronService.createJob("*/5 * * * * *", () => {
      console.log("executed every 2 seconds");
    }).start();
  }
}