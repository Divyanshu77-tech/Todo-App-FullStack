import winston from "winston";
const { combine, timestamp, colorize, json, printf } = winston.format;

const logger = winston.createLogger({
  level: "debug",

  transports: [
    new winston.transports.File({
      filename: "Src/logs/app.log",
      format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), json()),
    }),
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        printf((info) => {
          return `${info.timestamp} ${info.level}: ${info.message}`;
        })
      ),
    }),
  ],
});

export default logger;