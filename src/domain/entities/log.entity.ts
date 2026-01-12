export enum LogSeverityLevel {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high"
}

export class LogEntity {
  public severityLevel: LogSeverityLevel;
  public message: string;
  public createdAt: Date;

  constructor(message: string, severityLevel: LogSeverityLevel) {
    this.message = message;
    this.severityLevel = severityLevel;
    this.createdAt = new Date();
  }
}