export enum LogSeverityLevel {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high"
}

export class LogEntity {
  public severityLevel: LogSeverityLevel;
  public message: string;
  public createdAt: Date;

  constructor(message: string, severityLevel: LogSeverityLevel, createdAt = new Date()) {
    this.message = message;
    this.severityLevel = severityLevel;
    this.createdAt = createdAt;
  }

  static fromJson(json: string): LogEntity {
    const { message, level, createdAt } = JSON.parse(json);
    return new LogEntity(message, level, createdAt);
  }
}