import { PrismaPg } from "@prisma/adapter-pg";
import { envs } from "../../config/plugins/envs.plugin";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient } from "../../../generated/prisma/client";
import { LogSeverityLevel as PostgresLogSeverityLevel } from "../../../generated/prisma/enums";

const adapter = new PrismaPg({ connectionString: envs.POSTGRES_URL });
const prisma = new PrismaClient({ adapter });

const logSeverityLevelMap = {
  [LogSeverityLevel.LOW]: PostgresLogSeverityLevel.LOW,
  [LogSeverityLevel.MEDIUM]: PostgresLogSeverityLevel.MEDIUM,
  [LogSeverityLevel.HIGH]: PostgresLogSeverityLevel.HIGH
}

export class PostgresLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const { createdAt, message, origin, severityLevel } = log;
    const newLog = await prisma.log.create({
      data: {
        severityLevel: logSeverityLevelMap[severityLevel],
        message,
        origin,
        createdAt
      }
    })
    console.log({ newLog });
  }
  async getLogs(): Promise<LogEntity[]> {
    const logs = await prisma.log.findMany();
    return logs.map(log => LogEntity.fromObject(log));
  }
  async getLogsBySeverity(severity: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await prisma.log.findMany({
      where: {
        severityLevel: logSeverityLevelMap[severity]
      }
    });
    return logs.map(log => LogEntity.fromObject(log));
  }

}