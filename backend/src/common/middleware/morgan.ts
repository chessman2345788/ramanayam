import morgan, { StreamOptions } from "morgan";
import logger from "../../components/logger";

// Override the stream method to use Winston instead of console.log
const stream: StreamOptions = {
  write: (message) => logger.http(message.trim()),
};

// Build the morgan middleware
// Access logs are critical for security monitoring and must run in ALL environments.
// Winston handles log-level filtering and file rotation.
const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream },
);

export default morganMiddleware;
