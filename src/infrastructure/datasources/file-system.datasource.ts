import fs from "fs";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasource {

  private readonly logPath = "logs/";
  private readonly allLogsPath = "logs/logs-low.log";
  private readonly midSeverityLogsPath = "logs/logs-medium.log";
  private readonly highSeverityLogsPath = "logs/logs-high.log";

  constructor() {
    this.createLogFiles();
  }

  private createLogFiles() {
    if (!fs.existsSync(this.logPath)) fs.mkdirSync(this.logPath);
    this.createFileIfNotExists(this.allLogsPath);
    this.createFileIfNotExists(this.midSeverityLogsPath);
    this.createFileIfNotExists(this.highSeverityLogsPath);
  }

  private createFileIfNotExists(path: string) {
    if (!fs.existsSync(path)) fs.writeFileSync(path, "");
  }

  saveLog(log: LogEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getLogs(): Promise<LogEntity[]> {
    throw new Error("Method not implemented.");
  }
  getLogsBySeverity(severity: LogSeverityLevel): Promise<LogEntity[]> {
    throw new Error("Method not implemented.");
  }

}