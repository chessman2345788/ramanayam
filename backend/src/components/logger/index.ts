import winston from "winston";
import path from "path";
import fs from "fs";

const logDir = path.join(__dirname, "../../../logs");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const level = () => {
  const env = process.env.NODE_ENV || "development";
  return env === "development" ? "debug" : "warn";
};

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json(),
);

const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) =>
      `${info.timestamp} ${info.level}: ${info.message}${info.stack ? `\n${info.stack}` : ""}`,
  ),
);

const transports = [
  new winston.transports.Console({
    format: consoleFormat,
  }),
  new winston.transports.File({
    filename: path.join(logDir, "error.log"),
    level: "error",
    format,
  }),
  new winston.transports.File({
    filename: path.join(logDir, "combined.log"),
    format,
  }),
];

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
  exitOnError: false,
});

export default logger;
