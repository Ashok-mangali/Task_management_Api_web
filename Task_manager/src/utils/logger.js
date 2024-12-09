const morgan = require("morgan");
const winston = require("winston");

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

const requestLogger = morgan("combined", {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
});

module.exports = { logger, requestLogger };
