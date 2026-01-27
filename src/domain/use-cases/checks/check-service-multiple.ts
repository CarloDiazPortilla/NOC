import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

export interface CheckServiceMultipleUseCase {
  execute: (url: string) => Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;


export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

  constructor(
    private readonly logRepositories: LogRepository[],
    private readonly successCallback: SuccessCallback = undefined,
    private readonly errorCallback: ErrorCallback = undefined
  ) {

  }

  private callLogs(log: LogEntity) {
    this.logRepositories.forEach((logRepository) => {
      logRepository.saveLog(log);
    })
  }

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`)
      }
      const log = new LogEntity({
        message: `Service ${url} working`,
        origin: "check-service-multiple.ts",
        severityLevel: LogSeverityLevel.LOW
      });
      this.callLogs(log);
      this.successCallback && this.successCallback();
      return true;
    } catch (error) {
      const errorMessage = `${error}`
      const log = new LogEntity({
        message: `Service ${url} not working with error: ${errorMessage}`,
        origin: "check-service-multiple.ts",
        severityLevel: LogSeverityLevel.HIGH
      });
      this.callLogs(log);
      this.errorCallback && this.errorCallback(errorMessage);
      return false;
    }
  }
}