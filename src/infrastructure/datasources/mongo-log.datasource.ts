import { LogModel } from "../../data/mongodb";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
    console.log("Mongo created new log: ", newLog.id);
  }
  async getLogs(): Promise<LogEntity[]> {
    return await LogModel.find();
  }
  async getLogsBySeverity(severity: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({
      severityLevel: severity
    })
    return logs.map(log => LogEntity.fromObject(log));
  }

}