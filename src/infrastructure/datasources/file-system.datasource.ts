import fs from "fs";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasource {

  private readonly logPath = "logs/";
  private readonly allLogsPath = "logs/logs-all.log";
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

  async saveLog(log: LogEntity): Promise<void> {
    const logMessage = `${JSON.stringify(log)}\n`;
    fs.appendFileSync(this.allLogsPath, logMessage);
    switch (log.severityLevel) {
      case LogSeverityLevel.MEDIUM:
        fs.appendFileSync(this.midSeverityLogsPath, logMessage);
        break;
      case LogSeverityLevel.HIGH:
        fs.appendFileSync(this.highSeverityLogsPath, logMessage);
        break;
    }
  }
  async getLogs(): Promise<LogEntity[]> {
    throw new Error("Method not implemented.");
  }
  async getLogsBySeverity(severity: LogSeverityLevel): Promise<LogEntity[]> {
    throw new Error("Method not implemented.");
  }

}