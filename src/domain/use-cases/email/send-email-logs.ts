import { EmailService } from "../../../presentation/email/email-service"
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository"

export interface SendEmailLogUseCase {
  execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendEmailLogUseCase {

  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {

  }

  async execute(to: string | string[]) {
    try {
      const sent = await this.emailService.sendMailWithFileSystemLogs(to);
      if (!sent) throw new Error("Email logs was not sent");
      const successLog = new LogEntity({
        message: `Email with logs sent to ${to}`,
        origin: "send-email-logs.ts",
        severityLevel: LogSeverityLevel.LOW
      })
      this.logRepository.saveLog(successLog);

      return true
    } catch (error) {
      const errorLog = new LogEntity({
        message: `${error}, failed sending email to ${to}`,
        origin: "send-email-logs.ts",
        severityLevel: LogSeverityLevel.HIGH
      })
      this.logRepository.saveLog(errorLog);
      return false
    }
  }
}