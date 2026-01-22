export enum LogSeverityLevel {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high"
}

export interface LogEntityOptions {
  severityLevel: LogSeverityLevel;
  message: string;
  createdAt?: Date;
  origin: string;
}

export class LogEntity {
  public severityLevel: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { message, origin, severityLevel, createdAt = new Date() } = options;
    this.message = message;
    this.severityLevel = severityLevel;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  static fromJson(json: string): LogEntity {
    const { message, severityLevel, createdAt, origin } = JSON.parse(json);
    return new LogEntity({
      message,
      severityLevel,
      createdAt,
      origin
    });
  }

  static fromObject(object: { [key: string]: any }): LogEntity {
    const { message, severityLevel, createdAt, origin } = object;

    return new LogEntity({
      message,
      severityLevel,
      createdAt,
      origin
    })
  }
}