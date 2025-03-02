import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// Define log format
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Configure log rotation
const transport = new DailyRotateFile({
  filename: "logs/%DATE%-app.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m", // Max size per file
  maxFiles: "14d", // Keep logs for 14 days
});

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    logFormat
  ),
  transports: [
    new winston.transports.Console(),
    transport, // Use rotating logs
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
  ],
});

export default logger;
