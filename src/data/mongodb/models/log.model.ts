import mongoose from "mongoose";
import { LogSeverityLevel } from "../../../domain/entities/log.entity";

const logSchema = new mongoose.Schema({
  severityLevel: {
    type: String,
    enum: Object.values(LogSeverityLevel),
    default: LogSeverityLevel.LOW
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  origin: {
    type: String
  },
})

export const LogModel = mongoose.model("Log", logSchema);