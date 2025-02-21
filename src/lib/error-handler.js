import mongoose from "mongoose";

export default class ApplicationError extends Error {
  constructor(error, statusCode = 500) {
    if (error instanceof mongoose.Error.ValidationError) {
      super(error.message);
      this.statusCode = 500;
    } else if (error.code === 11000 && error.name == "MongoServerError") {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      super(`${field}: ${value} is already in use.`);
      this.statusCode = 400;
    } else {
      super("Failed to process request.");
      this.statusCode = statusCode;
    }
  }
}

export function applicationErrorHandler(err, req, res, next) {
  const error = new ApplicationError(err);
  res.status(error.statusCode).json({ status: false, message: error.message });
}
