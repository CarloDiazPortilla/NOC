import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

export interface CheckServiceUseCase {
  execute: (url: string) => Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;


export class CheckService implements CheckServiceUseCase {

  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback = undefined,
    private readonly errorCallback: ErrorCallback = undefined
  ) {

  }

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`)
      }
      const log = new LogEntity(`Service ${url} working`, LogSeverityLevel.LOW);
      this.logRepository.saveLog(log);
      this.successCallback && this.successCallback();
      return true;
    } catch (error) {
      const errorMessage = `${error}`
      const log = new LogEntity(`Service ${url} not working with error: ${errorMessage}`, LogSeverityLevel.HIGH);
      this.logRepository.saveLog(log);
      this.errorCallback && this.errorCallback(errorMessage);
      return false;
    }
  }
}