import mongoose from "mongoose";
import logger from "./logger.js";

export default class ApplicationError extends Error {
  constructor(
    message = "Failed to process request.",
    statusCode = 500,
    error = null
  ) {
    if (error instanceof mongoose.Error.ValidationError) {
      super(error.message);
      this.statusCode = 400;
    } else if (error?.code === 11000 && error?.name === "MongoServerError") {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      super(`${field}: ${value} is already in use.`);
      this.statusCode = 400;
    } else {
      super(message);
      this.statusCode = statusCode;
    }
  }
}

export function applicationErrorHandler(err, req, res, next) {
  const error = new ApplicationError(err);
  logger.error(`Error: ${error.message} | Code: ${error.status || 500}`);
  res.status(error.statusCode).json({ status: false, message: error.message });
}
